package com.example.demo.Service;

import com.example.demo.DTOs.FlashCardSetDTO;
import com.example.demo.Entity.FlashCardSet;
import com.example.demo.Repository.FlashCardSetRepo;
import com.example.demo.Repository.QuestionsRepo;
import com.example.demo.Exceptions.Exceptions;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

import java.util.List;

@Lazy
@Service
public class FlashCardService
{
    @Lazy
    private final FlashCardSetRepo fRepo;
    @Lazy
    private final QuestionsRepo qRepo;
    @Lazy
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
        var flashCardSet = new FlashCardSet();
        flashCardSet.setTitle(flashCardSetDTO.getTitle());
        flashCardSet.setName(flashCardSetDTO.getName());

        var saveFlashCardSet = fRepo.save(flashCardSet);

        for(var question : flashCardSet.getQuestions()){
            question.setFlashCardSet(saveFlashCardSet);
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
