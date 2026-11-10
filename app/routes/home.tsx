import Cell from "~/components/cell";
import { RayDirection } from "~/types";
import { Welcome } from "../welcome/welcome";

export function meta() {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return (
    <section className="grid size-60 grid-rows-2 grid-cols-2">
      <Cell x={0} y={0} rayDirection={RayDirection.DownRight} />
      <Cell x={0} y={0} rayDirection={RayDirection.Down} />
      <Cell x={0} y={0} rayDirection={RayDirection.Up} />
      <Cell x={0} y={0} rayDirection={RayDirection.UpLeft} />
    </section>
  );
}
