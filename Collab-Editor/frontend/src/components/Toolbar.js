import React from 'react';
export default function Toolbar({ format }) {
  return (
    <div className="flex space-x-2 p-2 bg-gray-100 dark:bg-gray-700">
      <button onClick={() => format('bold')}><b>B</b></button>
      <button onClick={() => format('italic')}><i>I</i></button>
      <button onClick={() => format('underline')}><u>U</u></button>
    </div>
  );
}