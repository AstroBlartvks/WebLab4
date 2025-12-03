import React from 'react';

const PointsTable = ({ points, onClearHistory }) => {
  return (
    <div className="table-section">
      <h2>История проверок</h2>
      <button onClick={onClearHistory} className="clear-btn">Очистить историю</button>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Пользователь</th>
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
                <td>{point.username}</td>
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
  );
};

export default PointsTable;
