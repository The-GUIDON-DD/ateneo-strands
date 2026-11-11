import { getRayDirection, useBoardStore } from "~/boardState";
import Cell from "~/components/cell";

export function meta() {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  const board = useBoardStore((state) => state);

  return (
    <section className="grid size-60 grid-rows-2 grid-cols-2">
      {[
        [0, 0],
        [1, 0],
        [0, 1],
        [1, 1],
      ].map(([x, y]) => (
        <Cell
          key={`board-index-${x}-${y}`}
          x={x}
          y={y}
          rayDirection={getRayDirection(board, [x, y])}
        />
      ))}
    </section>
  );
}
