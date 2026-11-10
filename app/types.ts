export enum RayDirection {
  Up = 270,
  Down = 90,
  Left = 180,
  Right = 0,
  UpRight = 315,
  UpLeft = 225,
  DownRight = 45,
  DownLeft = 135,
  NONE,
}

export const opposingRays: Record<RayDirection, RayDirection> = {
  [RayDirection.Up]: RayDirection.Down,
  [RayDirection.Down]: RayDirection.Up,
  [RayDirection.Left]: RayDirection.Right,
  [RayDirection.Right]: RayDirection.Left,
  [RayDirection.UpRight]: RayDirection.DownLeft,
  [RayDirection.UpLeft]: RayDirection.DownRight,
  [RayDirection.DownLeft]: RayDirection.UpRight,
  [RayDirection.DownRight]: RayDirection.UpLeft,
  [RayDirection.NONE]: RayDirection.NONE,
};
