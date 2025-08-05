package com.example.demo.Service;

import com.example.demo.Entity.FlashCardSet;
import com.example.demo.Entity.Questions;
import com.example.demo.Repository.FlashCardSetRepo;
import com.example.demo.Repository.QuestionsRepo;
import com.example.demo.Exceptions.Exceptions;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FlashCardService
{
    private final FlashCardSetRepo fRepo;
    private final QuestionsRepo qRepo;

    public FlashCardService(FlashCardSetRepo fRepo, QuestionsRepo qRepo)
    {
        this.fRepo = fRepo;
        this.qRepo = qRepo;
    }

    public List<FlashCardSet> getFlashCards(String nameAndSurname)
    {
        return fRepo.findByName(nameAndSurname).orElseThrow(() -> new Exceptions.NotFoundException("FlashCard not found with name " + nameAndSurname));
    }

    public void addFlashCardSet(FlashCardSet flashCardSet)
    {
        fRepo.save(flashCardSet);
    }

    public void addQuestions(List<Questions> questions, FlashCardSet flashCardSet)
    {
        for(var question : questions){
            question.setFlashCardSet(flashCardSet);
            qRepo.save(question);
        }
    }

    public void deleteSet(String title) {
        var flashCardSet = fRepo.findByTitle(title).orElseThrow(() -> new Exceptions.NotFoundException("FlashCardSet not found with title: " + title));

        qRepo.deleteById(flashCardSet.getId());
        fRepo.deleteByTitle(title);
    }

    public FlashCardSet getFlashCardSet(String title)
    {
        return fRepo.findByTitle(title).orElseThrow(() -> new Exceptions.NotFoundException("FlashCardSet not found with title: " + title));
    }
}
