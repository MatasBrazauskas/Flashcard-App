package com.example.demo.Controller;

import com.example.demo.DTOs.FlashCardSetDTO;
import com.example.demo.Entity.FlashCardSet;
import com.example.demo.Service.FlashCardService;
import com.example.demo.Utils.Routes;
import jakarta.validation.Valid;
import org.apache.coyote.Response;
import org.modelmapper.ModelMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(path = Routes.FlashCardRouter.FLASH_CARD_ROUTE)
public class FlashCardController
{
    private final FlashCardService service;
    private final ModelMapper mapper;

    public FlashCardController(FlashCardService serv, ModelMapper mapper)
    {
        this.service = serv;
        this.mapper = mapper;
    }

    @GetMapping()
    public ResponseEntity<List<String>> getTitles()
    {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String name = (String) authentication.getPrincipal();

        System.out.println(name);

        List<FlashCardSet> flashCard = service.getFlashCard(name);
        if(flashCard.isEmpty()){
            return ResponseEntity.internalServerError().build();
        }
        return ResponseEntity.ok().body(flashCard.stream().map(fs -> fs.getTitle()).toList());
        //return ResponseEntity.ok().body(modelMapper.map(flashCard, ResponseEntity.class));
    }

    @DeleteMapping("/{title}")
    public ResponseEntity<?> deleteTitle(@PathVariable("title") String title)
    {
        FlashCardSet flashCard = service.deleteSet(title);
        if(flashCard != null){
            return  ResponseEntity.ok("Flash Card Set Deleted Successfully");
        }
        return ResponseEntity.badRequest().build();
    }

    @PostMapping
    public ResponseEntity<?> createFlashCardSet(@RequestBody @Valid FlashCardSetDTO flashCardsetDTO)
    {
        var flashCard = service.addFlashCardSet(flashCardsetDTO.getTitle(), flashCardsetDTO.getName());
        if(flashCard.isEmpty()){
            return ResponseEntity.badRequest().build();
        }

        var questions = service.addQuestions(flashCardsetDTO.getQuestions(), flashCard.get());
        if(questions.isEmpty()){
            return ResponseEntity.badRequest().build();
        }

        return ResponseEntity.ok(flashCardsetDTO);
    }
}
