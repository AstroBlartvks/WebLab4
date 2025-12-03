# Доработки по замечаниям практика

## Backend (Java)

### Auth Service

1. **Custom Exceptions**
   - Создан `UserAlreadyExistsException` для регистрации
   - Создан `InvalidCredentialsException` для аутентификации
   - Создан `GlobalExceptionHandler` для маппинга статус кодов

2. **DTO Records**
   - `LoginRequest` переделан на record
   - `RegisterRequest` переделан на record
   - `AuthResponse` переделан на record с primitive long для userId

3. **JWT Secret в Environment**
   - Секрет вынесен в переменную окружения `JWT_SECRET`
   - Expiration вынесен в `JWT_EXPIRATION`

4. **Обработка исключений в AuthController**
   - Удалены try-catch блоки
   - Исключения обрабатываются через GlobalExceptionHandler
   - Правильные статус коды: 400 для регистрации, 401 для логина

### Gateway

1. **Валидация через Auth Service**
   - Gateway больше не знает JWT secret
   - Валидация токена делегирована в auth-service через WebClient
   - Добавлен LoadBalanced WebClient.Builder bean

2. **Передача username**
   - JWT парсится только для извлечения userId и username
   - Username передается в заголовке `X-Username` в point-service

### Point Service

1. **ValidationService**
   - Валидация запросов вынесена в отдельный сервис
   - Проверка null значений
   - Проверка диапазонов Y (-3 до 5) и R (0 до 5)

2. **Пагинация**
   - Добавлены параметры offset и limit в GET /history
   - По умолчанию offset=0, limit=100
   - Используется Pageable из Spring Data

3. **Видимость точек всем пользователям**
   - GET /history теперь возвращает все точки, а не только текущего пользователя
   - Точки отсортированы по времени отправки (DESC)
   - Добавлен столбец username в таблицу и response

4. **DTO Records**
   - `CheckPointRequest` переделан на record
   - `PointCheckResponse` переделан на record с добавлением username

5. **Entity PointCheck**
   - Добавлено поле username
   - Обновлен конструктор для приема username

6. **Repository**
   - Метод `findByUserIdOrderByCheckedAtDesc` заменен на `findAllByOrderByCheckedAtDesc(Pageable)`
   - Поддержка пагинации

## Frontend (React)

### Redux

1. **Исправлен сайдэффект в authSlice**
   - localStorage операции вынесены из редюсера
   - Создан authMiddleware для обработки localStorage
   - Middleware добавлен в store

### Компоненты

1. **Исправлен конфликт слияния в LoginPage**
   - Оставлен правильный вариант с номером варианта 4467

2. **Декомпозиция MainPage**
   - Создан компонент `Header` - заголовок с информацией и кнопкой выхода
   - Создан компонент `PointForm` - форма для ввода точки
   - Создан компонент `PointsTable` - таблица истории проверок
   - MainPage стал тоньше и использует эти компоненты
   - Добавлен столбец "Пользователь" в таблицу

## База данных

1. **Username в point_checks**
   - Добавлена колонка username в init.sql
   - Схема БД обновлена для поддержки username с самого начала

## Итоги

Все замечания практика исправлены:
- RuntimeException заменен на custom exceptions с правильным маппингом статус кодов
- DTO переделаны на records
- JWT secret вынесен в environment
- Gateway валидирует токены через auth-service
- Создан ValidationService для point-service
- Добавлена пагинация с параметрами offset и limit
- Все точки видны всем пользователям с указанием username
- Исправлен сайдэффект в Redux редюсере
- Исправлен конфликт слияния
- MainPage декомпозирован на компоненты
