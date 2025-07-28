import React from 'react';
export default function PresenceIndicator({ users }) {
  return (
    <div className="text-sm text-gray-500 dark:text-gray-300">{users.join(', ')}</div>
  );
}