package com.example.demo.Service;

import com.example.demo.Entity.FlashCardSet;
import com.example.demo.Entity.Questions;
import com.example.demo.Repository.FlashCardSetRepo;
import com.example.demo.Repository.QuestionsRepo;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

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

    public Optional<List<Questions>> addQuestions(List<Questions> questions, FlashCardSet flashCardSet)
    {
        try{
            for(var question : questions){
                question.setFlashCardSet(flashCardSet);
                qRepo.save(question);
            }
            return Optional.of(questions);
        } catch (Exception e){
            System.out.println(e.getMessage() + " addQuestions");
            return Optional.empty();
        }
    }

    public List<FlashCardSet> getFlashCard(String nameAndSurname)
    {
        try {
            return fRepo.findByName(nameAndSurname);
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return new ArrayList<>();
        }
    }

    public Optional<FlashCardSet> addFlashCardSet(String title, String nameAndSurname)
    {
        try {
            var flashCard = new FlashCardSet(title, nameAndSurname);

            fRepo.save(flashCard);
            return Optional.of(flashCard);
        }
        catch (Exception e)
        {
            System.out.println(e.getMessage() + " addFlashCardSet");
            return Optional.empty();
        }
    }

    public FlashCardSet deleteSet(String title) {
        System.out.println(title);
        try {
            List<FlashCardSet> flashCardSet = fRepo.findByTitle(title);
            qRepo.deleteById(flashCardSet.get(0).getId());
            fRepo.deleteByTitle(title);

            return flashCardSet.get(0);
        } catch( Exception e){
            System.out.println(e.getMessage());
        }
        return null;
    }
}
