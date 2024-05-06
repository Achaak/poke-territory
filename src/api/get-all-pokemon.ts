import { request, gql } from "graphql-request";
import { endpoint } from "~/server/client";
import { type PokemonBase } from "~/types/pokemon";

export const getAllPokemon = async (): Promise<PokemonBase[]> => {
  const { pokemon_v2_pokemon } = await request<{
    pokemon_v2_pokemon: {
      name: string;
      id: number;
      pokemon_species_id: number;
      base_experience: number;
      pokemon_v2_pokemonstats: {
        base_stat: number;
        id: number;
        stat_id: number;
      }[];
      pokemon_v2_pokemontypes: {
        type_id: number;
        slot: number;
        id: number;
      }[];
    }[];
  }>(
    endpoint,
    gql`
      {
        pokemon_v2_pokemon {
          name
          id
          pokemon_species_id
          base_experience
          pokemon_v2_pokemontypes {
            type_id
            slot
            id
          }
          pokemon_v2_pokemonstats {
            base_stat
            id
            stat_id
          }
        }
      }
    `,
  );

  return pokemon_v2_pokemon.map((p) => ({
    name: p.name,
    id: p.id,
    pokemon_species_id: p.pokemon_species_id,
    base_experience: p.base_experience,
    stats: p.pokemon_v2_pokemonstats,
    types: p.pokemon_v2_pokemontypes,
    sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${p.pokemon_species_id}.png`,
  }));
};
