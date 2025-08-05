package com.example.demo.Service;

import com.example.demo.DTOs.FlashCardSetDTO;
import com.example.demo.Entity.FlashCardSet;
import com.example.demo.Entity.Questions;
import com.example.demo.Repository.FlashCardSetRepo;
import com.example.demo.Repository.QuestionsRepo;
import com.example.demo.Exceptions.Exceptions;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FlashCardService
{
    private final FlashCardSetRepo fRepo;
    private final QuestionsRepo qRepo;
    private final ModelMapper mapper;

    public FlashCardService(FlashCardSetRepo fRepo, QuestionsRepo qRepo, ModelMapper mapper)
    {
        this.fRepo = fRepo;
        this.qRepo = qRepo;
        this.mapper = mapper;
    }

    public List<FlashCardSet> getFlashCards(String nameAndSurname)
    {
        return fRepo.findByName(nameAndSurname).orElseThrow(() -> new Exceptions.NotFoundException("FlashCard not found with name " + nameAndSurname));
    }

    public FlashCardSet getFlashCardSet(String title)
    {
        return fRepo.findByTitle(title).orElseThrow(() -> new Exceptions.NotFoundException("FlashCardSet not found with title: " + title));
    }

    @Transactional
    public FlashCardSet addSet(FlashCardSetDTO flashCardSetDTO)
    {
        final var flashCardSet = mapper.map(flashCardSetDTO, FlashCardSet.class);
        fRepo.save(flashCardSet);

        for(var question : flashCardSet.getQuestions()){
            question.setFlashCardSet(flashCardSet);
            qRepo.save(question);
        }
        return flashCardSet;
    }

    @Transactional
    public void deleteSet(String title) {
        var flashCardSet = fRepo.findByTitle(title).orElseThrow(() -> new Exceptions.NotFoundException("FlashCardSet not found with title: " + title));

        qRepo.deleteById(flashCardSet.getId());
        fRepo.deleteByTitle(title);
    }
}
