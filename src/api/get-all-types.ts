import { request, gql } from "graphql-request";
import { endpoint } from "~/server/client";
import { type Type } from "~/types/types";

export const getAllTypes = async (): Promise<Type[]> => {
  const { pokemon_v2_type } = await request<{
    pokemon_v2_type: {
      id: number;
      name: string;
      pokemon_v2_typeefficacies: {
        damage_factor: number;
        damage_type_id: number;
      };
    }[];
  }>(
    endpoint,
    gql`
      {
        pokemon_v2_type {
          id
          name
          pokemon_v2_typeefficacies {
            damage_factor
            damage_type_id
          }
        }
      }
    `,
  );

  return pokemon_v2_type.map((t) => ({
    id: t.id,
    name: t.name,
    type_efficacies: t.pokemon_v2_typeefficacies,
  }));
};
