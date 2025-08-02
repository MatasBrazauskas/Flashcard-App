package com.example.demo.Controller;

import com.example.demo.DTOs.FlashCardSetDTO;
import com.example.demo.Service.FlashCardService;
import com.example.demo.Service.QuestionService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.demo.Utils.Routes;

@RestController
@RequestMapping(Routes.FlashCardRouter.FLASH_CARD_ROUTE)
public class FlashCardController
{
    private final FlashCardService flashCardService;
    private final QuestionService questionService;

    public FlashCardController(FlashCardService flashCardService, QuestionService questionService){
        this.flashCardService = flashCardService;
        this.questionService = questionService;
    }

    @PostMapping
    public ResponseEntity<?> createFlashCardSet(@RequestBody @Valid FlashCardSetDTO flashCardsetDTO)
    {
        var flashCard = flashCardService.addFlashCardSet(flashCardsetDTO.getTitle(), flashCardsetDTO.getName());
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
