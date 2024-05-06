import { create } from "zustand";
import { type Type } from "../types/types";
import { getAllTypes } from "../api/get-all-types";
import { getAllPokemon } from "../api/get-all-pokemon";
import { type Pokemon, type PokemonBase } from "../types/pokemon";
import { gameConfig } from "../config";

export const useGameStore = create<{
  allTypes: Type[];
  allPokemons: PokemonBase[];
  pokemonsOnBoard: Pokemon[];

  startGame: () => void;
  nextTurn: () => void;
  setPokemonsOnBoard: () => void;
  movePokemon: (id: number, x: number, y: number) => void;

  // Initialize the store
  init: () => Promise<void>;
  initAllTypes: () => Promise<void>;
  initAllPokemons: () => Promise<void>;
}>((set, get) => ({
  allTypes: [],
  allPokemons: [],
  pokemonsOnBoard: [],

  startGame: () => {
    get().setPokemonsOnBoard();
  },
  nextTurn: () => {},
  setPokemonsOnBoard: () => {
    const nbPokemon = gameConfig.pokemon.nb;

    const randomPokemon = get()
      .allPokemons.sort(() => 0.5 - Math.random())
      .slice(0, nbPokemon);

    const newPokemonsOnBoard: Pokemon[] = [];

    for (let i = 0; i < nbPokemon; i++) {
      const pokemon = randomPokemon[i];

      if (!pokemon) {
        return;
      }

      const x = Math.floor(Math.random() * gameConfig.map.width);
      const y = Math.floor(Math.random() * gameConfig.map.height);

      if (
        newPokemonsOnBoard.find((p) => p.position.x === x && p.position.y === y)
      ) {
        i--;
        continue;
      }

      newPokemonsOnBoard.push({ ...pokemon, position: { x, y } });
    }

    set({ pokemonsOnBoard: newPokemonsOnBoard });
  },
  movePokemon: (id, x, y) => {
    set((state) => ({
      pokemonsOnBoard: state.pokemonsOnBoard.map((p) =>
        p.id === id ? { ...p, position: { x, y } } : p,
      ),
    }));
  },

  /* Initialize the store */
  init: async () => {
    await Promise.all([get().initAllTypes(), get().initAllPokemons()]);
  },
  initAllTypes: async () => {
    const types = await getAllTypes();
    set({ allTypes: types });
  },
  initAllPokemons: async () => {
    const pokemon = await getAllPokemon();
    set({ allPokemons: pokemon });
  },
}));
