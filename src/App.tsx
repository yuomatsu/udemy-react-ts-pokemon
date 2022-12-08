import { useEffect, useState } from "react";
import "./App.css";
import { getAllPokemon, getPokemon } from "./utils/pokemon";

type data = {
  count: number,
  next: string,
  previous: string,
  results: result
}

// type results = {
//   results: result[]
// }

type result = {
  name: string,
  url: string
}

const App = () => {
  const initialURL = "https://pokeapi.co/api/v2/pokemon";
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPokemonData = async () => {
      // ポケモンデータ取得
      let res = await getAllPokemon(initialURL);
      let results = (JSON.parse(JSON.stringify(res))).results;

      // 各ポケモンの詳細データを取得
      loadPokemon(results);
      setLoading(false);
    };
    fetchPokemonData();
  }, []);

  const loadPokemon = (data: result[]) => {
    let _pokemonData = Promise.all(
      data.map((pokemon) => {
        let pokemonRecord = getPokemon(pokemon.url);
        return pokemonRecord;
      })
    );
    // console.log(_pokemonData);
  };

  return (
    <div className="App">
      {loading ? (
        <h1>ロード中・・・</h1>
      ) : (
        <h1>ポケモンデータを取得しました。</h1>
      )}
    </div>
  );
}

export default App;
