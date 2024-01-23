import { useState } from 'react';
import HueBar from './HueBar';
import SatBar from './SatBar';
import LightBar from './LightBar';

interface ColorPickerProps {
  width: number;
  onColorChange: (newColor: string, newColorString: number) => void;
  lightness: number;
  setLightness: (light: number) => void;
  setIsDragging: (state: boolean) => void;
}

const ColorPicker = ({
  width,
  onColorChange,
  lightness,
  setLightness,
  setIsDragging
}: ColorPickerProps) => {
  const [hue, setHue] = useState(31);
  const [saturation, setSaturation] = useState(3);

  return (
    <div className="flex flex-col max-w-[300px] mt-4 gap-6 p-4 -ml-[5px]">
      <HueBar
        width={width}
        onHueChange={setHue}
        onColorChange={onColorChange}
        hue={hue}
        sat={saturation}
        light={lightness}
        setIsDragging={setIsDragging}
      />
      <SatBar
        width={width}
        onSatChange={setSaturation}
        onColorChange={onColorChange}
        hue={hue}
        sat={saturation}
        light={lightness}
        setIsDragging={setIsDragging}
      />
      <LightBar
        width={width}
        onLightChange={setLightness}
        onColorChange={onColorChange}
        hue={hue}
        sat={saturation}
        light={lightness}
        setIsDragging={setIsDragging}
      />
    </div>
  );
};

export default ColorPicker;
