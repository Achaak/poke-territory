import { useMemo, type FC } from "react";
import Image from "next/image";
import { useTypeColor } from "~/hooks/use-type-color";
import { useGameStore } from "~/store/game";

type TileProps = {
  x: number;
  y: number;
};

export const Tile: FC<TileProps> = ({ x, y }) => {
  const { pokemonsOnBoard: pokemonOnBoard } = useGameStore();

  const pokemonAtTile = useMemo(() => {
    return pokemonOnBoard.find((p) => p.position.x === x && p.position.y === y);
  }, [pokemonOnBoard, x, y]);

  const colors = useTypeColor(pokemonAtTile?.types.map((t) => t.type_id) ?? []);

  const background = useMemo(() => {
    if (colors.length === 1) {
      return colors[0];
    } else if (colors.length === 2) {
      return `linear-gradient(45deg, ${colors[0]} 12.5%, ${colors[1]} 12.5%, ${colors[1]} 37.5%, ${colors[0]} 37.5%, ${colors[0]} 62.5%, ${colors[1]} 62.5%, ${colors[1]} 87.5%, ${colors[0]} 87.5%)`;
    } else {
      return undefined;
    }
  }, [colors]);

  return (
    <div
      className="flex h-14 w-14 items-center justify-center border border-gray-300"
      style={{
        background,
      }}
    >
      {pokemonAtTile ? (
        <Image
          src={pokemonAtTile.sprite}
          alt={pokemonAtTile.name}
          width={48}
          height={48}
        />
      ) : null}
    </div>
  );
};
