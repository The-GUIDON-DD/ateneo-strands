import { findIndex, isDeepEqual } from "remeda";
import { create, type StateCreator } from "zustand";
import { RayDirection } from "./types";

type Board = Array<Array<string>>;

export interface BoardData {
  board: Board;
  words: Array<Array<Index>>;
  spangram: Array<Index>;
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
    words: [
      [
        [3, 3],
        [4, 3],
        [5, 3],
        [4, 2],
        [5, 2],
        [5, 1],
        [4, 1],
        [5, 0],
        [4, 0],
        [3, 0],
      ], // MORATORIUM
      [
        [3, 1],
        [2, 0],
        [1, 0],
        [0, 0],
        [0, 1],
      ], // ORALS
      [
        [0, 3],
        [0, 4],
        [0, 5],
        [0, 6],
        [1, 6],
        [0, 7],
        [1, 7],
        [2, 7],
        [2, 6],
        [3, 6],
        [3, 7],
        [4, 7],
        [5, 7],
      ], // CONSULTATIONS
      [
        [4, 6],
        [5, 6],
        [5, 5],
        [4, 5],
        [3, 5],
        [2, 4],
      ], // MATTEO
      [
        [2, 5],
        [1, 5],
        [1, 4],
        [1, 3],
        [1, 2],
        [2, 2],
      ], // REVISE
    ],
    spangram: [
      [5, 4],
      [4, 4],
      [3, 4],
      [2, 3],
      [3, 2],
      [2, 1],
      [1, 1],
      [0, 2],
    ], // ATENEANS,
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
      [
        [3, 6],
        [3, 7],
        [2, 7],
        [1, 7],
        [0, 7],
      ], // PHILO
      [
        [4, 5],
        [5, 5],
        [5, 6],
        [5, 7],
        [4, 7],
        [4, 6],
      ], // NATSCI
      [
        [2, 2],
        [2, 3],
        [3, 3],
        [4, 3],
        [5, 3],
      ], // SOCSC
      [
        [0, 6],
        [1, 6],
        [2, 6],
        [3, 5],
        [2, 5],
        [1, 5],
        [1, 4],
      ], // PATHFIT
      [
        [5, 2],
        [4, 1],
        [5, 1],
        [5, 0],
      ], // MATH
      [
        [1, 0],
        [0, 0],
        [0, 1],
        [0, 2],
        [1, 2],
        [1, 1],
      ], // INTACT
      [
        [4, 2],
        [3, 2],
        [3, 1],
      ], // FLC
      [
        [4, 0],
        [3, 0],
        [2, 0],
        [2, 1],
      ], // THEO
    ],
    spangram: [
      [5, 4],
      [4, 4],
      [3, 4],
      [2, 4],
      [1, 3],
      [0, 3],
      [0, 4],
      [0, 5],
    ], // ENLISTED
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
    words: [
      [
        [3, 4],
        [3, 5],
        [4, 5],
        [4, 6],
        [3, 6],
      ], // SOMBA
      [
        [4, 2],
        [3, 2],
        [2, 2],
        [2, 3],
        [1, 3],
        [0, 3],
        [1, 4],
        [0, 4],
      ], // ROOFDECK
      [
        [0, 2],
        [1, 2],
        [0, 1],
        [0, 0],
        [1, 0],
        [2, 0],
        [1, 1],
      ], // FAANNEX
      [
        [2, 5],
        [2, 6],
        [1, 6],
        [0, 6],
        [0, 7],
        [1, 7],
        [2, 7],
        [3, 7],
        [4, 7],
      ], // MUSICROOM
      [
        [2, 1],
        [3, 1],
        [4, 1],
        [3, 0],
        [4, 0],
        [5, 0],
        [5, 1],
      ], // OLDCOMM
      [
        [5, 7],
        [5, 6],
        [5, 5],
        [4, 4],
        [5, 4],
        [5, 3],
      ], // DOREEN
    ],
    spangram: [
      [5, 2],
      [4, 3],
      [3, 3],
      [2, 4],
      [1, 5],
      [0, 5],
    ], // LOYOLA
  },
];

export type Index = [number, number];

export interface BoardState {
  boardData: BoardData;
  currentIndices: Array<Index>;
  solvedChains: Array<Array<Index>>;
  solvedSpangramChain: Array<Index>;
}

export interface BoardStore extends BoardState {
  setCurrentIndex: (index: Index) => void;
  resetCurrentIndices: () => void;
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

export function doesCurrentChainSolveWord(boardState: BoardState): boolean {
  const currentIndices = boardState.currentIndices;
  return !!boardState.boardData.words.find((word) =>
    isDeepEqual(word, currentIndices),
  );
}

export function doesCurrentChainSolveSpangram(boardState: BoardState): boolean {
  const currentIndices = boardState.currentIndices;
  return isDeepEqual(boardState.boardData.spangram, currentIndices);
}

export function getChainFromIndex(
  boardState: BoardState,
  index: Index,
): Array<Index> {
  // if in current indices, solved chains or spangram chain, return that chain
  if (boardState.currentIndices.find((i) => isDeepEqual(i, index))) {
    return boardState.currentIndices;
  } else if (
    boardState.solvedSpangramChain.find((i) => isDeepEqual(i, index))
  ) {
    return boardState.solvedSpangramChain;
  } else {
    for (const chain of boardState.solvedChains) {
      if (chain.find((i) => isDeepEqual(i, index))) {
        return chain;
      }
    }
  }
  return [];
}

export function getColorFromIndex(
  boardState: BoardState,
  index: Index,
): string {
  // if in current indices, solved chains or spangram chain, return that chain
  if (boardState.currentIndices.find((i) => isDeepEqual(i, index))) {
    return "currentIndices";
  } else if (
    boardState.solvedSpangramChain.find((i) => isDeepEqual(i, index))
  ) {
    return "spangram";
  } else {
    for (const chain of boardState.solvedChains) {
      if (chain.find((i) => isDeepEqual(i, index))) {
        return "solvedChains";
      }
    }
  }
  return "none";
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
  if (i[0] < 0 || i[1] < 0 || j[0] < 0 || j[1] < 0) {
    return false;
  }
  return Math.abs(i[0] - j[0]) <= 1 && Math.abs(i[1] - j[1]) <= 1;
}

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
    getColorFromIndex(boardState, index) === "spangram" ||
    getColorFromIndex(boardState, index) === "solvedChains"
  ) {
    return boardState;
  }
  // appends index to array if not in array
  // otherwise "rewind" array to where index was found
  const lastPosition = findIndex(boardState.currentIndices, (i) =>
    isDeepEqual(index, i),
  );
  if (lastPosition === -1) {
    // ignore if not adjacent to last index
    if (
      boardState.currentIndices.length > 0 &&
      !isAdjacent(
        boardState.currentIndices[boardState.currentIndices.length - 1],
        index,
      )
    ) {
      return boardState;
    }
    return {
      ...boardState,
      currentIndices: [...boardState.currentIndices, index],
    };
  } else if (
    isDeepEqual(
      index,
      boardState.currentIndices[boardState.currentIndices.length - 1],
    )
  ) {
    return resetCurrentIndices(boardState);
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
  const chain = getChainFromIndex(boardState, index);
  const foundIndex = findIndex(chain, (i) => isDeepEqual(i, index));
  if (foundIndex <= 0) {
    return RayDirection.NONE;
  }
  return getConnectingDirection(index, chain[foundIndex - 1]);
}

function confirmChain(boardState: BoardState): BoardState {
  if (doesCurrentChainSolveWord(boardState)) {
    return {
      ...boardState,
      solvedChains: [...boardState.solvedChains, boardState.currentIndices],
      currentIndices: [],
    };
  } else if (doesCurrentChainSolveSpangram(boardState)) {
    return {
      ...boardState,
      solvedSpangramChain: boardState.currentIndices,
      currentIndices: [],
    };
  } else {
    return boardState;
  }
}

export const boardStateCreator: StateCreator<BoardStore> = (set) => ({
  boardData: boards[0],
  currentIndices: [],
  solvedChains: [],
  solvedSpangramChain: [],
  setCurrentIndex: (index: Index) =>
    set((state) => confirmChain(setCurrentIndex(state, index))),
  resetCurrentIndices: () => set((state) => resetCurrentIndices(state)),
});

export const useBoardStore = create<BoardStore>()(boardStateCreator);
