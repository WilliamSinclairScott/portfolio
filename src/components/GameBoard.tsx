import React, { useRef, useState, useEffect } from 'react';

const DrawingCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [mode, setMode] = useState<'draw' | 'pan'>('draw');
  const [color, setColor] = useState('black');
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [scale, setScale] = useState(1);
  const [panStart, setPanStart] = useState<{ x: number; y: number } | null>(null);

  // Drawing functionality
  const startDrawing = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (mode !== 'draw') return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.beginPath();
    ctx.moveTo(event.nativeEvent.offsetX / scale - offset.x, event.nativeEvent.offsetY / scale - offset.y);
    setIsDrawing(true);
  };

  const draw = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || mode !== 'draw') return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.lineTo(event.nativeEvent.offsetX / scale - offset.x, event.nativeEvent.offsetY / scale - offset.y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  // Pan functionality
  const startPan = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (mode !== 'pan') return;
    setPanStart({ x: event.nativeEvent.offsetX, y: event.nativeEvent.offsetY });
  };

  const pan = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (mode !== 'pan' || !panStart) return;

    const dx = (event.nativeEvent.offsetX - panStart.x) / scale;
    const dy = (event.nativeEvent.offsetY - panStart.y) / scale;

    setOffset({ x: offset.x + dx, y: offset.y + dy });
    setPanStart({ x: event.nativeEvent.offsetX, y: event.nativeEvent.offsetY });
  };

  const endPan = () => {
    setPanStart(null);
  };

  // Zoom functionality
  const zoom = (event: React.WheelEvent<HTMLCanvasElement>) => {
    event.preventDefault();
    const scaleAmount = event.deltaY > 0 ? 0.9 : 1.1;
    setScale(prevScale => Math.min(Math.max(prevScale * scaleAmount, 0.5), 3));
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.lineWidth = 2;
        ctx.lineCap = 'round';
        ctx.strokeStyle = color;
      }

      // Draw grid
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.save();
        ctx.scale(scale, scale);
        ctx.translate(offset.x, offset.y);

        const gridSize = 50;
        ctx.strokeStyle = '#e0e0e0';
        for (let x = 0; x < canvas.width / scale; x += gridSize) {
          ctx.beginPath();
          ctx.moveTo(x, 0);
          ctx.lineTo(x, canvas.height / scale);
          ctx.stroke();
        }
        for (let y = 0; y < canvas.height / scale; y += gridSize) {
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(canvas.width / scale, y);
          ctx.stroke();
        }
        ctx.restore();
      }
    }
  }, [offset, scale, color]);

  return (
    <div className="flex flex-col items-center">
      <div className="mb-4 space-x-4">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={() => setColor('blue')}
        >
          Blue
        </button>
        <button
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          onClick={() => setColor('red')}
        >
          Red
        </button>
        <button
          className={`px-4 py-2 ${mode === 'draw' ? 'bg-yellow-500' : 'bg-gray-300'} rounded hover:bg-yellow-400`}
          onClick={() => setMode('draw')}
        >
          Draw
        </button>
        <button
          className={`px-4 py-2 ${mode === 'pan' ? 'bg-green-500' : 'bg-gray-300'} rounded hover:bg-green-400`}
          onClick={() => setMode('pan')}
        >
          Pan
        </button>
      </div>
      <div className="border rounded shadow-lg p-4 bg-white overflow-hidden">
        <canvas
          ref={canvasRef}
          width={2000}
          height={2000}
          className="border border-gray-300 cursor-crosshair"
          onMouseDown={mode === 'pan' ? startPan : startDrawing}
          onMouseMove={mode === 'pan' ? pan : draw}
          onMouseUp={mode === 'pan' ? endPan : stopDrawing}
          onMouseLeave={stopDrawing}
          onWheel={zoom}
        />
      </div>
    </div>
  );
};

export default DrawingCanvas;
