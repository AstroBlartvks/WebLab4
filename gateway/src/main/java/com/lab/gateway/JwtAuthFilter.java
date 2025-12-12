package com.lab.gateway;

import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.GatewayFilterChain;
import org.springframework.http.HttpStatus;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

@Component
public class JwtAuthFilter implements GatewayFilter {

    private final WebClient.Builder webClientBuilder;

    public JwtAuthFilter(WebClient.Builder webClientBuilder) {
        this.webClientBuilder = webClientBuilder;
    }

    @Override
    public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {
        ServerHttpRequest request = exchange.getRequest();

        String authHeader = request.getHeaders().getFirst("Authorization");

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            exchange.getResponse().setStatusCode(HttpStatus.UNAUTHORIZED);
            return exchange.getResponse().setComplete();
        }

        String token = authHeader.substring(7);

        return webClientBuilder.build()
                .post()
                .uri("http://auth-service/validate")
                .bodyValue(token)
                .retrieve()
                .bodyToMono(Boolean.class)
                .flatMap(isValid -> {
                    if (!isValid) {
                        exchange.getResponse().setStatusCode(HttpStatus.UNAUTHORIZED);
                        return exchange.getResponse().setComplete();
                    }

                    try {
                        String[] parts = token.split("\\.");
                        String payload = new String(java.util.Base64.getUrlDecoder().decode(parts[1]));
                        Long userId = extractUserIdFromPayload(payload);
                        String username = extractUsernameFromPayload(payload);

                        ServerHttpRequest modifiedRequest = request.mutate()
                                .header("X-User-Id", String.valueOf(userId))
                                .header("X-Username", username)
                                .build();

                        return chain.filter(exchange.mutate().request(modifiedRequest).build());
                    } catch (Exception e) {
                        exchange.getResponse().setStatusCode(HttpStatus.UNAUTHORIZED);
                        return exchange.getResponse().setComplete();
                    }
                })
                .onErrorResume(error -> {
                    exchange.getResponse().setStatusCode(HttpStatus.UNAUTHORIZED);
                    return exchange.getResponse().setComplete();
                });
    }

    private Long extractUserIdFromPayload(String payload) {
        int userIdIndex = payload.indexOf("\"userId\":");
        if (userIdIndex == -1) return null;
        int start = userIdIndex + 9;
        int end = payload.indexOf(",", start);
        if (end == -1) end = payload.indexOf("}", start);
        return Long.parseLong(payload.substring(start, end).trim());
    }

    private String extractUsernameFromPayload(String payload) {
        int usernameIndex = payload.indexOf("\"username\":\"");
        if (usernameIndex == -1) return null;
        int start = usernameIndex + 12;
        int end = payload.indexOf("\"", start);
        return payload.substring(start, end);
    }
}
