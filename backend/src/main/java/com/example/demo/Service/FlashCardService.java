package com.example.demo.Service;

import com.example.demo.Entity.FlashCardSet;
import com.example.demo.Repository.FlashCardSetRepo;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Lazy
@Service
public class FlashCardService
{
    private final FlashCardSetRepo flashCardSetRepo;

    public FlashCardService(FlashCardSetRepo repo)
    {
        this.flashCardSetRepo = repo;
    }

    public Optional<FlashCardSet> addFlashCardSet(String title)
    {
        try {
            var flashCard = new FlashCardSet();
            flashCard.setTitle(title);

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
