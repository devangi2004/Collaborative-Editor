import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

export default function Dashboard() {
  const { user } = useAuth();
  const [docs, setDocs] = useState([]);

  useEffect(() => {
    axios.get("/api/docs", { headers: { Authorization: `Bearer ${user?.token}` } })
      .then((res) => setDocs(res.data));
  }, [user]);

  const createDoc = async () => {
    const res = await axios.post("/api/docs", {}, { headers: { Authorization: `Bearer ${user?.token}` } });
    window.location.href = `/doc/${res.data._id}`;
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Welcome, {user?.username}!</h1>
      <button className="mb-4 px-4 py-2 bg-blue-600 text-white rounded" onClick={createDoc}>New Document</button>
      <ul>
        {docs.map((doc) => (
          <li key={doc._id} className="mb-2">
            <Link className="text-blue-500 underline" to={`/doc/${doc._id}`}>{doc.title || "Untitled"}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
