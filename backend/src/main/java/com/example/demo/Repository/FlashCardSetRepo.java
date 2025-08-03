package com.example.demo.Repository;

import com.example.demo.Entity.FlashCardSet;
import com.example.demo.Utils.Constants;
import jakarta.transaction.Transactional;
import org.springframework.context.annotation.Lazy;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Lazy
@Repository
public interface FlashCardSetRepo extends JpaRepository<FlashCardSet, Integer> {

    @Transactional
    @Query(value = "SELECT * FROM " + Constants.FLASH_CARD_SET_TABLE + " WHERE name = :name", nativeQuery = true)
    public Optional<List<FlashCardSet>> findByName(@Param("name") String name);

    @Transactional
    @Query(value = "SELECT * FROM " + Constants.FLASH_CARD_SET_TABLE + " WHERE title = :title", nativeQuery = true)
    public Optional<FlashCardSet> findByTitle(@Param("title") String title);

    @Modifying
    @Transactional
    @Query(value = "DELETE FROM " + Constants.FLASH_CARD_SET_TABLE + " WHERE title = :title", nativeQuery = true)
    public void deleteByTitle(@Param("title") String title);
}