import React, { useEffect, useRef, useState } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import QuillCursors from 'quill-cursors';
import { io } from 'socket.io-client';
import SaveStatus from './SaveStatus';
import PresenceBar from './PresenceBar';

Quill.register('modules/cursors', QuillCursors);

const SAVE_INTERVAL_MS = 2000;
let typingTimeout;

export default function Editor({ docId }) {
  const [socket, setSocket] = useState();
  const [quill, setQuill] = useState();
  const [saveStatus, setSaveStatus] = useState('Saved');
  const [onlineUsers, setOnlineUsers] = useState([]);

  const wrapperRef = useRef();

  useEffect(() => {
    const s = io('http://localhost:5000');
    setSocket(s);
    return () => s.disconnect();
  }, []);

  useEffect(() => {
    if (!socket || !quill) return;

    socket.emit('join', { docId, user: { name: "Guest" } });

    socket.on('user-list', setOnlineUsers);

    socket.on('receive-changes', delta => {
      quill.updateContents(delta);
    });

    socket.on('cursor-update', ({ userId, range }) => {
      quill.getModule('cursors').setCursor(userId, range, "Guest", 'blue');
    });

    return () => {
      socket.off('receive-changes');
      socket.off('user-list');
      socket.off('cursor-update');
    };
  }, [socket, quill]);

  useEffect(() => {
    if (!socket || !quill) return;

    const handler = (delta, oldDelta, source) => {
      if (source !== 'user') return;
      socket.emit('send-changes', delta);
      setSaveStatus('Saving...');
      clearTimeout(typingTimeout);
      typingTimeout = setTimeout(() => {
        socket.emit('save-document', quill.getContents());
        setSaveStatus('Saved');
      }, SAVE_INTERVAL_MS);
    };

    quill.on('text-change', handler);
    return () => quill.off('text-change', handler);
  }, [socket, quill]);

  useEffect(() => {
    if (!socket || !quill) return;

    const handler = range => {
      socket.emit('cursor-change', range);
    };

    quill.on('selection-change', handler);
    return () => quill.off('selection-change', handler);
  }, [socket, quill]);

  useEffect(() => {
    const editorDiv = document.createElement('div');
    wrapperRef.current.innerHTML = ''; // Clear any existing content
    wrapperRef.current.append(editorDiv);
    const q = new Quill(editorDiv, {
      theme: 'snow',
      modules: {
        toolbar: [
          [{ header: [1, 2, 3, false] }],
          ['bold', 'italic', 'underline'],
          [{ list: 'ordered' }, { list: 'bullet' }],
          ['link', 'code-block']
        ],
        cursors: true,
        history: {
          delay: 2000,
          maxStack: 500,
          userOnly: true,
        },
      },
    });
    setQuill(q);
  }, []);

  useEffect(() => {
    if (!socket || !quill) return;
    socket.once('load-document', doc => {
      quill.setContents(doc);
      quill.enable();
    });
    socket.emit('get-document', docId);
  }, [socket, quill, docId]);

  return (
    <div className="editor-container">
      <PresenceBar users={onlineUsers} />
      <div ref={wrapperRef} className="editor-wrapper"></div>
      <SaveStatus status={saveStatus} />
    </div>
  );
}