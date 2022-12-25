import { AllPokemonData } from "../types/type"
import { PokemonData } from "../types/type"

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