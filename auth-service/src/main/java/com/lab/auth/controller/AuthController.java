package com.lab.auth.controller;

import com.lab.auth.dto.AuthResponse;
import com.lab.auth.dto.LoginRequest;
import com.lab.auth.dto.RegisterRequest;
import com.lab.auth.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@RequestBody RegisterRequest request) {
        try {
            AuthResponse response = authService.register(request);
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest request) {
        try {
            AuthResponse response = authService.login(request);
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            return ResponseEntity.status(401).build();
        }
    }

    @PostMapping("/validate")
    public ResponseEntity<Boolean> validate(@RequestBody String token) {
        boolean isValid = authService.validateToken(token);
        return ResponseEntity.ok(isValid);
    }
}
