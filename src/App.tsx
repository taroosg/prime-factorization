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
    <div className="container">
      <h1>素因数分解計算機</h1>

      <div className="calculator">
        <div className="input-group">
          <input
            type="number"
            value={inputNumber}
            onChange={handleInputChange}
            placeholder="正の整数を入力"
            min="1"
            step="1"
          />
          <button type="button" onClick={handleCalculate}>計算</button>
        </div>

        {error && <p className="error">{error}</p>}

        {primeFactors.length > 0 && (
          <div className="result">
            <h2>計算結果:</h2>
            <p>
              {inputNumber} = {primeFactors.join(" × ")}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
