import React from 'react';

const Toolbar = ({ tool, setTool, color, setColor, lineWidth, setLineWidth }) => {
  return (
    <div style={{ marginBottom: '10px' }}>
      <button onClick={() => setTool('pen')} style={{ fontWeight: tool === 'pen' ? 'bold' : 'normal' }}>
        Pen
      </button>
      <button onClick={() => setTool('eraser')} style={{ fontWeight: tool === 'eraser' ? 'bold' : 'normal' }}>
        Eraser
      </button>
      <input
        type="color"
        value={color}
        onChange={(e) => setColor(e.target.value)}
        disabled={tool === 'eraser'}
      />
      <input
        type="range"
        min="1"
        max="30"
        value={lineWidth}
        onChange={(e) => setLineWidth(Number(e.target.value))}
      />
      <span>{lineWidth}px</span>
    </div>
  );
};

export default Toolbar;
