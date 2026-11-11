import { describe, expect, it } from "vitest";
import type { BoardData, BoardState, Index } from "./boardState";
import { getCurrentIndex, setCurrentIndex } from "./boardState";

describe("Board State indexes", () => {
  const emptyBoardData: BoardData = {
    board: [],
    words: [],
    spangram: "",
  };
  const dummyBoardState: BoardState = {
    boardData: emptyBoardData,
    currentIndices: [
      [1, 2],
      [3, 4],
      [5, 6],
    ],
    solvedIndices: [],
  };
  describe("getCurrentIndex", () => {
    it("getCurrentIndex returns the last index in the currentIndices array", () => {
      expect(getCurrentIndex(dummyBoardState)).toEqual([5, 6]);
    });

    it("getCurrentIndex returns null if there is no currentIndices", () => {
      const emptyBoardState = { ...dummyBoardState, currentIndices: [] };
      expect(getCurrentIndex(emptyBoardState)).toBeNull();
    });
  });
  describe("setCurrentIndex", () => {
    it("append index if not in array", () => {
      expect(setCurrentIndex(dummyBoardState, [1, 1]).currentIndices).toEqual([
        [1, 2],
        [3, 4],
        [5, 6],
        [1, 1],
      ]);
    });
    it("rewind currentIndices if index in currentIndices", () => {
      expect(setCurrentIndex(dummyBoardState, [3, 4]).currentIndices).toEqual([
        [1, 2],
        [3, 4],
      ]);
    });
    it("do nothing if index is in solvedIndices", () => {
      const solvedBoardState = {
        ...dummyBoardState,
        solvedIndices: [[6, 7] as Index],
      };
      expect(setCurrentIndex(solvedBoardState, [6, 7])).toEqual(
        solvedBoardState,
      );
    });
  });
});
