package com.example.demo.Repository;

import com.example.demo.Entity.Questions;
import org.springframework.context.annotation.Lazy;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Lazy
@Repository
public interface QuestionsRepo extends JpaRepository<Questions, Integer>
{

}
