import { findIndex, isDeepEqual } from "remeda";
import { create, type StateCreator } from "zustand";
import { RayDirection } from "./types";

type Board = Array<Array<string>>;

export interface BoardData {
  board: Board;
  words: Array<string>;
  spangram: string;
}

export const boards: BoardData[] = [
  // level one
  {
    board: [
      ["L", "A", "R", "M", "U", "I"],
      ["S", "N", "A", "O", "R", "O"],
      ["S", "S", "E", "E", "A", "T"],
      ["C", "I", "N", "M", "O", "R"],
      ["O", "V", "O", "E", "T", "A"],
      ["N", "E", "R", "E", "T", "T"],
      ["S", "U", "T", "I", "M", "A"],
      ["L", "T", "A", "O", "N", "S"],
    ],
    words: ["MORATORIUM", "ORALS", "CONSULTATIONS", "MATTEO", "REVISE"],
    spangram: "ATENISTA",
  },
  // level two
  {
    board: [
      ["N", "I", "E", "T", "H", "H"],
      ["T", "T", "O", "C", "A", "T"],
      ["A", "C", "S", "L", "F", "M"],
      ["T", "S", "O", "C", "S", "C"],
      ["E", "T", "I", "L", "N", "E"],
      ["D", "I", "F", "H", "N", "A"],
      ["P", "A", "T", "P", "I", "T"],
      ["O", "L", "I", "H", "C", "S"],
    ],
    words: [
      "PHILO",
      "NATSCI",
      "SOCSC",
      "PATHFIT",
      "MATH",
      "INTACT",
      "FLC",
      "THEO",
    ],
    spangram: "ENLISTED",
  },
  // level three
  {
    board: [
      ["N", "N", "E", "C", "O", "M"],
      ["A", "X", "O", "L", "D", "M"],
      ["F", "A", "O", "O", "R", "L"],
      ["E", "D", "F", "Y", "O", "N"],
      ["K", "C", "O", "S", "E", "E"],
      ["A", "L", "M", "O", "M", "R"],
      ["I", "S", "U", "A", "B", "O"],
      ["C", "R", "O", "O", "M", "D"],
    ],
    words: ["SOMBA", "ROOFDECK", "FAANNEX", "MUSICROOM", "OLDCOMM", "DOREEN"],
    spangram: "LOYOLA",
  },
];

export type Index = [number, number];

export interface BoardState {
  boardData: BoardData;
  currentIndices: Array<Index>;
  solvedIndices: Array<Index>;
  solvedChains: Array<Array<Index>>;
}

export interface BoardStore extends BoardState {
  setCurrentIndex: (index: Index) => void;
}

export function getLetterFromIndex(
  boardState: BoardState,
  index: Index,
): string {
  const xDim = boardState.boardData.board[0].length;
  const yDim = boardState.boardData.board.length;
  if (index[0] < 0 || index[0] >= xDim || index[1] < 0 || index[1] >= yDim) {
    throw Error("Index beyond bounds of board.");
  }
  return boardState.boardData.board[index[1]][index[0]];
}

// read only functions here
export function getCurrentIndex(boardState: BoardState): Index | null {
  // returns last index in currentIndices, else returns null
  if (boardState.currentIndices.length <= 0) {
    return null;
  }
  return boardState.currentIndices[boardState.currentIndices.length - 1];
}

export function isAdjacent(i: Index, j: Index) {
  return Math.abs(i[0] - j[0]) <= 1 && Math.abs(i[1] - j[1]) <= 1;
}

// TODO: move this to cell?
export function getConnectingDirection(source: Index, dest: Index) {
  const xDelta = dest[0] - source[0];
  const yDelta = dest[1] - source[1];

  if (xDelta === 0) {
    if (yDelta > 0) {
      return RayDirection.Down;
    }
    if (yDelta < 0) {
      return RayDirection.Up;
    }
    return RayDirection.NONE;
  } else if (xDelta > 0) {
    if (yDelta > 0) {
      return RayDirection.DownRight;
    }
    if (yDelta < 0) {
      return RayDirection.UpRight;
    }
    return RayDirection.Right;
  } else {
    if (yDelta > 0) {
      return RayDirection.DownLeft;
    }
    if (yDelta < 0) {
      return RayDirection.UpLeft;
    }
    return RayDirection.Left;
  }
}

export function resetCurrentIndices(boardState: BoardState) {
  return { ...boardState, currentIndices: [] };
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

export function getRayDirection(
  boardState: BoardState,
  index: Index,
): RayDirection {
  const foundIndex = findIndex(boardState.currentIndices, (i) =>
    isDeepEqual(i, index),
  );
  if (foundIndex <= 0) {
    return RayDirection.NONE;
  }
  return getConnectingDirection(
    index,
    boardState.currentIndices[foundIndex - 1],
  );
}

export const boardStateCreator: StateCreator<BoardStore> = (set) => ({
  boardData: boards[0],
  currentIndices: [],
  solvedIndices: [],
  solvedChains: [],
  setCurrentIndex: (index: Index) =>
    set((state) => setCurrentIndex(state, index)),
});

export const useBoardStore = create<BoardStore>()(boardStateCreator);
