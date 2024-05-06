export type Type = {
  id: number;
  name: string;
  type_efficacies: {
    damage_factor: number;
    damage_type_id: number;
  };
};
