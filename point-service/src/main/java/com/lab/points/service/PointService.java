package com.lab.points.service;

import com.lab.points.dto.CheckPointRequest;
import com.lab.points.dto.PointCheckResponse;
import com.lab.points.entity.PointCheck;
import com.lab.points.repository.PointCheckRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PointService {

    @Autowired
    private PointCheckRepository repository;

    public boolean checkHit(double x, double y, double r) {
        if (x >= 0 && y >= 0 && x <= r && y <= r) {
            return true;
        }

        if (x <= 0 && y >= 0 && y <= x/2 + r/2) {
            return true;
        }

        if (x <= 0 && y <= 0 && (x*x + y*y) <= r*r) {
            return true;
        }

        return false;
    }

    public PointCheckResponse checkPoint(Long userId, CheckPointRequest request) {
        long startTime = System.nanoTime();
        boolean isHit = checkHit(request.getX(), request.getY(), request.getR());
        long executionTime = System.nanoTime() - startTime;

        PointCheck pointCheck = new PointCheck(
            userId,
            request.getX(),
            request.getY(),
            request.getR(),
            isHit,
            executionTime
        );

        pointCheck = repository.save(pointCheck);

        return new PointCheckResponse(
            pointCheck.getId(),
            pointCheck.getX(),
            pointCheck.getY(),
            pointCheck.getR(),
            pointCheck.getIsHit(),
            pointCheck.getExecutionTimeNs(),
            pointCheck.getCheckedAt()
        );
    }

    public List<PointCheckResponse> getHistory(Long userId) {
        return repository.findByUserIdOrderByCheckedAtDesc(userId).stream()
            .map(pc -> new PointCheckResponse(
                pc.getId(),
                pc.getX(),
                pc.getY(),
                pc.getR(),
                pc.getIsHit(),
                pc.getExecutionTimeNs(),
                pc.getCheckedAt()
            ))
            .collect(Collectors.toList());
    }

    @Transactional
    public void clearHistory(Long userId) {
        repository.deleteByUserId(userId);
    }
}
