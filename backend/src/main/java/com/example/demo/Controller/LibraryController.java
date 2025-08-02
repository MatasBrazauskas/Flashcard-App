package com.example.demo.Controller;

import com.example.demo.Service.FlashCardService;
import org.modelmapper.ModelMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.Utils.Routes;

import java.util.List;

@RestController
@RequestMapping(Routes.LibraryRouter.LIBRARY_ROUTE)
public class LibraryController
{
    private final FlashCardService flashCardService;
    private final ModelMapper modelMapper;

    public LibraryController(FlashCardService flashCardService, ModelMapper modelMapper)
    {
        this.flashCardService = flashCardService;
        this.modelMapper = modelMapper;
    }

    @GetMapping()
    public ResponseEntity<List<String>> getTitles()
    {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String name = (String) authentication.getPrincipal();

        System.out.println(name);

        var flashCard = flashCardService.getFlashCard(name);
        if(flashCard.isEmpty()){
            return ResponseEntity.internalServerError().build();
        }
        return ResponseEntity.ok().body(flashCard.stream().map(fs -> fs.getTitle()).toList());
        //return ResponseEntity.ok().body(modelMapper.map(flashCard, ResponseEntity.class));
    }
}
