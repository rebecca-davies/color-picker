import { useEffect, useRef } from 'react';
import { convertToCSSColor } from './ColorUtil';

interface SaturationLightnessSquareProps {
  width: number;
  height: number;
  hue: number;
}

const SaturationLightnessSquare = ({
  width,
  height,
  hue
}: SaturationLightnessSquareProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current as HTMLCanvasElement;
    if (!canvas) return;
    const context = canvas.getContext('2d');
    if (!context) return;

    const drawColorSquare = (ctx: CanvasRenderingContext2D) => {
      for (let i = 0; i < width; i++) {
        for (let j = 0; j < height; j++) {
          const saturation = Math.floor((i / width) * 7);
          const lightness = Math.floor((j / height) * 127);
          const color = convertToCSSColor(hue, saturation, lightness);
          ctx.fillStyle = color;
          ctx.fillRect(i, j, 1, 1);
        }
      }
    };

    drawColorSquare(context);
  }, [hue, height, width]);

  return (
    <canvas
      className="rounded-xl"
      ref={canvasRef}
      width={width}
      height={height}
    />
  );
};

export default SaturationLightnessSquare;
