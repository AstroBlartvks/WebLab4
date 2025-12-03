package com.lab.points.controller;

import com.lab.points.dto.CheckPointRequest;
import com.lab.points.dto.PointCheckResponse;
import com.lab.points.service.PointService;
import com.lab.points.service.ValidationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping
public class PointController {

    @Autowired
    private PointService pointService;

    @Autowired
    private ValidationService validationService;

    @PostMapping("/check")
    public ResponseEntity<PointCheckResponse> checkPoint(
            @RequestHeader("X-User-Id") Long userId,
            @RequestHeader("X-Username") String username,
            @RequestBody CheckPointRequest request) {
        validationService.validateRequest(request);
        PointCheckResponse response = pointService.checkPoint(userId, username, request);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/history")
    public ResponseEntity<List<PointCheckResponse>> getHistory(
            @RequestParam(defaultValue = "0") int offset,
            @RequestParam(defaultValue = "100") int limit) {
        List<PointCheckResponse> history = pointService.getHistory(offset, limit);
        return ResponseEntity.ok(history);
    }

    @DeleteMapping("/history")
    public ResponseEntity<Void> clearHistory(@RequestHeader("X-User-Id") Long userId) {
        pointService.clearHistory(userId);
        return ResponseEntity.ok().build();
    }
}
