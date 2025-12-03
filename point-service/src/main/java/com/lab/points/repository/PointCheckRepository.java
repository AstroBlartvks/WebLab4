package com.lab.points.repository;

import com.lab.points.entity.PointCheck;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface PointCheckRepository extends JpaRepository<PointCheck, Long> {
    List<PointCheck> findAllByOrderByCheckedAtDesc(Pageable pageable);
    void deleteByUserId(Long userId);
}
