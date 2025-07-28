import React, { useEffect, useRef, useState } from "react";
import Quill from "quill";
import socket from "./socket";

const SAVE_INTERVAL = 2000;

export default function Editor({ docId, username, theme, toggleTheme }) {
  const wrapperRef = useRef();
  const [quill, setQuill] = useState();
  const [status, setStatus] = useState("");

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
    socket.emit("set-username", username);
  }, [username]);

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

  useEffect(() => {
    socket.on("autosave-feedback", (msg) => {
      setStatus(msg);
      setTimeout(() => setStatus(""), 3000);
    });
    return () => socket.off("autosave-feedback");
  }, []);

  return (
    <>
      <div id="username-bar">
        <span>👤 {username}</span>
        <span id="autosave-status">{status}</span>
        <button id="theme-toggle" onClick={toggleTheme}>
          {theme === "light" ? "🌙 Dark" : "☀️ Light"}
        </button>
      </div>
      <div ref={wrapperRef} className="editor-wrapper" />
    </>
  );
}
