import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../auth/authSlice';
import { fetchHistory, checkPoint, clearHistory, setR } from './pointsSlice';
import Canvas from './Canvas';
import './MainPage.css';

const MainPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { points, currentR } = useSelector((state) => state.points);

  const [x, setX] = useState(0);
  const [y, setY] = useState('');
  const [r, setRValue] = useState(5);

  useEffect(() => {
    dispatch(fetchHistory());
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const handleSubmit = async (e) => {
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

    await dispatch(checkPoint({ x, y: yValue, r }));
  };

  const handleRChange = (newR) => {
    setRValue(newR);
    dispatch(setR(newR));
  };

  const handleClearHistory = () => {
    dispatch(clearHistory());
  };

  const handleCanvasClick = (cx, cy) => {
      if (cx < -3 || cx > 5) {
        alert('Ошибка: X должен быть в диапазоне от -3 до 5');
        return;
      }
      if (cy < -3 || cy > 5) {
        alert('Ошибка: Y должен быть в диапазоне от -3 до 5');
        return;
      }
      dispatch(checkPoint({ x: cx, y: cy, r: currentR }));
    };


  return (
    <div className="main-container">
      <header className="header">
        <h1>Лабораторная работа 4 - Проверка точек</h1>
        <p>Пользователь: {user?.username} | Группа: P3231 | Старченко Александр Николаевич</p>
        <button onClick={handleLogout} className="logout-btn">Выйти</button>
      </header>

      <div className="content">
        <div className="left-panel">
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

           <Canvas
              currentR={currentR}
              points={points}
              onCanvasClick={handleCanvasClick}
            />
        </div>

        <div className="right-panel">
          <div className="table-section">
            <h2>История проверок</h2>
            <button onClick={handleClearHistory} className="clear-btn">Очистить историю</button>
            <div className="table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th>X</th>
                    <th>Y</th>
                    <th>R</th>
                    <th>Результат</th>
                    <th>Время (нс)</th>
                    <th>Дата</th>
                  </tr>
                </thead>
                <tbody>
                  {points.map((point) => (
                    <tr key={point.id}>
                      <td>{point.x}</td>
                      <td>{point.y.toFixed(2)}</td>
                      <td>{point.r}</td>
                      <td className={point.isHit ? 'hit' : 'miss'}>
                        {point.isHit ? 'Попадание' : 'Промах'}
                      </td>
                      <td>{point.executionTimeNs}</td>
                      <td>{new Date(point.timestamp).toLocaleString('ru-RU')}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
