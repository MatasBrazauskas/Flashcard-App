package com.example.demo.Controller;

import com.example.demo.DTOs.FlashCardSetDTO;
import com.example.demo.DTOs.TitlesDTO;
import com.example.demo.Entity.FlashCardSet;
import com.example.demo.Entity.Questions;
import com.example.demo.Service.FlashCardService;
import com.example.demo.Utils.Routes;
import jakarta.validation.Valid;
import org.springframework.context.annotation.Lazy;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping(path = Routes.FlashCardRouter.FLASH_CARD_ROUTE)
public class FlashCardController
{
    @Lazy
    private final FlashCardService service;

    public FlashCardController(FlashCardService service)
    {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<FlashCardSet> createSet(@RequestBody @Valid FlashCardSetDTO flashCardsetDTO)
    {
        final var createdFlashCard = service.addSet(flashCardsetDTO);
        final URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(createdFlashCard.getId()).toUri();
        return ResponseEntity.created(location).body(createdFlashCard);
    }

    @GetMapping()
    public ResponseEntity<List<TitlesDTO>> getTitles()
    {
        final var authentication = SecurityContextHolder.getContext().getAuthentication();
        final String name = authentication.getPrincipal().toString();

        final var flashCards = service.getUserTitles(name);
        return ResponseEntity.ok().body(flashCards);
    }

    @GetMapping("/{id}")
    public ResponseEntity<List<Questions>> getQuestions(@PathVariable("id") long id)
    {
        final var questions = service.getSetQuestions(id);
        return ResponseEntity.ok().body(questions);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSet(@PathVariable("id") long id)
    {
        final var authentication = SecurityContextHolder.getContext().getAuthentication();
        final String name = authentication.getPrincipal().toString();

        service.deleteSet(id, name);
        return  ResponseEntity.noContent().build();
    }
}
