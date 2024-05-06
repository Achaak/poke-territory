export const getFightXp = (
  coeffMultiplier: number,
  opponentLevel: number,
  opponentBaseXp: number,
) => {
  return coeffMultiplier * opponentBaseXp * (opponentLevel / 7);
};
