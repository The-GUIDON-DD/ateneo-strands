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

interface BoardData {
  board: Board;
  words: string[];
  spangram: string;
}

type Index = [number, number];

interface BoardState {
  boardData: BoardData;
  currentIndices: Index[];
  solvedIndices: Index[];
}
