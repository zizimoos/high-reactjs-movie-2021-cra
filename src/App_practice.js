import Button from "./components/Button.js";
import { useEffect, useState } from "react";

function App() {
  const [todo, setTodo] = useState("");
  const [toDos, setToDos] = useState([]);
  const onChange = (e) => setTodo(e.target.value);
  const onSubmit = (e) => {
    e.preventDefault();
    if (todo === "") return;
    setToDos([...toDos, todo]);
    setTodo("");
  };

  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
      .then((response) => response.json())
      .then((json) => setCoins(json));
    setLoading(false);
  }, []);

  const DollarToBitCoin = () => {
    const [amount, setAmount] = useState(0);
    const [flipped, setFlipped] = useState(false);
    const onChange = (e) => setAmount(e.target.value);
    const reset = () => {
      setAmount(0);
    };
    const onFlip = () => {
      reset();
      setFlipped(!flipped);
    };

    return (
      <div>
        <div>
          {flipped
            ? "Convert Bitcoin to Dollars"
            : "Convert Dollars to BitCoin "}
        </div>
        <label htmlFor="Dollar">Dollar</label>
        <input
          type="number"
          id="dollar"
          placeholder="dollar"
          onChange={onChange}
          value={flipped ? amount * coins[0]?.quotes.USD.price : amount}
          disabled={flipped}
        ></input>
        {flipped ? "<==" : "==>"}
        <label htmlFor="BitCoin">BitCoin</label>
        <input
          type="number"
          id="bitcoin"
          placeholder="dollar"
          onChange={onChange}
          value={flipped ? amount : amount / coins[0]?.quotes.USD.price}
          disabled={!flipped}
        ></input>
        <div>
          <button onClick={onFlip}>
            {flipped ? "Flip DollarToBit" : "Flip BitToDollar"}
          </button>
          <button onClick={reset}>Reset</button>
        </div>
      </div>
    );
  };

  return (
    <div className="App">
      <h1>To Do List {toDos.length}</h1>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          value={todo}
          onChange={onChange}
          placeholder="write your todos"
        />
        <Button text="Add" />
      </form>
      <hr />
      <div>
        {toDos.map((todo, index) => (
          <ul key={index}>
            {index + 1} : {todo}
          </ul>
        ))}
      </div>
      <hr />
      <div>
        <div>The Coins ({coins.length})</div>
        {loading ? (
          <strong> </strong>
        ) : (
          <select>
            {coins.map((coin) => (
              <option key={coin.id}>
                {coin.name} : ${coin.quotes.USD.price} USD
              </option>
            ))}
          </select>
        )}
      </div>
      <hr />

      <DollarToBitCoin />
    </div>
  );
}

export default App;
