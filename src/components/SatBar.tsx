import { useRef, useEffect, useState } from 'react';
import { packHSL, convertToHex } from './ColorUtil';

interface SatBarProps {
  width: number;
  onSatChange: (sat: number) => void;
  onColorChange: (newColor: string, newColorString: number) => void;
  hue: number;
  sat: number;
  light: number;
  setIsDragging: (state: boolean) => void;
}

const SatBar = ({
  width,
  onSatChange,
  onColorChange,
  hue,
  sat,
  light,
  setIsDragging
}: SatBarProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isMouseDown = useRef(false);

  const [lastClickedPosition, setLastClickedPosition] = useState(181);
  const height = 18;

  const updateSat = (event: React.MouseEvent | MouseEvent) => {
    if (!canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    let x = event.clientX - rect.left;
    x = Math.max(0, Math.min(x, width));
    const satValue = Math.round((x / width) * 7);
    onSatChange(satValue);
    setLastClickedPosition(x);
    const packedHSL = packHSL(hue, satValue, light);
    onColorChange(convertToHex(hue, satValue, light), packedHSL);
  };

  const handleMouseDown = (event: React.MouseEvent) => {
    isMouseDown.current = true;
    setIsDragging(true);
    updateSat(event);
    window.addEventListener('mousemove', updateSat);
    window.addEventListener('mouseup', handleGlobalMouseUp);
  };

  const handleGlobalMouseUp = () => {
    isMouseDown.current = false;
    setIsDragging(false);
    window.removeEventListener('mousemove', updateSat);
    window.removeEventListener('mouseup', handleGlobalMouseUp);
  };

  const handleMouseUp = () => {
    isMouseDown.current = false;
  };

  const handleMouseMove = (event: React.MouseEvent) => {
    if (isMouseDown.current) {
      updateSat(event);
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current as HTMLCanvasElement;
    if (!canvas) return;
    const context = canvas.getContext('2d');
    if (!context) return;
    const ratio = window.devicePixelRatio || 1;

    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
    canvas.width = width * ratio;
    canvas.height = height * ratio;
    context.scale(ratio, ratio);

    const drawSatBar = (ctx: CanvasRenderingContext2D) => {
      for (let i = 0; i < width; i++) {
        const saturation = Math.round((i / width) * 7);
        ctx.fillStyle = `hsl(${hue * (360 / 63)}, ${
          saturation * (100 / 7)
        }%, 50%)`;
        ctx.fillRect(i, 0, 1, height);
      }
      if (lastClickedPosition != null) {
        const arcRadius = 8;
        const arcPosition = Math.max(
          arcRadius,
          Math.min(lastClickedPosition, width - arcRadius)
        );

        ctx.beginPath();
        ctx.arc(arcPosition, height / 2, arcRadius, 0, 2 * Math.PI);
        ctx.strokeStyle = 'white';
        ctx.lineWidth = 3;
        ctx.stroke();
      }
    };

    const handleColorSelection = () => {
      const packedHSL = packHSL(hue, sat, light);
      onColorChange(convertToHex(hue, sat, light), packedHSL);
    };

    drawSatBar(context);
    canvas.addEventListener('click', handleColorSelection);

    return () => {
      canvas.removeEventListener('click', handleColorSelection);
    };
  }, [width, hue, sat, light, lastClickedPosition, onColorChange]);

  return (
    <canvas
      className="rounded-xl border-[#282c34] border-[1px] shadow-lg cursor-pointer"
      ref={canvasRef}
      width={width}
      height={height}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onMouseMove={handleMouseMove}
    />
  );
};

export default SatBar;
