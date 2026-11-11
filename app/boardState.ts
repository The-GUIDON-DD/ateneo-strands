import { findIndex, isDeepEqual } from "remeda";
import { create, type StateCreator } from "zustand";

type Board = Array<Array<string>>;

export interface BoardData {
  board: Board;
  words: Array<string>;
  spangram: string;
}

const boards: BoardData[] = [
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
  currentIndices: Index[];
  solvedIndices: Index[];
}

export interface BoardStore extends BoardState {
  setCurrentIndex: (index: Index) => void;
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

export const boardStateCreator: StateCreator<BoardState> = (set) => ({
  boardData: boards[0],
  currentIndices: [],
  solvedIndices: [],
  setCurrentIndex: (index: Index) =>
    set((state) => setCurrentIndex(state, index)),
});
