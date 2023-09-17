import React, { useState } from "react";

function ProbabilityCalculator() {
  const [numberList, setNumberList] = useState(""); // user inputs numbers as comma-separated values
  const [selectedNumber, setSelectedNumber] = useState("");
  const [probability, setProbability] = useState(null);

  const calculateProbability = () => {
    const numbers = numberList.split(",").map((num) => parseFloat(num.trim()));
    const occurrences = numbers.filter(
      (num) => num === parseFloat(selectedNumber)
    ).length;
    const prob = occurrences / numbers.length;
    setProbability(prob);
  };

  return (
    <div>
      <div>
        <label>Enter list of numbers (comma separated): </label>
        <input
          type="text"
          value={numberList}
          onChange={(e) => setNumberList(e.target.value)}
        />
      </div>
      <div>
        <label>Enter the number you want to check: </label>
        <input
          type="number"
          value={selectedNumber}
          onChange={(e) => setSelectedNumber(e.target.value)}
        />
      </div>
      <button onClick={calculateProbability}>Calculate</button>
      {probability !== null && (
        <div>
          The probability of {selectedNumber} being selected is: {probability}
        </div>
      )}
    </div>
  );
}

export default ProbabilityCalculator;
