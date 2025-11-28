package com.lab.points.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "point_checks")
public class PointCheck {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_id", nullable = false)
    private Long userId;

    @Column(nullable = false)
    private Double x;

    @Column(nullable = false)
    private Double y;

    @Column(nullable = false)
    private Double r;

    @Column(name = "is_hit", nullable = false)
    private Boolean isHit;

    @Column(name = "execution_time_ns", nullable = false)
    private Long executionTimeNs;

    @Column(name = "checked_at")
    private LocalDateTime checkedAt;

    public PointCheck() {
        this.checkedAt = LocalDateTime.now();
    }

    public PointCheck(Long userId, Double x, Double y, Double r, Boolean isHit, Long executionTimeNs) {
        this.userId = userId;
        this.x = x;
        this.y = y;
        this.r = r;
        this.isHit = isHit;
        this.executionTimeNs = executionTimeNs;
        this.checkedAt = LocalDateTime.now();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
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

    public LocalDateTime getCheckedAt() {
        return checkedAt;
    }

    public void setCheckedAt(LocalDateTime checkedAt) {
        this.checkedAt = checkedAt;
    }
}
