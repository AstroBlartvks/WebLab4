import React, { useEffect, useRef } from 'react';

const Canvas = ({ currentR, points, onCanvasClick }) => {
  const canvasRef = useRef(null);
  const size = 500;
  const center = size / 2;
  const scale = 40;

  useEffect(() => {
    drawCanvas();
  }, [currentR, points]);

  const drawCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, size, size);

    ctx.fillStyle = '#f8f9fa';
    ctx.fillRect(0, 0, size, size);

    const r = currentR * scale;

    ctx.fillStyle = 'rgba(102, 126, 234, 0.3)';

    ctx.fillRect(center, center - r, r, r);

    ctx.beginPath();
    ctx.moveTo(center, center);
    ctx.lineTo(center - r, center);
    ctx.lineTo(center, center - r / 2);
    ctx.closePath();
    ctx.fill();

    ctx.beginPath();
    ctx.arc(center, center, r, Math.PI / 2, Math.PI);
    ctx.lineTo(center, center);
    ctx.closePath();
    ctx.fill();

    ctx.strokeStyle = '#333';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, center);
    ctx.lineTo(size, center);
    ctx.moveTo(center, 0);
    ctx.lineTo(center, size);
    ctx.stroke();

    ctx.fillStyle = '#333';
    ctx.font = '14px Arial';
    ctx.textAlign = 'center';

    for (let i = -5; i <= 5; i++) {
      if (i === 0) continue;
      const x = center + i * scale;
      ctx.fillText(i, x, center + 20);
      ctx.fillText(i, center + 20, center - i * scale);
    }

    points.forEach(point => {
      const px = center + point.x * scale;
      const py = center - point.y * scale;

      ctx.fillStyle = point.isHit ? 'green' : 'red';
      ctx.beginPath();
      ctx.arc(px, py, 5, 0, Math.PI * 2);
      ctx.fill();
    });
  };

  const handleClick = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    const x = ((clickX - center) / scale).toFixed(2);
    const y = ((center - clickY) / scale).toFixed(2);

    onCanvasClick(parseFloat(x), parseFloat(y));
  };

  return (
    <div style={{ marginTop: '20px' }}>
      <canvas
        ref={canvasRef}
        width={size}
        height={size}
        onClick={handleClick}
        style={{
          border: '1px solid #ddd',
          cursor: 'crosshair',
          borderRadius: '5px',
          maxWidth: '100%'
        }}
      />
    </div>
  );
};

export default Canvas;
