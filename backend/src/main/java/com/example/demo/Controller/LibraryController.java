package com.example.demo.Controller;

import com.example.demo.Entity.FlashCardSet;
import com.example.demo.Entity.Questions;
import com.example.demo.Service.FlashCardService;
import org.modelmapper.ModelMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/library")
public class LibraryController
{
    private final FlashCardService flashCardService;
    private final ModelMapper modelMapper;

    public LibraryController(FlashCardService flashCardService, ModelMapper modelMapper)
    {
        this.flashCardService = flashCardService;
        this.modelMapper = modelMapper;
    }

    @GetMapping("/{name}")
    public ResponseEntity<List<String>> getTitles(@PathVariable("name") String name)
    {
        System.out.println(name);
        List<FlashCardSet> flashCard = flashCardService.getFlashCard(name);
        if(flashCard == null || flashCard.size() == 0){
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok().body(flashCard.stream().map(fs -> fs.getTitle()).toList());
        //return modelMapper.map(flashCard.get(0), ResponseEntity.class);
    }
}
