import React, { useState, useRef } from 'react';
import Canvas from '../components/Canvas';
import Toolbar from '../components/Toolbar';

const DrawingBoard = () => {
    const [tool, setTool] = useState('pen');
    const [color, setColor] = useState('#000000');
    const [lineWidth, setLineWidth] = useState(5);
    const canvasRef = useRef(null);
  
    const handleSave = () => {
      canvasRef.current.saveImage();
    };
  
    const handleUndo = () => {
      canvasRef.current.undo();
    };
  
    const handleRedo = () => {
      canvasRef.current.redo();
    };
  
    return (
      <div>
        <Toolbar
          tool={tool}
          setTool={setTool}
          color={color}
          setColor={setColor}
          lineWidth={lineWidth}
          setLineWidth={setLineWidth}
        />
        <div style={{ marginBottom: '10px' }}>
          <button onClick={handleUndo}>↩️ Undo</button>
          <button onClick={handleRedo}>↪️ Redo</button>
          <button onClick={handleSave}>💾 저장</button>
        </div>
        <Canvas
          ref={canvasRef}
          tool={tool}
          color={color}
          lineWidth={lineWidth}
        />
      </div>
    );
  };
  export default DrawingBoard;