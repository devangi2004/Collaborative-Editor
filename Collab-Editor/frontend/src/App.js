import React from "react";
import { BrowserRouter, Routes, Route, Navigate, useParams } from "react-router-dom";
import Editor from "./Editor";
import { v4 as uuidV4 } from "uuid";

function DocEditor() {
  const { id } = useParams();
  return <Editor docId={id} />;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to={`/docs/${uuidV4()}`} />} />
        <Route path="/docs/:id" element={<DocEditor />} />
      </Routes>
    </BrowserRouter>
  );
}
