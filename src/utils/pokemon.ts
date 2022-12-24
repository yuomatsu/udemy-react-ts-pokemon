type AllPokemonData = {
  count: number,
  next: string,
  previous: string,
  results: Result[]
}

type Result = {
  name: string,
  url: string
}

type PokemonData = {
  abilities: Object[];
  base_experience: number;
  forms: Object[];
  game_indices: Object[];
  height: number;
  held_items: Object[];
  id: number;
  is_default: boolean;
  location_area_encounters: string;
  moves: Object[];
  name: string;
  order: number;
  past_types: [];
  species: {
    name: string;
    url: string;
  };
  sprites: {
    back_default: string;
    back_female: string;
    back_shiny: string;
    back_shiny_female: string;
    front_default: string;
    other: Object;
    versions: Object;
  };
  stats: Object[];
  types: Object[];
  weight: number;
};

export const getAllPokemon = (url: string) => {
  return new Promise<AllPokemonData>((resolve, reject) => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => resolve(data));
  });
}

export const getPokemon = (url: string) => {
  return new Promise<PokemonData>((resolve, reject) => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => resolve(data));
  });
}