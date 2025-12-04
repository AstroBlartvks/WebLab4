import React from 'react';
import Pagination from './Pagination';

const PointsTable = ({
  points,
  onClearHistory,
  currentPage,
  totalPages,
  onPageChange,
  pageSize,
  onPageSizeChange,
  totalElements
}) => {
  return (
    <div className="table-section">
      <div className="table-header">
        <h2>История проверок</h2>
        <div className="table-actions">
          {totalElements > 0 && (
            <span className="total-count">Всего записей: {totalElements}</span>
          )}
          <button onClick={onClearHistory} className="clear-btn">Очистить историю</button>
        </div>
      </div>
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
            {points.length === 0 ? (
              <tr>
                <td colSpan="7" style={{ textAlign: 'center', padding: '20px' }}>
                  История пуста
                </td>
              </tr>
            ) : (
              points.map((point) => (
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
              ))
            )}
          </tbody>
        </table>
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
        pageSize={pageSize}
        onPageSizeChange={onPageSizeChange}
      />
    </div>
  );
};

export default PointsTable;
