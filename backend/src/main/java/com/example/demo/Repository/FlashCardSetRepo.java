package com.example.demo.Repository;

import com.example.demo.Entity.FlashCardSet;
import org.springframework.context.annotation.Lazy;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Lazy
@Repository
public interface FlashCardSetRepo extends JpaRepository<FlashCardSet, Integer>
{

}
