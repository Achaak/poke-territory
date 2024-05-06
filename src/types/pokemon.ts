export type PokemonStat = {
  base_stat: number;
  id: number;
  stat_id: number;
};

export type PokemonType = {
  type_id: number;
  slot: number;
  id: number;
};

export type PokemonBase = {
  name: string;
  id: number;
  pokemon_species_id: number;
  base_experience: number;
  stats: PokemonStat[];
  types: PokemonType[];
  sprite: string;
};

export type Pokemon = {
  position: { x: number; y: number };
} & PokemonBase;
