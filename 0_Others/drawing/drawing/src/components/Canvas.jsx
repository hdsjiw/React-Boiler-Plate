import React, { useRef, useEffect, useState, forwardRef, useImperativeHandle } from 'react';
import './Canvas.css';

const Canvas = forwardRef(({ tool, color, lineWidth }, ref) => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [undoStack, setUndoStack] = useState([]);
  const [redoStack, setRedoStack] = useState([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const parent = canvas.parentElement;

    const resizeCanvas = () => {
      canvas.width = parent.clientWidth;
      canvas.height = parent.clientHeight;

      const saved = localStorage.getItem('autosave');
      if (saved) {
        const confirmRestore = window.confirm('저장된 이전 그림을 복구하시겠습니까?');
        if (confirmRestore) {
          const ctx = canvas.getContext('2d');
          const img = new Image();
          img.onload = () => ctx.drawImage(img, 0, 0);
          img.src = saved;
        } else {
          localStorage.removeItem('autosave');
        }
      }
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    return () => window.removeEventListener('resize', resizeCanvas);
  }, []);

  useImperativeHandle(ref, () => ({
    saveImage: () => {
      const canvas = canvasRef.current;
      const tempCanvas = document.createElement('canvas');
      const tempCtx = tempCanvas.getContext('2d');

      tempCanvas.width = canvas.width;
      tempCanvas.height = canvas.height;

      tempCtx.fillStyle = '#ffffff';
      tempCtx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);
      tempCtx.drawImage(canvas, 0, 0);

      const image = tempCanvas.toDataURL("image/jpeg", 1.0);
      const link = document.createElement('a');
      link.href = image;
      link.download = `drawing_${Date.now()}.jpg`;
      link.click();
    },
    undo: () => {
        console.log("undoStack", undoStack.length);
        if (undoStack.length === 0) return;
        const last = undoStack[undoStack.length - 1];
        setUndoStack((prev) => prev.slice(0, -1));
        setRedoStack((prev) => [...prev, canvasRef.current.toDataURL()]);
        restoreImage(last);
      },
    redo: () => {
        console.log("redoStack", redoStack.length);
        if (redoStack.length === 0) return;
        const last = redoStack[redoStack.length - 1];
        setRedoStack((prev) => prev.slice(0, -1));
        setUndoStack((prev) => [...prev, canvasRef.current.toDataURL()]);
        restoreImage(last);
    },
    clearCanvas: () => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      localStorage.removeItem('autosave');
      setUndoStack([]);
      setRedoStack([]);
    }
  }));

  const restoreImage = (dataUrl) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.onload = () => ctx.drawImage(img, 0, 0);
    img.src = dataUrl;
  };

  const autoSave = () => {
    const canvas = canvasRef.current;
    const dataUrl = canvas.toDataURL();
    localStorage.setItem('autosave', dataUrl);
  };

  const startDrawing = (x, y) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    setUndoStack((prev) => [...prev, canvas.toDataURL()]);
    setRedoStack([]);
    ctx.beginPath();
    ctx.moveTo(x, y);
    setIsDrawing(true);
  };

  const draw = (x, y) => {
    if (!isDrawing) return;
    const ctx = canvasRef.current.getContext('2d');
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = tool === 'pen' ? color : '#ffffff';
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    autoSave();
  
    // undoStack에 마지막 상태 저장 (draw가 발생한 경우만)
    const canvas = canvasRef.current;
    setUndoStack((prev) => [...prev, canvas.toDataURL()]);
  };
  

  const getCoords = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    if (e.touches) {
      return {
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top,
      };
    } else {
      return {
        x: e.nativeEvent.offsetX,
        y: e.nativeEvent.offsetY,
      };
    }
  };

  const handleMouseDown = (e) => {
    const { x, y } = getCoords(e);
    startDrawing(x, y);
  };

  const handleMouseMove = (e) => {
    const { x, y } = getCoords(e);
    draw(x, y);
  };

  const handleTouchStart = (e) => {
    e.preventDefault();
    const { x, y } = getCoords(e);
    startDrawing(x, y);
  };

  const handleTouchMove = (e) => {
    e.preventDefault();
    const { x, y } = getCoords(e);
    draw(x, y);
  };

  const handleTouchEnd = () => {
    stopDrawing();
  };

  return (
    <canvas
      ref={canvasRef}
      className="canvas"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={stopDrawing}
      onMouseLeave={stopDrawing}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    />
  );
});

export default Canvas;
