package com.example.demo.Repository;

import com.example.demo.Entity.FlashCardSet;
import jakarta.transaction.Transactional;
import org.springframework.context.annotation.Lazy;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Lazy
@Repository
public interface FlashCardSetRepo extends JpaRepository<FlashCardSet, Integer>
{
    @Transactional
    @Query(value = "SELECT * FROM flash_card_set WHERE name = :name", nativeQuery = true)
    public List<FlashCardSet> findByName(@Param("name")String name);
}
