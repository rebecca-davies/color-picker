import { useState } from 'react';
import './App.css';
import ColorPicker from './components/ColorPicker';

function App() {
  const [selectedColor, setSelectedColor] = useState('#48b5b0');
  const [selectedColorString, setSelectedColorString] = useState(32191);
  const [lightness, setLightness] = useState(63);
  const [isDragging, setIsDragging] = useState(false);

  const handleColorChange = (newColor: string, newColorString: number) => {
    setSelectedColor(newColor);
    setSelectedColorString(newColorString);
  };

  return (
    <>
      <span className="absolute w-full h-full bg-[#2c2c2c] top-0 left-0" />
      <div
        className={`rounded-xl border-[1px] border-[#3e4450] w-[400px] bg-[#282c34] drop-shadow-2xl ${
          isDragging ? 'select-none' : ''
        }`}
      >
        <div className="flex p-4 gap-2 items-center">
          <span className="w-[14px] h-[14px] bg-[#ff5e58] rounded-full" />
          <span className="w-[14px] h-[14px] bg-[#febb2d] rounded-full" />
          <span className="w-[14px] h-[14px] bg-[#2ac840] rounded-full" />
        </div>
        <div
          style={{ backgroundColor: selectedColor }}
          className={`w-[398px] h-32 flex items-center justify-center`}
        >
          <p
            style={{ color: lightness > 35 ? '#282c34' : '#ffffff' }}
            className={`text-5xl tracking-wide font-semibold ${
              isDragging ? 'select-none' : ''
            }`}
          >
            {selectedColorString}
          </p>
        </div>
        <div className="">
          <ColorPicker
            width={365}
            onColorChange={handleColorChange}
            lightness={lightness}
            setLightness={setLightness}
            setIsDragging={setIsDragging}
          />
        </div>
        <div
          className={`p-4 flex flex-col gap-2 pb-7 ${
            isDragging ? 'select-none' : ''
          }`}
        >
          <p className="text-[#9fa8ba] font-semibold text-sm tracking-wider">
            What is this?
          </p>
          <p className="text-[#9fa8ba] font-light text-xs tracking-wider">
            Jagex uses a 16-bit HSL color format within their engine which
            limits them to 65,535 different colors.
          </p>
          <p className="text-[#9fa8ba] font-light text-xs tracking-wider">
            RGB color pickers have 16.7 million colors, meaning the color you
            choose will most likely not exist and will need to be approximated,
            giving different results.
          </p>
          <p className="text-[#9fa8ba] font-light text-xs tracking-wider">
            This tool renders a color palette using jagex's 16-bit HSL, 6 bits
            for hue, 3 for saturation and 7 for lightness, bitpacked and
            represented as a short.
          </p>
        </div>
      </div>
      <p className="absolute left-5 bottom-5 text-[#9fa8ba] font-semibold text-sm tracking-wider">
        made by <a href='https://github.com/rebecca-davies'>rebecca</a>
      </p>
    </>
  );
}

export default App;
