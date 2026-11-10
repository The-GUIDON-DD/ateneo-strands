import { RayDirection } from "~/types";

function Letter({
  isSelected,
  isSolved,
  letter,
}: {
  isSelected: boolean;
  isSolved: boolean;
  letter: string;
}) {
  return (
    <div
      className="size-full flex items-center justify-center rounded-full relative"
      style={{
        background: isSelected
          ? isSolved
            ? `var(--solved)`
            : "#cccccc"
          : "transparent",
        zIndex: 50,
      }}
    >
      <p className="text-black font-bold text-xl uppercase">{letter[0]}</p>
    </div>
  );
}

function Ray({
  isSelected,
  isSolved,
  rayDirection,
}: {
  isSelected: boolean;
  isSolved: boolean;
  rayDirection: RayDirection;
}) {
  if (rayDirection === RayDirection.NONE) {
    return null;
  }
  return (
    <div
      className="w-full absolute border-8 left-[50%] top-[50%] origin-left"
      style={{
        borderColor: isSelected
          ? isSolved
            ? `var(--solved)`
            : "#cccccc"
          : "transparent",
        rotate: `${rayDirection}deg`,
        zIndex: 0,
      }}
    />
  );
}

export default function Cell({
  x,
  y,
  rayDirection,
}: {
  x: number;
  y: number;
  rayDirection: RayDirection;
}) {
  return (
    <div className="size-full p-[20%] relative">
      <Ray isSelected={true} isSolved={false} rayDirection={rayDirection} />
      <Letter isSelected={true} isSolved={false} letter="A" />
    </div>
  );
}
