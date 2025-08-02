package com.example.demo.Service;

import com.example.demo.Entity.FlashCardSet;
import com.example.demo.Repository.FlashCardSetRepo;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class FlashCardService
{
    private final FlashCardSetRepo flashCardSetRepo;

    public FlashCardService(FlashCardSetRepo repo)
    {
        this.flashCardSetRepo = repo;
    }

    public Optional<FlashCardSet> getFlashCard(String nameAndSurname)
    {
        try {
            return flashCardSetRepo.findByName(nameAndSurname);
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return Optional.empty();
        }
    }

    public Optional<FlashCardSet> addFlashCardSet(String title, String nameAndSurname)
    {
        try {
            var flashCard = new FlashCardSet(title, nameAndSurname);

            flashCardSetRepo.save(flashCard);
            return Optional.of(flashCard);
        }
        catch (Exception e)
        {
            System.out.println(e.getMessage() + " addFlashCardSet");
            return Optional.empty();
        }
    }
}
