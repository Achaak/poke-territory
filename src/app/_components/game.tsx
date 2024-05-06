"use client";

import { useEffect, type FC } from "react";
import { Tile } from "./tile";
import { MAP } from "../../config";
import { useInterval } from "usehooks-ts";
import { useGameStore } from "~/store/game";

export const Game: FC = () => {
  const { init, startGame } = useGameStore();
  useInterval(() => {
    // Move a random pokemon
  }, 1000);

  useEffect(() => {
    void init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="flex flex-col">
        {Array.from({ length: MAP.height }).map((_, y) => (
          <div key={y} className="flex">
            {Array.from({ length: MAP.width }).map((_, x) => (
              <Tile key={x} x={x} y={y} />
            ))}
          </div>
        ))}
      </div>
      <button onClick={startGame}>Start</button>
    </>
  );
};
