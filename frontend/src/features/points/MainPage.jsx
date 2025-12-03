import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../auth/authSlice';
import { fetchHistory, checkPoint, clearHistory, setR } from './pointsSlice';
import Canvas from './Canvas';
import Header from './components/Header';
import PointForm from './components/PointForm';
import PointsTable from './components/PointsTable';
import './MainPage.css';

const MainPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { points, currentR } = useSelector((state) => state.points);

  useEffect(() => {
    dispatch(fetchHistory());
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const handleSubmit = async ({ x, y, r }) => {
    await dispatch(checkPoint({ x, y, r }));
  };

  const handleRChange = (newR) => {
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
      <Header username={user?.username} onLogout={handleLogout} />

      <div className="content">
        <div className="left-panel">
          <PointForm
            onSubmit={handleSubmit}
            onRChange={handleRChange}
            currentR={currentR}
          />
          <Canvas
            currentR={currentR}
            points={points}
            onCanvasClick={handleCanvasClick}
          />
        </div>

        <div className="right-panel">
          <PointsTable
            points={points}
            onClearHistory={handleClearHistory}
          />
        </div>
      </div>
    </div>
  );
};

export default MainPage;
