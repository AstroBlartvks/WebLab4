package com.lab.points.service;

import com.lab.points.dto.CheckPointRequest;
import org.springframework.stereotype.Service;

@Service
public class ValidationService {

    public void validateRequest(CheckPointRequest request) {
        if (request.x() == null || request.y() == null || request.r() == null) {
            throw new IllegalArgumentException("x, y, and r must not be null");
        }

        if (request.y() < -3 || request.y() > 5) {
            throw new IllegalArgumentException("y must be between -3 and 5");
        }

        if (request.r() <= 0 || request.r() > 5) {
            throw new IllegalArgumentException("r must be between 0 and 5");
        }
    }
}
