laoqiu233 suggested changes last week
auth-service/src/main/java/com/lab/auth/controller/AuthController.java
Comment on lines +33 to +35
} catch (RuntimeException e) {
return ResponseEntity.status(401).build();
}
@laoqiu233
laoqiu233
last week
RuntimeException - 500

а 401 отдавать по результату authService.xxx

@AstroBlartvks	Reply...
auth-service/src/main/java/com/lab/auth/dto/AuthResponse.java

public class AuthResponse {
private String token;
private Long userId;
@laoqiu233
laoqiu233
last week
primitive long

@AstroBlartvks	Reply...
auth-service/src/main/java/com/lab/auth/dto/LoginRequest.java
@@ -0,0 +1,30 @@
package com.lab.auth.dto;

public class LoginRequest {
@laoqiu233
laoqiu233
last week
record для дто?

@AstroBlartvks	Reply...
auth-service/src/main/java/com/lab/auth/service/AuthService.java

    public AuthResponse register(RegisterRequest request) {
        if (userRepository.existsByUsername(request.getUsername())) {
            throw new RuntimeException("Username already exists");
@laoqiu233
laoqiu233
last week
Кидать свой Exception для нормального маппинга статус кодов либо через возвратное значение

@AstroBlartvks	Reply...
auth-service/src/main/resources/application.yml
prefer-ip-address: true

jwt:
secret: lab4-microservices-secret-key-must-be-at-least-256-bits-long-for-security
@laoqiu233
laoqiu233
last week
секрет тоже в енв вынести

@AstroBlartvks	Reply...
gateway/src/main/java/com/lab/gateway/JwtAuthFilter.java
}

    @Override
    public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {
@laoqiu233
laoqiu233
last week
вместо своей валидации ходить в сервис ауф

@AstroBlartvks	Reply...
gateway/src/main/resources/application.yml
prefer-ip-address: true

jwt:
secret: lab4-microservices-secret-key-must-be-at-least-256-bits-long-for-security
@laoqiu233
laoqiu233
last week
гейтвею не надо знать секрет

@AstroBlartvks	Reply...
point-service/src/main/java/com/lab/points/controller/PointController.java
Comment on lines +24 to +34
if (request.getX() == null || request.getY() == null || request.getR() == null) {
return ResponseEntity.badRequest().build();
}

            if (request.getY() < -3 || request.getY() > 5) {
                return ResponseEntity.badRequest().build();
            }

            if (request.getR() <= 0 || request.getR() > 5) {
                return ResponseEntity.badRequest().build();
            }
@laoqiu233
laoqiu233
last week
не хватает описаний + валидацию бы тоже вынести в отдельный Service

@AstroBlartvks	Reply...
frontend/src/features/auth/authSlice.js
logout: (state) => {
state.user = null;
state.token = null;
localStorage.removeItem('token');
@laoqiu233
laoqiu233
last week
сайдэффект в редюсере

@AstroBlartvks	Reply...
frontend/src/features/auth/LoginPage.jsx
<p>Студент: Старченко Александр Николаевич | Группа: P3231 | Вариант: 4467</p>
=======
<p>Студент: Старченко Александр Николаевич | Группа: P3231 | Вариант: [Номер варианта]</p>
>>>>>>> 0efcd31 (Initial commit)
@laoqiu233
laoqiu233
last week
конфликт не порешали

@AstroBlartvks	Reply...
frontend/src/features/points/MainPage.jsx


return (
<div className="main-container">
@laoqiu233
laoqiu233
last week
декомпозировать бы на более мелкие компоненты. вопросы?

на 4 лабе точки должны быть видны от всех пользователей, отсортированные по времени отправки, и должен быть столбец пользователя который отправил эту точку, так же вам необходимо попробовать самостоятельно реализовать прогрузку страниц на бэке (базово хотя бы offset + limit делать чтобы не подгружать все точки на бек, я напишу скрипт который сгенерит вам миллион точек и будем проверять производительность)
в каждой лабе должны быть столбцы: x, y, r, попдаение, время отправки, время работы серверного сценария