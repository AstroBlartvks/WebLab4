package com.lab.points.dto;

import java.time.LocalDateTime;

public class PointCheckResponse {
    private Long id;
    private Double x;
    private Double y;
    private Double r;
    private Boolean isHit;
    private Long executionTimeNs;
    private LocalDateTime timestamp;

    public PointCheckResponse() {
    }

    public PointCheckResponse(Long id, Double x, Double y, Double r, Boolean isHit, Long executionTimeNs, LocalDateTime timestamp) {
        this.id = id;
        this.x = x;
        this.y = y;
        this.r = r;
        this.isHit = isHit;
        this.executionTimeNs = executionTimeNs;
        this.timestamp = timestamp;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Double getX() {
        return x;
    }

    public void setX(Double x) {
        this.x = x;
    }

    public Double getY() {
        return y;
    }

    public void setY(Double y) {
        this.y = y;
    }

    public Double getR() {
        return r;
    }

    public void setR(Double r) {
        this.r = r;
    }

    public Boolean getIsHit() {
        return isHit;
    }

    public void setIsHit(Boolean isHit) {
        this.isHit = isHit;
    }

    public Long getExecutionTimeNs() {
        return executionTimeNs;
    }

    public void setExecutionTimeNs(Long executionTimeNs) {
        this.executionTimeNs = executionTimeNs;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }
}
