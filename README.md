# 📝 Collaborative Editor

A real-time collaborative text editor built using **React**, **Socket.IO**, and **Quill.js**. It allows multiple users to edit the same document simultaneously with cursor presence, formatting, and live updates.

---

## ✨ Features

- 👥 Real-time collaboration
- 🖱️ Live cursors and selection tracking
- 💾 Auto-save with save status
- 🔒 User presence indicator (online users)
- 🌙 Dark/Light mode toggle
- 🔤 Rich text formatting with Quill.js

---

## 📸 Screenshots

### 🔆 Light Mode
<img width="1920" height="1080" alt="Light Mode" src="https://github.com/user-attachments/assets/db0e2421-2283-48ed-b27e-05a2c8a0962f" />

### ✍️ Light Mode with Text
<img width="1920" height="1080" alt="Light Mode with Text" src="https://github.com/user-attachments/assets/6dc82b47-23ec-46b3-b0b6-e7e32fadbb1f" />

### 🌙 Dark Mode with Text
<img width="1920" height="1080" alt="Dark Mode with Text" src="https://github.com/user-attachments/assets/6b6ffc83-7e3f-4fbf-ae53-f33d4fe47f36" />

### 🌘 Dark Mode
<img width="1920" height="1080" alt="Dark Mode" src="https://github.com/user-attachments/assets/40a7be2e-8518-44ed-9e92-3da316cd5555" />
```
---

## ⚙️ Tech Stack

| Frontend      | Backend         | Realtime         | Database |
|---------------|----------------|------------------|----------|
| React.js      | Node.js + Express | Socket.IO        | MongoDB  |
| Quill.js      |                 |                  |          |

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/devangi2004/Collaborative-Editor.git
cd Collaborative-Editor
````

### 2. Install Dependencies

```bash
# For client
cd client
npm install

# For server
cd ../server
npm install
```

### 3. Run the App

```bash
# In /server
npm run start

# In /client
npm run dev
```

Open `http://localhost:3000` in your browser.

---

## 🗃️ Folder Structure

```
Collaborative-Editor/
│
├── client/              # Frontend (React)
├── server/              # Backend (Node.js, Express, Socket.IO)
├── README.md
```

---

## 🧠 Future Enhancements

* 🔐 Authentication & user management
* 🗃️ Document list and versioning
* 🔗 Document sharing with permission control
* 📨 Notification system for collaborators

---

## 📄 License

This project is open-source and available under the **MIT License**.

---

## 🙋‍♀️ Developed by

**Devangi Inani**
[GitHub: @devangi2004](https://github.com/devangi2004)
