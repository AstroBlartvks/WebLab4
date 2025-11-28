

## Запуск и остановка

```bash
docker-compose up --build

docker-compose up -d

docker-compose down

docker-compose down -v
```

## Логи

```bash
docker-compose logs -f

docker-compose logs -f auth-service
docker-compose logs -f point-service
docker-compose logs -f gateway
docker-compose logs -f eureka-server
docker-compose logs -f frontend
docker-compose logs -f postgres
```

### Подключение к PostgreSQL
```bash
docker exec -it lab4-postgres psql -U admin -d labdb
```

### Пересобрать всё с нуля
```bash
docker-compose down -v
docker system prune -a
docker-compose up --build
```

## Порты

| Сервис | Порт | Описание |
|--------|------|----------|
| Frontend | 3000 | React app (Nginx) |
| Gateway | 8080 | API Gateway |
| Eureka | 8761 | Service Registry |
| PostgreSQL | 5432 | База данных |

## Переменные окружения

```bash
export SPRING_DATASOURCE_URL=jdbc:postgresql://localhost:5432/labdb
export SPRING_DATASOURCE_USERNAME=admin
export SPRING_DATASOURCE_PASSWORD=password
export EUREKA_CLIENT_SERVICEURL_DEFAULTZONE=http://localhost:8761/eureka
```

## Автор

**Студент:** Старченко Александр Николаевич
**Группа:** P3231
**Дата:** 2025-11-20
