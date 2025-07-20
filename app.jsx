const { useState } = React;

function SudokuIgniter() {
  const emptyGrid = Array(9).fill(0).map(() => Array(9).fill(null));
  const [grid, setGrid] = useState(emptyGrid);
  const [selectedNumber, setSelectedNumber] = useState(null);
  const [view, setView] = useState("menu");

  const handleCellClick = (r, c) => {
    if (selectedNumber != null) {
      const g = grid.map(row => [...row]);
      g[r][c] = selectedNumber;
      setGrid(g);
    }
  };

  const handleClear = (r, c) => {
    const g = grid.map(row => [...row]);
    g[r][c] = null;
    setGrid(g);
  };

  const Menu = () => (
    <div className="text-center p-6">
      <h1 className="text-4xl font-bold mb-8">Sudoku Igniter</h1>
      <div className="space-y-4">
        {["howToPlay", "scoreCard", "roughPad", "levels"].map((id, i) => (
          <button
            key={id}
            onClick={() => setView(id)}
            className="w-full max-w-xs px-4 py-2 bg-blue-500 text-white rounded"
          >
            {i + 1}. {id.replace(/([A-Z])/g, ' $1')}
          </button>
        ))}
      </div>
    </div>
  );

  const HowToPlay = () => (
    <div className="text-center p-6">
      <h2 className="text-2xl font-bold mb-4">How to Play</h2>
      <p>Click a cell → select number below → fill. Right-click clears.</p>
      <button onClick={() => setView("menu")} className="mt-4 px-4 py-2 bg-gray-300 rounded">Back</button>
    </div>
  );

  const ScoreCard = () => (
    <div className="text-center p-6">
      <h2 className="text-2xl font-bold mb-4">Score Card</h2>
      <p>Coming soon!</p>
      <button onClick={() => setView("menu")} className="mt-4 px-4 py-2 bg-gray-300 rounded">Back</button>
    </div>
  );

  const RoughPad = () => (
    <div className="p-4">
      <h2 className="text-2xl font-bold text-center mb-4">Rough Sudoku</h2>
      <div className="grid grid-cols-9 gap-1 max-w-md mx-auto">
        {grid.map((row, r) => row.map((cell, c) => (
          <div
            key={`${r}-${c}`}
            onClick={() => handleCellClick(r, c)}
            onContextMenu={(e) => { e.preventDefault(); handleClear(r, c); }}
            className="w-10 h-10 flex items-center justify-center border bg-white cursor-pointer"
          >
            {cell ?? ""}
          </div>
        )))}
      </div>
      <div className="flex flex-wrap justify-center mt-4 gap-2">
        {Array.from({ length: 9 }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => setSelectedNumber(i + 1)}
            className={`w-10 h-10 border rounded flex items-center justify-center ${
              selectedNumber === i + 1 ? "bg-blue-500 text-white" : "bg-white"
            }`}
          >
            {i + 1}
          </button>
        ))}
        <button onClick={() => setSelectedNumber(null)} className="px-3 py-1 border rounded bg-red-200">Erase</button>
      </div>
      <div className="text-center mt-4">
        <button onClick={() => setView("menu")} className="px-4 py-2 bg-gray-300 rounded">Back</button>
      </div>
    </div>
  );

  const Levels = () => (
    <div className="text-center p-6">
      <h2 className="text-2xl font-bold mb-4">Levels</h2>
      <p>Easy / Medium / Hard coming soon!</p>
      <button onClick={() => setView("menu")} className="mt-4 px-4 py-2 bg-gray-300 rounded">Back</button>
    </div>
  );

  const views = { menu: Menu, howToPlay: HowToPlay, scoreCard: ScoreCard, roughPad: RoughPad, levels: Levels };
  const ViewComp = views[view] || Menu;

  return <div className="min-h-screen bg-gray-100"><ViewComp /></div>;
}

ReactDOM.createRoot(document.getElementById("root")).render(<SudokuIgniter />);
