import React, { useEffect, useRef, useState } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import socket from "./socket";

const SAVE_INTERVAL = 2000;

export default function Editor({ docId }) {
  const wrapperRef = useRef();
  const [quill, setQuill] = useState();

  useEffect(() => {
    const editor = document.createElement("div");
    wrapperRef.current.innerHTML = "";
    wrapperRef.current.append(editor);
    const q = new Quill(editor, { theme: "snow" });
    q.disable();
    q.setText("Loading...");
    setQuill(q);
  }, []);

  useEffect(() => {
    if (!quill) return;

    socket.once("load-document", (document) => {
      quill.setContents(document);
      quill.enable();
    });

    socket.emit("get-document", docId);
  }, [quill, docId]);

  useEffect(() => {
    if (!quill) return;

    const handler = (delta, oldDelta, source) => {
      if (source !== "user") return;
      socket.emit("send-changes", delta);
    };

    quill.on("text-change", handler);
    return () => quill.off("text-change", handler);
  }, [quill]);

  useEffect(() => {
    if (!quill) return;

    const handler = (delta) => {
      quill.updateContents(delta);
    };

    socket.on("receive-changes", handler);
    return () => socket.off("receive-changes", handler);
  }, [quill]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (quill) socket.emit("save-document", quill.getContents());
    }, SAVE_INTERVAL);

    return () => clearInterval(interval);
  }, [quill]);

  return <div ref={wrapperRef} />;
}
