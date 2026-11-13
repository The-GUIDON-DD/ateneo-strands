import {
  boardStateWin,
  getColorFromIndex,
  getLetterFromIndex,
  getRayDirection,
  useBoardStore,
} from "~/boardState";
import Cell from "~/components/cell";

export function meta() {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

function generateIndexGrid(width: number, height: number) {
  const indexGrid = [];
  for (let i = 0; i < width; ++i) {
    for (let j = 0; j < height; ++j) {
      indexGrid.push([i, j]);
    }
  }
  return indexGrid;
}

export default function Home() {
  const board = useBoardStore((state) => state);
  const boardWidth = useBoardStore((state) => state.boardData.board[0].length);
  const boardHeight = useBoardStore((state) => state.boardData.board.length);
  const spelledWord = useBoardStore((state) =>
    state.currentIndices.map((i) => getLetterFromIndex(state, i)).join(""),
  );
  const isWinning = useBoardStore((state) => boardStateWin(state));

  const indexGrid = generateIndexGrid(boardWidth, boardHeight);

  return (
    <>
      <section
        className="grid"
        style={{
          gridTemplateRows: `repeat(${boardHeight}, 80px)`,
          gridTemplateColumns: `repeat(${boardWidth}, 80px)`,
        }}
      >
        {indexGrid.map(([x, y]) => (
          <Cell
            key={`board-index-${x}-${y}`}
            x={x}
            y={y}
            rayDirection={getRayDirection(board, [x, y])}
            color={getColorFromIndex(board, [x, y])}
            letter={getLetterFromIndex(board, [x, y])}
          />
        ))}
      </section>
      <p>{isWinning ? "You Win!" : spelledWord}</p>
    </>
  );
}
