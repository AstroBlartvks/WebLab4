package com.lab.points.repository;

import com.lab.points.entity.PointCheck;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface PointCheckRepository extends JpaRepository<PointCheck, Long> {
    List<PointCheck> findByUserIdOrderByCheckedAtDesc(Long userId);
    void deleteByUserId(Long userId);
}
