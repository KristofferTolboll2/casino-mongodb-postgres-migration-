export interface RandomGuruCasinoGame {
  name: string;
  url: string;
}

export const generateRandomGuruCasinoGame = (
  baseUrl: string,
  name: string,
): RandomGuruCasinoGame => {
  const url = `${baseUrl}/game/${name}`;
  return {
    name,
    url,
  };
};
