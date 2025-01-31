import { ScratchToReveal } from "./components/ScratchToReveal";
import { useEffect, useRef, useState } from "react";
import { Confetti, ConfettiRef } from "./components/Confetti";
import Balatro from "./components/Lightning";
import { extractColors } from "extract-colors";
import { motion } from "framer-motion";

interface EpicRevealProps {
  imageUrl: string;
  isLegendary?: boolean;
  isMythical?: boolean;
  name: string;
}

export const EpicReveal: React.FC<EpicRevealProps> = ({
  imageUrl,
  isLegendary,
  isMythical,
  name,
}) => {
  const confettiRef = useRef<ConfettiRef>(null);
  const [revealed, setRevealed] = useState(false);
  const [colors, setColors] = useState<string[]>([]);

  const isRare = isLegendary || isMythical;
  const reasonToCelebrate = isRare && revealed;

  useEffect(() => {
    if (reasonToCelebrate) {
      confettiRef.current?.fire({});
    }
  }, [reasonToCelebrate]);

  useEffect(() => {
    setRevealed(false);
    getColors(imageUrl);
  }, [name, imageUrl]);

  const getColors = (url: string) =>
    extractColors(url).then((extractedColors) => {
      const colorArray = extractedColors.map((color) => color.hex);
      setColors(colorArray);
    });

  return (
    <ScratchToReveal
      specialEffect={isRare}
      width={200}
      height={250}
      minScratchPercentage={70}
      className="flex items-center justify-center overflow-hidden rounded-2xl p-4 shadow-lg relative"
      gradientColors={["#A97CF8", "#F38CB8", "#FDCC92"]}
      onComplete={() => setRevealed(true)}
      key={name}
    >
      <div
        className="absolute inset-0 -z-20"
        style={{ backgroundColor: colors[0] }}
      />
      {reasonToCelebrate && (
        <Confetti
          ref={confettiRef}
          className="absolute left-0 top-0 z-0 size-full"
          onMouseEnter={() => {
            if (reasonToCelebrate) confettiRef.current?.fire({});
          }}
        />
      )}
      {revealed && (
        <motion.div
          className="-z-10 absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Balatro
            isRotate={true}
            mouseInteraction={true}
            pixelFilter={700}
            color1={colors[0]}
            color2={colors[1]}
            color3={colors[2]}
          />
        </motion.div>
      )}

      <img
        src={imageUrl}
        className="select-none pointer-events-none object-fill p-4 max-w-[250px] max-h-[200px] rounded-2xl"
        alt="React logo"
      />
    </ScratchToReveal>
  );
};
