const PresenceBar = ({ users }) => {
  return (
    <div style={{ fontSize: "14px", marginBottom: "8px" }}>
      Online: {users?.join(", ") || "Just you"}
    </div>
  );
};

export default PresenceBar;