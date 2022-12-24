import { useEffect, useState } from "react";
import { resourceLimits } from "worker_threads";
import "./App.css";
import Card from "./components/Card";
import Navbar from "./components/Navbar/Navbar";
import { getAllPokemon, getPokemon } from "./utils/pokemon";

type result = {
  name: string;
  url: string;
};

const App = () => {
  const initialURL = "https://pokeapi.co/api/v2/pokemon";
  const [loading, setLoading] = useState(true);
  const [pokemonData, setPokemonData] = useState([]);
  const [nextURL, setNextURL] = useState<string>("");
  const [previousURL, setPreviousURL] = useState<string>("");

  useEffect(() => {
    const fetchPokemonData = async () => {
      // ポケモンデータ取得
      let res = await getAllPokemon(initialURL);
      // 各ポケモンの詳細データを取得
      loadPokemon(res.results);
      setNextURL(res.next);
      setPreviousURL(res.previous);
      // console.log(next);
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
  // console.log(pokemonData);

  const handleNextPage = async () => {
    setLoading(true);
    let data = await getAllPokemon(nextURL);
    await loadPokemon(data.results);
    setNextURL(data.next);
    setPreviousURL(data.previous);
    setLoading(false);
  };
  const handlePrevPage = async () => {
    if (!previousURL) return;
    setLoading(true);
    let data = await getAllPokemon(previousURL);
    await loadPokemon(data.results);
    setNextURL(data.next);
    setPreviousURL(data.previous);
    setLoading(false);
  };

  return (
    <>
      <Navbar />
      <div className="App">
        {loading ? (
          <h1>ロード中・・・</h1>
        ) : (
          <>
            <div className="pokemonCardContainer">
              {pokemonData.map((pokemon, i) => {
                return <Card key={i} pokemon={pokemon} />;
              })}
            </div>
            <div className="btn">
              <button onClick={handlePrevPage}>前へ</button>
              <button onClick={handleNextPage}>次へ</button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default App;
