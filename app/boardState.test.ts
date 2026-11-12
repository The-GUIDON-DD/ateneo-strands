import { describe, expect, it } from "vitest";
import type { BoardData, BoardState, Index } from "./boardState";
import {
  boards,
  getCurrentIndex,
  getLetterFromIndex,
  setCurrentIndex,
} from "./boardState";

const emptyBoardData: BoardData = {
  board: [],
  words: [],
  spangram: "",
};
const emptyBoardState: BoardState = {
  boardData: emptyBoardData,
  currentIndices: [],
  solvedIndices: [],
  solvedChains: [],
};
const dummyBoardState: BoardState = {
  ...emptyBoardState,
  currentIndices: [
    [1, 2],
    [3, 4],
    [5, 6],
  ],
};

describe("Board State indexes", () => {
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
  describe("getLetterFromIndex", () => {
    const sampleBoardState: BoardState = {
      ...emptyBoardState,
      boardData: boards[0],
    };
    it("invalid index throws an error -- negative indices", async () => {
      // has to be async for await/throw check to work
      await expect(async () =>
        getLetterFromIndex(sampleBoardState, [-1, -1]),
      ).rejects.toThrow();
      await expect(async () =>
        getLetterFromIndex(sampleBoardState, [-1, 1]),
      ).rejects.toThrow();
      await expect(async () =>
        getLetterFromIndex(sampleBoardState, [1, -1]),
      ).rejects.toThrow();
    });
    it("invalid index throws an error -- out of bounds", async () => {
      await expect(async () =>
        getLetterFromIndex(sampleBoardState, [6, 0]),
      ).rejects.toThrow();
      await expect(async () =>
        getLetterFromIndex(sampleBoardState, [0, 8]),
      ).rejects.toThrow();
      await expect(async () =>
        getLetterFromIndex(sampleBoardState, [6, 8]),
      ).rejects.toThrow();
    });
    it("valid index returns the correct letter", () => {
      expect(getLetterFromIndex(sampleBoardState, [0, 0])).toEqual("L");
      expect(getLetterFromIndex(sampleBoardState, [5, 7])).toEqual("S");
      expect(getLetterFromIndex(sampleBoardState, [3, 2])).toEqual("E");
    });
  });
});
