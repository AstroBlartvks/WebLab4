package com.lab.points.dto;

import java.time.LocalDateTime;

public record PointCheckResponse(
        Long id,
        Double x,
        Double y,
        Double r,
        Boolean isHit,
        Long executionTimeNs,
        LocalDateTime timestamp,
        String username
) {
}
