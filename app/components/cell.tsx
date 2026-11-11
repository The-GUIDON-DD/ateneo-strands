import { type Index, useBoardStore } from "~/boardState";
import { RayDirection } from "~/types";

function Letter({
  isSelected,
  isSolved,
  letter,
  index,
}: {
  isSelected: boolean;
  isSolved: boolean;
  letter: string;
  index: Index;
}) {
  const setCurrentIndex = useBoardStore((state) => state.setCurrentIndex);

  function addCellDrag(event: React.MouseEvent) {
    // trigger only if lmb is down
    if (event.buttons === 1) {
      setCurrentIndex(index);
    }
  }

  function addCell() {
    setCurrentIndex(index);
  }
  return (
    <button
      type="button"
      className="size-full flex items-center justify-center rounded-full relative"
      style={{
        background: isSelected
          ? isSolved
            ? `var(--solved)`
            : "#cccccc"
          : "transparent",
        zIndex: 50,
      }}
      onClick={addCell}
      onMouseEnter={addCellDrag}
    >
      <p className="text-black font-bold text-xl uppercase">{letter[0]}</p>
    </button>
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
  const tiltDirs = new Set([
    RayDirection.UpRight,
    RayDirection.UpLeft,
    RayDirection.DownRight,
    RayDirection.DownLeft,
  ]);
  return (
    <div
      className="absolute border-8 left-[50%] top-[50%] origin-left"
      style={{
        borderColor: isSelected
          ? isSolved
            ? `var(--solved)`
            : "#cccccc"
          : "transparent",
        rotate: `${rayDirection}deg`,
        width: tiltDirs.has(rayDirection) ? "calc(sqrt(2)*100%)" : "100%",
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
    <div className="size-full p-[20%] relative border-none">
      <Ray isSelected={true} isSolved={false} rayDirection={rayDirection} />
      <Letter isSelected={true} isSolved={false} letter="A" index={[x, y]} />
    </div>
  );
}
