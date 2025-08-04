package com.example.demo.Controller;

import com.example.demo.DTOs.FlashCardSetDTO;
import com.example.demo.Entity.FlashCardSet;
import com.example.demo.Service.FlashCardService;
import com.example.demo.Utils.Routes;
import jakarta.validation.Valid;
import org.modelmapper.ModelMapper;
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
    private final ModelMapper mapper;

    public FlashCardController(FlashCardService service, ModelMapper mapper)
    {
        this.service = service;
        this.mapper = mapper;
    }

    @PostMapping
    public ResponseEntity<FlashCardSetDTO> createFlashCardSet(@RequestBody @Valid FlashCardSetDTO flashCardsetDTO)
    {
        var flashCardSet = mapper.map(flashCardsetDTO, FlashCardSet.class);
        service.addFlashCardSet(flashCardSet);

        service.addQuestions(flashCardsetDTO.getQuestions(), flashCardSet);

        final URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(flashCardSet.getId()).toUri();
        return ResponseEntity.created(location).body(flashCardsetDTO);
    }

    @GetMapping()
    public ResponseEntity<List<String>> getTitles()
    {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        final String name = authentication.getPrincipal().toString();

        final var flashCards = service.getFlashCards(name);
        return ResponseEntity.ok().body(flashCards.stream().map(fl -> fl.getTitle()).toList());
    }

    @GetMapping("/{title}")
    public ResponseEntity<FlashCardSet> getFlashCardSet(@PathVariable("title") String title)
    {
        final var flashCardSet = service.getFlashCardSet(title);
        return ResponseEntity.ok().body(flashCardSet);
    }

    @DeleteMapping("/{title}")
    public ResponseEntity<Void> deleteTitle(@PathVariable("title") String title)
    {
        service.deleteSet(title);
        return  ResponseEntity.noContent().build();
    }
}
