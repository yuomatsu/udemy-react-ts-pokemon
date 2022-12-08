type data = {
  count: number,
  next: string,
  previous: string,
  results: string[]
}
type results = {
  results: result[]
}

type result = {
  name: string,
  url: string
}
export const getAllPokemon = (url: string) => {
  return new Promise<string[]>((resolve, reject) => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => resolve(data));
  });
}

export const getPokemon = (url: string) => {
  return new Promise((resolve, reject) => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => resolve(data));
  });
}