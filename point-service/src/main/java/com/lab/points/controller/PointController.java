package com.lab.points.controller;

import com.lab.points.dto.CheckPointRequest;
import com.lab.points.dto.PointCheckResponse;
import com.lab.points.service.PointService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping
public class PointController {

    @Autowired
    private PointService pointService;

    @PostMapping("/check")
    public ResponseEntity<PointCheckResponse> checkPoint(
            @RequestHeader("X-User-Id") Long userId,
            @RequestBody CheckPointRequest request) {
        try {
            if (request.getX() == null || request.getY() == null || request.getR() == null) {
                return ResponseEntity.badRequest().build();
            }

            if (request.getY() < -3 || request.getY() > 5) {
                return ResponseEntity.badRequest().build();
            }

            if (request.getR() <= 0 || request.getR() > 5) {
                return ResponseEntity.badRequest().build();
            }

            PointCheckResponse response = pointService.checkPoint(userId, request);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/history")
    public ResponseEntity<List<PointCheckResponse>> getHistory(@RequestHeader("X-User-Id") Long userId) {
        try {
            List<PointCheckResponse> history = pointService.getHistory(userId);
            return ResponseEntity.ok(history);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @DeleteMapping("/history")
    public ResponseEntity<Void> clearHistory(@RequestHeader("X-User-Id") Long userId) {
        try {
            pointService.clearHistory(userId);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
}
