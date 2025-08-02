package com.example.demo.Repository;

import com.example.demo.Entity.Questions;
import jakarta.transaction.Transactional;
import org.springframework.context.annotation.Lazy;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.demo.Utils.Constants;

@Lazy
@Repository
public interface QuestionsRepo extends JpaRepository<Questions, Integer>
{
    @Transactional
    @Modifying
    @Query(value = "DELETE FROM " + Constants.QUESTIONS_TABLE + " WHERE flash_card_set_id = :id",nativeQuery = true)
    public void deleteById(@Param("id")long id);
}
