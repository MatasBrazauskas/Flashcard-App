package com.example.demo.Service;

import com.example.demo.Entity.FlashCardSet;
import com.example.demo.Entity.Questions;
import com.example.demo.Repository.FlashCardSetRepo;
import com.example.demo.Repository.QuestionsRepo;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class QuestionService
{
    private final QuestionsRepo questionsRepo;

    public QuestionService(QuestionsRepo repo)
    {
        this.questionsRepo = repo;
    }

    public Optional<List<Questions>> addQuestions(List<Questions> questions, FlashCardSet flashCardSet)
    {
        try{
            for(var question : questions){
                question.setFlashCardSet(flashCardSet);
                questionsRepo.save(question);
            }
            return Optional.of(questions);
        } catch (Exception e){
            System.out.println(e.getMessage() + " addQuestions");
            return Optional.empty();
        }
    }
}
