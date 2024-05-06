import { useMemo } from "react";

export const useTypeColor = (typeIds: number[]) => {
  const colors = useMemo(() => {
    const c = [];

    for (const typeId of typeIds) {
      switch (typeId) {
        case 1: // normal
          c.push("#A8A77A");
          break;
        case 2: // fighting
          c.push("#C22E28");
          break;
        case 3: // flying
          c.push("#A98FF3");
          break;
        case 4: // poison
          c.push("#A33EA1");
          break;
        case 5: // ground
          c.push("#E2BF65");
          break;
        case 6: // rock
          c.push("#B6A136");
          break;
        case 7: // bug
          c.push("#A6B91A");
          break;
        case 8: // ghost
          c.push("#735797");
          break;
        case 9: // steel
          c.push("#B7B7CE");
          break;
        case 10: // fire
          c.push("#EE8130");
          break;
        case 11: // water
          c.push("#6390F0");
          break;
        case 12: // grass
          c.push("#7AC74C");
          break;
        case 13: // electric
          c.push("#F7D02C");
          break;
        case 14: // psychic
          c.push("#F95587");
          break;
        case 15: // ice
          c.push("#96D9D6");
          break;
        case 16: // dragon
          c.push("#6F35FC");
          break;
        case 17: // dark
          c.push("#705746");
          break;
        case 18: // fairy
          c.push("#D685AD");
          break;
        default:
          c.push("#000000");
          break;
      }
    }

    return c;
  }, [typeIds]);

  return colors;
};
