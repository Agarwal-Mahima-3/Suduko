
const { useState } = React;

function SudokuIgniter() {
  const emptyGrid = Array(9).fill(0).map(() => Array(9).fill(null));
  const [grid, setGrid] = useState(emptyGrid);
  const [selectedNumber, setSelectedNumber] = useState(null);
  const [view, setView] = useState("menu");

  const handleCellClick = (row, col) => {
    if (selectedNumber !== null) {
      const updated = grid.map((r) => r.slice());
      updated[row][col] = selectedNumber;
      setGrid(updated);
    }
  };

  const handleClearCell = (row, col) => {
    const updated = grid.map((r) => r.slice());
    updated[row][col] = null;
    setGrid(updated);
  };

  const renderMenu = () => (
    <div className="text-center p-6">
      <h1 className="text-4xl font-bold mb-8">Sudoku Igniter</h1>
      <div className="flex flex-col gap-4 items-center">
        <button onClick={() => setView("howToPlay")} className="px-4 py-2 bg-blue-500 text-white rounded">1. How to Play</button>
        <button onClick={() => setView("scoreCard")} className="px-4 py-2 bg-green-500 text-white rounded">2. Score Card</button>
        <button onClick={() => setView("roughPad")} className="px-4 py-2 bg-yellow-500 text-white rounded">3. Rough Sudoku</button>
        <button onClick={() => setView("levels")} className="px-4 py-2 bg-purple-500 text-white rounded">4. Levels</button>
      </div>
    </div>
  );

  const renderHowToPlay = () => (
    <div className="p-6 text-center">
      <h2 className="text-2xl font-bold mb-4">How to Play</h2>
      <p className="text-gray-700">Click a cell, select a number from the pad below, and it fills in. Right-click to erase. Use this to practice and enjoy Sudoku!</p>
      <button onClick={() => setView("menu")} className="mt-6 px-4 py-2 bg-gray-300 rounded">Back to Menu</button>
    </div>
  );

  const renderScoreCard = () => (
    <div className="p-6 text-center">
      <h2 className="text-2xl font-bold mb-4">Score Card</h2>
      <p className="text-gray-500">Score tracking will be added soon. Stay tuned!</p>
      <button onClick={() => setView("menu")} className="mt-6 px-4 py-2 bg-gray-300 rounded">Back to Menu</button>
    </div>
  );

  const renderRoughPad = () => (
    <div className="p-4">
      <h2 className="text-2xl font-bold text-center mb-4">Rough Sudoku Pad</h2>
      <div className="grid grid-cols-9 gap-1 max-w-[36rem] mx-auto">
        {grid.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              onClick={() => handleCellClick(rowIndex, colIndex)}
              onContextMenu={(e) => {
                e.preventDefault();
                handleClearCell(rowIndex, colIndex);
              }}
              className="w-10 h-10 flex items-center justify-center border border-gray-400 bg-white cursor-pointer text-lg"
            >
              {cell !== null ? cell : ""}
            </div>
          ))
        )}
      </div>
      <div className="flex justify-center mt-6 gap-2 flex-wrap">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
          <button
            key={num}
            onClick={() => setSelectedNumber(num)}
            className={\`w-10 h-10 border border-gray-500 rounded-full flex items-center justify-center \${selectedNumber === num ? "bg-blue-500 text-white" : "bg-white"}\`}
          >
            {num}
          </button>
        ))}
        <button
          onClick={() => setSelectedNumber(null)}
          className="ml-4 px-3 py-1 border rounded bg-red-200"
        >
          Erase
        </button>
      </div>
      <div className="text-center mt-6">
        <button onClick={() => setView("menu")} className="mt-4 px-4 py-2 bg-gray-300 rounded">Back to Menu</button>
      </div>
    </div>
  );

  const renderLevels = () => (
    <div className="p-6 text-center">
      <h2 className="text-2xl font-bold mb-4">Levels</h2>
      <p className="text-gray-500">Levels feature coming soon with Easy, Medium, and Hard boards.</p>
      <button onClick={() => setView("menu")} className="mt-6 px-4 py-2 bg-gray-300 rounded">Back to Menu</button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100">
      {view === "menu" && renderMenu()}
      {view === "howToPlay" && renderHowToPlay()}
      {view === "scoreCard" && renderScoreCard()}
      {view === "roughPad" && renderRoughPad()}
      {view === "levels" && renderLevels()}
    </div>
  );
}

ReactDOM.render(<SudokuIgniter />, document.getElementById("root"));
