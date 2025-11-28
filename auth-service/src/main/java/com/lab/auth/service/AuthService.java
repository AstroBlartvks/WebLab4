package com.lab.auth.service;

import com.lab.auth.dto.AuthResponse;
import com.lab.auth.dto.LoginRequest;
import com.lab.auth.dto.RegisterRequest;
import com.lab.auth.entity.User;
import com.lab.auth.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtService jwtService;

    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public AuthResponse register(RegisterRequest request) {
        if (userRepository.existsByUsername(request.getUsername())) {
            throw new RuntimeException("Username already exists");
        }

        String hashedPassword = passwordEncoder.encode(request.getPassword());
        User user = new User(request.getUsername(), hashedPassword);
        user = userRepository.save(user);

        String token = jwtService.generateToken(user.getId(), user.getUsername());
        return new AuthResponse(token, user.getId(), user.getUsername());
    }

    public AuthResponse login(LoginRequest request) {
        User user = userRepository.findByUsername(request.getUsername())
                .orElseThrow(() -> new RuntimeException("Invalid credentials"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPasswordHash())) {
            throw new RuntimeException("Invalid credentials");
        }

        String token = jwtService.generateToken(user.getId(), user.getUsername());
        return new AuthResponse(token, user.getId(), user.getUsername());
    }

    public boolean validateToken(String token) {
        return jwtService.validateToken(token);
    }
}
