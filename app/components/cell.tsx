import { type Index, useBoardStore } from "~/boardState";
import { RayDirection } from "~/types";

const colors = {
  cell: {
    spangram: "#ede32d",
    currentIndices: "#cccccc",
    none: "transparent",
    solvedChains: "#98e2da",
  },
  ray: {
    spangram: "#ede32d",
    currentIndices: "#cccccc",
    none: "transparent",
    solvedChains: "#98e2da",
  },
};

function Letter({
  letter,
  index,
  color,
}: {
  letter: string;
  index: Index;
  color: string;
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
        zIndex: 50,
        background: colors["cell"][color as keyof typeof colors.cell],
      }}
      onClick={addCell}
      onMouseEnter={addCellDrag}
    >
      <p className="text-black font-bold text-xl uppercase">{letter[0]}</p>
    </button>
  );
}

function Ray({
  rayDirection,
  color,
}: {
  rayDirection: RayDirection;
  color: string;
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
      className="absolute border-8 left-[50%] top-[calc(50%-8px)] origin-left"
      style={{
        borderColor: colors["ray"][color as keyof typeof colors.ray],
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
  color,
  letter,
}: {
  x: number;
  y: number;
  rayDirection: RayDirection;
  color: string;
  letter: string;
}) {
  return (
    <div
      className="size-full p-[20%] relative border-none"
      style={{ gridColumn: x + 1, gridRow: y + 1 }}
    >
      <Ray color={color} rayDirection={rayDirection} />
      <Letter color={color} letter={letter} index={[x, y]} />
    </div>
  );
}
