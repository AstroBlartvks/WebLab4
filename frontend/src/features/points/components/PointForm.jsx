import React, { useState } from 'react';

const PointForm = ({ onSubmit, onRChange, currentR }) => {
  const [x, setX] = useState(0);
  const [y, setY] = useState('');
  const [r, setRValue] = useState(5);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!y || y.trim() === '') {
      alert('Ошибка: Введите значение Y');
      return;
    }

    const numberRegex = /^-?\d+(\.\d+)?$/;
    if (!numberRegex.test(y.trim())) {
      alert('Ошибка: Y должен быть числом (например: 2 или -1.5 или 3.14)');
      return;
    }

    const yValue = parseFloat(y);
    if (isNaN(yValue)) {
      alert('Ошибка: Некорректное число');
      return;
    }

    if (yValue < -3 || yValue > 5) {
      alert('Ошибка: Y должен быть в диапазоне от -3 до 5');
      return;
    }

    onSubmit({ x, y: yValue, r });
  };

  const handleRChange = (newR) => {
    setRValue(newR);
    onRChange(newR);
  };

  return (
    <div className="form-section">
      <h2>Проверка точки</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>X:</label>
          <div className="checkbox-group">
            {[-3, -2, -1, 0, 1, 2, 3, 4, 5].map((val) => (
              <label key={val}>
                <input
                  type="radio"
                  name="x"
                  value={val}
                  checked={x === val}
                  onChange={() => setX(val)}
                />
                {val}
              </label>
            ))}
          </div>
        </div>

        <div className="form-group">
          <label>Y (от -3 до 5):</label>
          <input
            type="text"
            value={y}
            onChange={(e) => setY(e.target.value)}
            placeholder="Введите Y"
            required
          />
        </div>

        <div className="form-group">
          <label>R:</label>
          <div className="checkbox-group">
            {[1, 2, 3, 4, 5].map((val) => (
              <label key={val}>
                <input
                  type="radio"
                  name="r"
                  value={val}
                  checked={r === val}
                  onChange={() => handleRChange(val)}
                />
                {val}
              </label>
            ))}
          </div>
        </div>

        <button type="submit" className="submit-btn">Проверить</button>
      </form>
    </div>
  );
};

export default PointForm;
