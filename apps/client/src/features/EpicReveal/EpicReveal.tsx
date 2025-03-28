import { ScratchToReveal } from "./components/ScratchToReveal";
import { useEffect, useRef, useState } from "react";
import { Confetti, ConfettiRef } from "./components/Confetti";

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

  const celebrate = (isLegendary || isMythical) && revealed;
  console.log(celebrate);

  useEffect(() => {
    if (celebrate) {
      confettiRef.current?.fire({});
    }
  }, [celebrate]);

  useEffect(() => {
    setRevealed(false);
  }, [name]);

  return (
    <ScratchToReveal
      width={200}
      height={250}
      minScratchPercentage={70}
      className="flex items-center justify-center overflow-hidden rounded-2xl border-2 bg-gray-100 p-4"
      gradientColors={["#A97CF8", "#F38CB8", "#FDCC92"]}
      onComplete={() => setRevealed(true)}
      key={name}
    >
      {celebrate && (
        <Confetti
          ref={confettiRef}
          className="absolute left-0 top-0 z-0 size-full"
          onMouseEnter={() => {
            if (celebrate) confettiRef.current?.fire({});
          }}
        />
      )}
      <img
        src={imageUrl}
        className="select-none pointer-events-none object-fill p-4 max-w-[250px] max-h-[200px] rounded-2xl"
        alt="React logo"
      />
    </ScratchToReveal>
  );
};
