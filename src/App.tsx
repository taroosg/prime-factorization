import { useState } from "react";
import "./App.css";

// 素因数分解のロジック関数
const primeFactorization = (input: number): number[] => {
  // 入力値が2未満の場合は空配列を返す
  if (input < 2) return [];

  const factors: number[] = [];
  let divisor = 2;
  let remaining = input;

  while (remaining >= 2) {
    if (remaining % divisor === 0) {
      factors.push(divisor);
      remaining = remaining / divisor;
    } else {
      divisor++;
    }
  }

  return factors;
};

function App() {
  const [inputNumber, setInputNumber] = useState<string>("");
  const [primeFactors, setPrimeFactors] = useState<number[]>([]);
  const [error, setError] = useState<string>("");

  // 入力値の変更ハンドラ
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputNumber(e.target.value);
    setError("");
  };

  // 計算ボタンのクリックハンドラ
  const handleCalculate = () => {
    const num = Number.parseInt(inputNumber, 10);

    // 入力値のバリデーション
    if (Number.isNaN(num) || num <= 0 || !Number.isInteger(num)) {
      setError("正の整数を入力してください");
      setPrimeFactors([]);
      return;
    }

    // 素因数分解を実行
    const factors = primeFactorization(num);
    setPrimeFactors(factors);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white dark:bg-gray-900 shadow-lg rounded-lg mt-10">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800 dark:text-gray-100">
        素因数分解計算機
      </h1>

      <div className="space-y-6">
        <div className="flex space-x-2">
          <input
            type="number"
            value={inputNumber}
            onChange={handleInputChange}
            placeholder="正の整数を入力"
            min="1"
            step="1"
            className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500 dark:bg-gray-800 dark:text-gray-100"
          />
          <button
            type="button"
            onClick={handleCalculate}
            className="px-4 py-2 bg-gray-800 text-white dark:bg-gray-600 rounded-md shadow-sm hover:bg-gray-700 dark:hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors"
          >
            計算
          </button>
        </div>

        {error && (
          <p className="text-red-600 dark:text-red-400 text-sm font-medium">
            {error}
          </p>
        )}

        {primeFactors.length > 0 && (
          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md border border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold mb-2 text-gray-700 dark:text-gray-300">
              計算結果:
            </h2>
            <p className="text-lg text-gray-800 dark:text-gray-200">
              {inputNumber} = {primeFactors.join(" × ")}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
