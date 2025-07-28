import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Editor from "../components/Editor";
import PresenceBar from "../components/PresenceBar";
import SaveStatus from "../components/SaveStatus";
import axios from "axios";

const DocumentPage = () => {
  const { id } = useParams(); // Document ID from route
  const { user } = useAuth();
  const navigate = useNavigate();

  const [doc, setDoc] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saveStatus, setSaveStatus] = useState("Saved");

  useEffect(() => {
    if (!user) return navigate("/login");

    const fetchDoc = async () => {
      try {
        const res = await axios.get(`/api/docs/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setDoc(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Failed to load document", err);
        navigate("/not-found");
      }
    };

    fetchDoc();
  }, [id, user, navigate]);

  if (loading) return <div className="text-center mt-8">Loading document...</div>;

  return (
    <div className="document-page">
      <div className="flex items-center justify-between px-4 py-2 bg-gray-100 dark:bg-gray-800 border-b">
        <h2 className="text-xl font-bold">{doc.title}</h2>
        <PresenceBar documentId={id} />
      </div>

      <Editor
        documentId={id}
        initialContent={doc.content}
        user={user}
        onSaveStatusChange={setSaveStatus}
      />

      <SaveStatus status={saveStatus} />
    </div>
  );
};

export default DocumentPage;