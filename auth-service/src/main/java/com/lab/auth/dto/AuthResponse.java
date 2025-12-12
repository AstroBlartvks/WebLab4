package com.lab.auth.dto;

public record AuthResponse(String token, long userId, String username) {
}
