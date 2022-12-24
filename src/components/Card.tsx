import "./Card.css";
import { PokemonType } from "../types/type";

const Card = ({ pokemon }: any) => {
  // TODO: 本当はanyをやめたい
  return (
    <div className="card">
      <div className="cardImg">
        <img src={pokemon.sprites.front_default} alt="ポケモンの画像" />
      </div>
      <h3 className="cardName">{pokemon.name}</h3>
      <div className="cardTypes">
        <div>タイプ</div>
        {pokemon.types.map(({ type }: PokemonType) => {
          return (
            <div key={type.name}>
              <div>
                <span className="typeNmae">{type.name}</span>
              </div>
            </div>
          );
        })}
      </div>
      <div className="cardInfo">
        <div className="cardData">
          <p className="title">重さ：{pokemon.weight}</p>
        </div>
        <div className="cardData">
          <p className="title">高さ：{pokemon.height}</p>
        </div>
        <div className="cardData">
          <p className="title">
            アビリティ：{pokemon.abilities[0].ability.name}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Card;
