package com.example.demo.Controller;

import com.example.demo.DTOs.FlashCardSetDTO;
import com.example.demo.Service.FlashCardService;
import com.example.demo.Service.QuestionService;
import jakarta.validation.Valid;
import org.springframework.context.annotation.Lazy;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/flashCardSet")
public class Controller
{
    @Lazy
    private final FlashCardService flashCardService;
    @Lazy
    private final QuestionService questionService;

    public Controller(FlashCardService flashCardService, QuestionService questionService){
        this.flashCardService = flashCardService;
        this.questionService = questionService;
    }

    @GetMapping
    public void temp()
    {
        System.out.println("Working");
    }

    @PostMapping
    public ResponseEntity<?> createFlashCardSet(@Valid @RequestBody FlashCardSetDTO flashCardsetDTO)
    {
        System.out.println(flashCardsetDTO.getTitle());
        System.out.println(flashCardsetDTO.getQuestions());

        var flashCard = flashCardService.addFlashCardSet(flashCardsetDTO.getTitle());
        if(flashCard.isEmpty()){
            return ResponseEntity.badRequest().build();
        }

        var questions = questionService.addQuestions(flashCardsetDTO.getQuestions(), flashCard.get());
        if(questions.isEmpty()){
            return ResponseEntity.badRequest().build();
        }

        return ResponseEntity.ok(flashCardsetDTO);
    }
}
