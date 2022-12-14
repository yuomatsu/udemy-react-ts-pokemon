import { useEffect, useState } from "react";
import "./App.css";
import Card from "./components/Card";
import { getAllPokemon, getPokemon } from "./utils/pokemon";

type data = {
  count: number;
  next: string;
  previous: string;
  results: result;
};

type pokemonData = {
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

type result = {
  name: string;
  url: string;
};

const App = () => {
  const initialURL = "https://pokeapi.co/api/v2/pokemon";
  const [loading, setLoading] = useState(true);
  const [pokemonData, setPokemonData] = useState([]);

  useEffect(() => {
    const fetchPokemonData = async () => {
      // ポケモンデータ取得
      let res = await getAllPokemon(initialURL);
      // ??? この一行を記載せず、res.resultsとするとエラーが出る
      let results = JSON.parse(JSON.stringify(res)).results;

      // 各ポケモンの詳細データを取得
      loadPokemon(results);
      setLoading(false);
    };
    fetchPokemonData();
  }, []);

  const loadPokemon = async (data: result[]) => {
    let _pokemonData: any = await Promise.all(
      data.map((pokemon) => {
        let pokemonRecord = getPokemon(pokemon.url);
        return pokemonRecord;
      })
    );
    setPokemonData(_pokemonData);
  };
  console.log(pokemonData);

  return (
    <div className="App">
      {loading ? (
        <h1>ロード中・・・</h1>
      ) : (
        <>
          <div className="pokemonCardContainer">
            {pokemonData.map((pokemon ,i) => {
              return <Card key={i} pokemon={pokemon} />;
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default App;
