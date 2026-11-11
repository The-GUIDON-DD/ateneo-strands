import { findIndex, isDeepEqual } from "remeda";

type Board = string[][];
const boards: Board[] = [
  // level one
  [
    ["L", "A", "R", "M", "U", "I"],
    ["S", "N", "A", "O", "R", "O"],
    ["S", "S", "E", "E", "A", "T"],
    ["C", "I", "N", "M", "O", "R"],
    ["O", "V", "O", "E", "T", "A"],
    ["N", "E", "R", "E", "T", "T"],
    ["S", "U", "T", "I", "M", "A"],
    ["L", "T", "A", "O", "N", "S"],
  ],
  // level two
  [
    ["N", "I", "E", "T", "H", "H"],
    ["T", "T", "O", "C", "A", "T"],
    ["A", "C", "S", "L", "F", "M"],
    ["T", "S", "O", "C", "S", "C"],
    ["E", "T", "I", "L", "N", "E"],
    ["D", "I", "F", "H", "N", "A"],
    ["P", "A", "T", "P", "I", "T"],
    ["O", "L", "I", "H", "C", "S"],
  ],
  // level three
  [
    ["N", "N", "E", "C", "O", "M"],
    ["A", "X", "O", "L", "D", "M"],
    ["F", "A", "O", "O", "R", "L"],
    ["E", "D", "F", "Y", "O", "N"],
    ["K", "C", "O", "S", "E", "E"],
    ["A", "L", "M", "O", "M", "R"],
    ["I", "S", "U", "A", "B", "O"],
    ["C", "R", "O", "O", "M", "D"],
  ],
];

export interface BoardData {
  board: Board;
  words: string[];
  spangram: string;
}

export type Index = [number, number];

export interface BoardState {
  boardData: BoardData;
  currentIndices: Index[];
  solvedIndices: Index[];
}

// read only functions here
export function getCurrentIndex(boardState: BoardState): Index | null {
  // returns last index in currentIndices, else returns null
  if (boardState.currentIndices.length <= 0) {
    return null;
  }
  return boardState.currentIndices[boardState.currentIndices.length - 1];
}

export function setCurrentIndex(
  boardState: BoardState,
  index: Index,
): BoardState {
  // ignore if in solved indices
  if (
    findIndex(boardState.solvedIndices, (i) => isDeepEqual(index, i)) !== -1
  ) {
    return boardState;
  }
  // appends index to array if not in array
  // otherwise "rewind" array to where index was found
  const lastPosition = findIndex(boardState.currentIndices, (i) =>
    isDeepEqual(index, i),
  );
  if (lastPosition === -1) {
    return {
      ...boardState,
      currentIndices: [...boardState.currentIndices, index],
    };
  } else {
    return {
      ...boardState,
      currentIndices: boardState.currentIndices.slice(0, lastPosition + 1),
    };
  }
}
