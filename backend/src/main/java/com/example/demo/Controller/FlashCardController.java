package com.example.demo.Controller;

import com.example.demo.DTOs.FlashCardSetDTO;
import com.example.demo.Entity.FlashCardSet;
import com.example.demo.Service.FlashCardService;
import com.example.demo.Utils.Routes;
import jakarta.validation.Valid;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.cache.annotation.Caching;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping(path = Routes.FlashCardRouter.FLASH_CARD_ROUTE)
public class FlashCardController
{
    private final FlashCardService service;

    public FlashCardController(FlashCardService service)
    {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<FlashCardSet> createFlashCardSet(@RequestBody @Valid FlashCardSetDTO flashCardsetDTO)
    {
        final var createdFlashCard = service.addSet(flashCardsetDTO);
        final URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(createdFlashCard.getId()).toUri();
        return ResponseEntity.created(location).body(createdFlashCard);
    }

    @GetMapping()
    @Cacheable(value = "Titles")
    public ResponseEntity<List<String>> getTitles()
    {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        final String name = authentication.getPrincipal().toString();

        final var flashCards = service.getFlashCards(name);
        return ResponseEntity.ok().body(flashCards.stream().map(fl -> fl.getTitle()).toList());
    }

    @GetMapping("/{title}")
    @Cacheable(value = "FlashCardSets", key = "#title")
    public ResponseEntity<FlashCardSet> getFlashCardSet(@PathVariable("title") String title)
    {
        final var flashCardSet = service.getFlashCardSet(title);
        return ResponseEntity.ok().body(flashCardSet);
    }

    @DeleteMapping("/{title}")
    @Caching(evict = {
            @CacheEvict(allEntries = true, value="FlashCardSets"),
            @CacheEvict(allEntries = true, value="Titles")
    })
    public ResponseEntity<Void> deleteSet(@PathVariable("title") String title)
    {
        service.deleteSet(title);
        return  ResponseEntity.noContent().build();
    }
}
