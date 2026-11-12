import { describe, expect, it } from "vitest";
import type { BoardData, BoardState, Index } from "./boardState";
import {
  boards,
  getConnectingDirection,
  getCurrentIndex,
  getLetterFromIndex,
  getRayDirection,
  isAdjacent,
  setCurrentIndex,
} from "./boardState";
import { RayDirection } from "./types";

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
      expect(setCurrentIndex(dummyBoardState, [6, 7]).currentIndices).toEqual([
        [1, 2],
        [3, 4],
        [5, 6],
        [6, 7],
      ]);
    });
    it("do not append if index is not adjacent to last", () => {
      expect(setCurrentIndex(dummyBoardState, [7, 8]).currentIndices).toEqual([
        [1, 2],
        [3, 4],
        [5, 6],
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
  describe("isAdjacent", () => {
    it("invalid indices return False", () => {
      expect(isAdjacent([0, 0], [-1, 0])).toEqual(false);
    });
    it("indices too far return False", () => {
      expect(isAdjacent([0, 0], [5, 0])).toEqual(false);
      expect(isAdjacent([0, 0], [0, 5])).toEqual(false);
      expect(isAdjacent([0, 0], [5, 5])).toEqual(false);
    });
    it("adjacent indices return True", () => {
      expect(isAdjacent([0, 0], [1, 0])).toEqual(true);
      expect(isAdjacent([0, 0], [0, 1])).toEqual(true);
      expect(isAdjacent([0, 0], [1, 0])).toEqual(true);
      expect(isAdjacent([0, 0], [1, 1])).toEqual(true);
    });
    it("adjacency is commutative", () => {
      expect(isAdjacent([0, 0], [1, 1])).toEqual(isAdjacent([1, 1], [0, 0]));
      expect(isAdjacent([0, 0], [0, 5])).toEqual(isAdjacent([0, 5], [0, 0]));
    });
  });
  describe("getConnectingDirection", () => {
    it("Up", () => {
      expect(getConnectingDirection([0, 0], [0, -5])).toBe(RayDirection.Up);
    });
    it("Down", () => {
      expect(getConnectingDirection([0, 0], [0, 5])).toBe(RayDirection.Down);
    });
    it("Left", () => {
      expect(getConnectingDirection([0, 0], [-5, 0])).toBe(RayDirection.Left);
    });
    it("Right", () => {
      expect(getConnectingDirection([0, 0], [5, 0])).toBe(RayDirection.Right);
    });
    it("UpRight", () => {
      expect(getConnectingDirection([0, 0], [5, -5])).toBe(
        RayDirection.UpRight,
      );
    });
    it("UpLeft", () => {
      expect(getConnectingDirection([0, 0], [-5, -5])).toBe(
        RayDirection.UpLeft,
      );
    });
    it("DownRight", () => {
      expect(getConnectingDirection([0, 0], [5, 5])).toBe(
        RayDirection.DownRight,
      );
    });
    it("DownLeft", () => {
      expect(getConnectingDirection([0, 0], [-5, 5])).toBe(
        RayDirection.DownLeft,
      );
    });
    it("NONE", () => {
      expect(getConnectingDirection([5, 5], [5, 5])).toBe(RayDirection.NONE);
    });
  });
  describe("getRayDirection", () => {
    it("index not in currentIndices", () => {
      expect(getRayDirection(dummyBoardState, [6, 7])).toBe(RayDirection.NONE);
    });
    it("index in currentIndices", () => {
      expect(getRayDirection(dummyBoardState, [5, 6])).toBe(
        RayDirection.UpLeft,
      );
    });
  });
});
