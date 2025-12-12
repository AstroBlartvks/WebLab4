import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login, register } from './authSlice';
import './LoginPage.css';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token, loading, error } = useSelector((state) => state.auth);

  useEffect(() => {
    if (token) {
      navigate('/main');
    }
  }, [token, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!username.trim() || !password.trim()) {
      alert('Ошибка: Заполните все поля');
      return;
    }

    try {
      await dispatch(login({ username, password })).unwrap();
      navigate('/main');
    } catch (err) {
      alert('Ошибка входа: Неверные учетные данные');
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!username.trim() || !password.trim()) {
      alert('Ошибка: Заполните все поля');
      return;
    }

    if (username.length < 3) {
      alert('Ошибка: Имя пользователя должно содержать минимум 3 символа');
      return;
    }

    if (password.length < 6) {
      alert('Ошибка: Пароль должен содержать минимум 6 символов');
      return;
    }

    try {
      await dispatch(register({ username, password })).unwrap();
      navigate('/main');
    } catch (err) {
      alert('Ошибка регистрации: Пользователь уже существует');
    }
  };

  return (
    <div className="login-container">
      <div className="login-header">
        <h1>Лабораторная работа 4 - Проверка точек</h1>
        <p>Студент: Старченко Александр Николаевич | Группа: P3231 | Вариант: 4467</p>
      </div>
      <div className="login-form">
        <h2>Вход / Регистрация</h2>
        <form>
          <div className="form-group">
            <label>Имя пользователя:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Введите имя пользователя"
              required
            />
          </div>
          <div className="form-group">
            <label>Пароль:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Введите пароль"
              required
            />
          </div>
          {error && <div className="error">Ошибка: {error}</div>}
          <div className="button-group">
            <button type="button" onClick={handleLogin} disabled={loading}>
              Войти
            </button>
            <button type="button" onClick={handleRegister} disabled={loading}>
              Зарегистрироваться
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
