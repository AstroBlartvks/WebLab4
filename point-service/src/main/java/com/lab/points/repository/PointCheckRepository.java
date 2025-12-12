package com.lab.points.repository;

import com.lab.points.entity.PointCheck;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PointCheckRepository extends JpaRepository<PointCheck, Long> {
    Page<PointCheck> findAllByOrderByCheckedAtDesc(Pageable pageable);
    void deleteByUserId(Long userId);
}
