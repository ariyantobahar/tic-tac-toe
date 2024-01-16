import { useEffect, useState } from "react";
import Square from "./Square";
type Scores = {
  [key: string]: number;
};

const INITIAL_GAME_STATE = ["", "", "", "", "", "", "", "", ""];
const INITIAL_SCORE: Scores = { X: 0, O: 0 };
const WINNING_COMBOS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function App() {
  const [gameState, setGameState] = useState(INITIAL_GAME_STATE);
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const [scores, setScore] = useState(INITIAL_SCORE);
  useEffect(() => {
    if (gameState === INITIAL_GAME_STATE) {
      return;
    }
    checkWinner();
  }, [gameState]);

  useEffect(() => {
    const storedScores = localStorage.getItem("scores");
    if (storedScores) {
      setScore(JSON.parse(storedScores));
    }
  }, []);
  const checkWinner = () => {
    let roundWon = false;

    for (let index = 0; index < WINNING_COMBOS.length; index++) {
      const winCombo = WINNING_COMBOS[index];

      let a = gameState[winCombo[0]];
      let b = gameState[winCombo[1]];
      let c = gameState[winCombo[2]];

      if ([a, b, c].includes("")) {
        continue;
      }

      if (a === b && b === c) {
        roundWon = true;
        break;
      }
    }

    if (roundWon) {
      setTimeout(() => handleWin(), 500);
      return;
    }

    if (!gameState.includes("")) {
      setTimeout(() => handleDraw(), 500);
      return;
    }

    changePlayer();
  };

  const resetBoard = () => {
    setGameState(INITIAL_GAME_STATE);
  };
  const handleWin = () => {
    window.alert(`Congrats Player ${currentPlayer}`);
    const newPlayerScore = scores[currentPlayer] + 1;

    const newScores = { ...scores };
    newScores[currentPlayer] = newPlayerScore;
    setScore(newScores);
    localStorage.setItem("scores", JSON.stringify(newScores));
    resetBoard();
  };

  const handleDraw = () => {
    window.alert(`The game ended in draw`);
    resetBoard();
  };
  const changePlayer = () => {
    setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
  };

  const resetScore = () => {
    setScore(INITIAL_SCORE);
    localStorage.removeItem("scores");
  };
  const handleCellClick = (event: any) => {
    const cellIndex = Number(event.target.getAttribute("data-cell-index"));

    const currentValue = gameState[cellIndex];
    if (currentValue) {
      return;
    }
    const newValues = [...gameState];
    newValues[cellIndex] = currentPlayer;
    setGameState(newValues);
  };

  return (
    <div className="h-full p-8 text-slate-800 bg-gradient-to-r from-cyan-500 to-blue-500">
      <h1 className="text-center text-5xl mb-4 font-display text-white">
        Tic Tac Toe Game Pages
      </h1>
      <div>
        <div className="grid grid-cols-3 gap-3 mx-auto w-96">
          {gameState.map((player, index) => (
            <Square
              onClick={handleCellClick}
              key={index}
              {...{ player, index }}
            />
          ))}
        </div>
        <div className="flex flex-col mt-10 mx-auto w-96 text-2xl">
          <p className="font-display text-white ">
            Next Player: <span>{currentPlayer}</span>
          </p>
          <p className="font-display text-white ">
            Player X wins: <span>{scores["X"]}</span>
          </p>
          <p className="font-display text-white ">
            Player O wins: <span>{scores["O"]}</span>
          </p>
          <p
            onClick={resetScore}
            className="font-display text-black-500 bg-white w-20 p-2 rounded-lg text-center mt-5 cursor-pointer"
          >
            Reset
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
