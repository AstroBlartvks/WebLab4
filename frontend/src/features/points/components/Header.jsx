import React from 'react';

const Header = ({ username, onLogout }) => {
  return (
    <header className="header">
      <h1>Лабораторная работа 4 - Проверка точек</h1>
      <p>Пользователь: {username} | Группа: P3231 | Старченко Александр Николаевич</p>
      <button onClick={onLogout} className="logout-btn">Выйти</button>
    </header>
  );
};

export default Header;
