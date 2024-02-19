import { useState } from "react";


function Square({value, onSquareClick}) {
    return (
        <button onClick={onSquareClick} className="bg-white border-4 border-gray-400 h-16 w-16 rounded-sm text-2xl font-bold p-2 m-2">{value}</button>
    )
}

function Board({xIsNext, squares, onPlay}) {
    const winner = calculateWinner(squares);
    
    let status;

    if(winner) {
        status = `Winner: ${winner}`;
    }else{
        status = 'Next Player:' + ' ' + (xIsNext ? 'X' : 'O');
    }

    function handleClick(i) {
        if(squares[i] || calculateWinner(squares)){
            return;
        }
        const nextSquares = squares.slice();
        if(xIsNext){
            nextSquares[i] = 'X';
        }else{
            nextSquares[i] = 'O';
        }
        onPlay(nextSquares);
    }
    return(
        <>
        <div className={`${winner ? 'text-green-600' : 'text-black'} font-bold p-2 text-4xl mb-4`}>{status}</div>
        <div className="flex justify-center">
            <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
            <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
            <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
        </div>
        <div className="flex justify-center">
            <Square value={squares[3]} onSquareClick={() => handleClick(3)} /> 
            <Square value={squares[4]} onSquareClick={() => handleClick(4)} /> 
            <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
        </div>
        <div className="flex justify-center">
            <Square value={squares[6]} onSquareClick={() => handleClick(6)} /> 
            <Square value={squares[7]} onSquareClick={() => handleClick(7)} /> 
            <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
        </div>
        </>
    )
};


export default function Game() {
    const [history, setHistory] = useState([Array(9).fill(null)]);
    const [xIsNext, setXIsNext] = useState(true);
    const [currentMove, setCurrentMove] = useState(0);

    const currentSquares = history[currentMove]

    const handlePlay = (nextSquares) => {
        setXIsNext(!xIsNext);
        const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
        setHistory(nextHistory);
        setCurrentMove(nextHistory.length - 1);
    }
    
    function switchHistory(move) {
        setCurrentMove(move);
        setXIsNext(move % 2 === 0);
    }

    const historyReader = history.map((squares, move) => {
        let description;
        if(move > 0){
            description = `Go to the move # : ${move}`;
        }else{
            description = `Start the game # : ${move}`;
        }
        return(
            <li className="bg-green-300 px-1 rounded-md" key={move}> <button onClick={() => switchHistory(move)}>{description}</button></li>
        )
    });

    return(
        <div className="flex flex-col md:flex-row w-full h-lvh justify-center align-middle items-center gap-6 md:gap-14 p-5">
            <div className="rounded-lg border p-5 w-full md:w-auto text-center flex flex-col justify-center">
                <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
            </div>
            <div className="border p-6 rounded-lg w-full md:w-au">
                <h1 className="font-bold text-xl">History: </h1> <br />
                <ol className="flex flex-col gap-2">
                    {historyReader}
                </ol>
            </div>
        </div>
    )
}


function calculateWinner(squares) {
    const lines = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6],
    ];
    
    for(let i = 0; i < lines.length; i++){
        const [a,b,c] = lines[i];
        if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]){
            return squares[a];
        }
    }
    return null;
}
