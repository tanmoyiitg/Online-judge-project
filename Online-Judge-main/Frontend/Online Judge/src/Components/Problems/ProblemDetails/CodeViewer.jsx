import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

const CodeViewer = ({ code, language }) => {
  const options = {
    readOnly: true,
    minimap: {
      enabled: false,
    },
    automaticLayout: true,
    scrollBeyondLastLine: false, // This will help in preventing unnecessary white space at the bottom
    wordWrap: 'on', // Ensures long lines are wrapped
    lineNumbers: 'off',
    contextmenu: false,
    selectionHighlight: false,
    links: false,
    folding: false,
    renderLineHighlight: 'none',
  };

  const customStyle = {
    ...vscDarkPlus,
    'pre[class*="language-"]': {
      ...vscDarkPlus['pre[class*="language-"]'],
      fontSize: '14px', // Adjust the font size here
      height: '100%', // Ensure pre element takes full height
      margin: 0, // Remove default margin
      position: 'relative',
      top: "25px",
      left: "10px"
    },
    'code[class*="language-"]': {
      ...vscDarkPlus['code[class*="language-"]'],
      fontSize: '14px', // Adjust the font size here

    },
  };

  return (
    <div style={{ height: '560px' }}>
      <SyntaxHighlighter language={language} style={customStyle}>
        {code}
      </SyntaxHighlighter>
    </div>
  );
};

export default CodeViewer;
