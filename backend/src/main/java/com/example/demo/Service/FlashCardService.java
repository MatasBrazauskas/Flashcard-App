package com.example.demo.Service;

import com.example.demo.DTOs.FlashCardSetDTO;
import com.example.demo.DTOs.TitlesDTO;
import com.example.demo.Entity.FlashCardSet;
import com.example.demo.Entity.Questions;
import com.example.demo.Repository.FlashCardSetRepo;
import com.example.demo.Repository.QuestionsRepo;
import com.example.demo.Exceptions.Exceptions;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.springframework.cache.CacheManager;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.cache.annotation.Caching;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;
import com.example.demo.Utils.Constants;

import java.util.ArrayList;
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
    @Lazy
    private final CacheManager cacheManager;

    public FlashCardService(FlashCardSetRepo fRepo, QuestionsRepo qRepo, ModelMapper mapper, CacheManager cacheManager)
    {
        this.fRepo = fRepo;
        this.qRepo = qRepo;
        this.mapper = mapper;
        this.cacheManager = cacheManager;
    }

    @Transactional
    public FlashCardSet addSet(FlashCardSetDTO flashCardSetDTO)
    {
        var flashCardSet = new FlashCardSet();
        flashCardSet.setTitle(flashCardSetDTO.getTitle());
        flashCardSet.setName(flashCardSetDTO.getName());

        var saveFlashCardSet = fRepo.save(flashCardSet);
        var questions =  flashCardSetDTO.getQuestions();

        for(var question : questions){
            question.setFlashCardSet(saveFlashCardSet);
            qRepo.save(question);
            System.out.println(question.getTerm());
        }

        cacheManager.getCache(Constants.QUESTIONS_CACHE).put(saveFlashCardSet.getId(), questions);

        List<TitlesDTO> cachedTitles = cacheManager.getCache(Constants.TITLES_CACHE).get(saveFlashCardSet.getName(), List.class);

        if (cachedTitles == null) {
            cachedTitles = new ArrayList<>();
        }else{
            cachedTitles = new ArrayList<>(cachedTitles);
        }

        cachedTitles.add(new TitlesDTO(flashCardSet.getId(), flashCardSet.getTitle()));
        cacheManager.getCache(Constants.TITLES_CACHE).put(saveFlashCardSet.getName(), cachedTitles);

        return saveFlashCardSet;
    }

    @Cacheable(value = Constants.TITLES_CACHE, key="#name")
    public List<TitlesDTO> getUserTitles(String name)
    {
        var flashCard = fRepo.findByName(name).orElseThrow(() -> new Exceptions.NotFoundException(Constants.NotFoundErrorMessage(name)));
        return flashCard.stream().map(fl -> new TitlesDTO(fl.getId(), fl.getTitle())).toList();
    }

    @Cacheable(value = Constants.QUESTIONS_CACHE, key="#id")
    public List<Questions> getSetQuestions(long id)
    {
        var flashCard = fRepo.findById((int)id).orElseThrow(() -> new Exceptions.NotFoundException(Constants.NotFoundErrorMessage("")));
        return flashCard.getQuestions();
    }

    @Transactional
    @Caching(evict={
            @CacheEvict(value=Constants.QUESTIONS_CACHE, key="#id"),
            @CacheEvict(value=Constants.TITLES_CACHE, key="#name")
    })
    public void deleteSet(long id, String name) {
        qRepo.deleteById(id);
        fRepo.deleteById((int)id);
    }

    @CacheEvict(value=Constants.QUESTIONS_CACHE, key="setId")
    public void deleteSetQuestion(long setId, String term)
    {
        qRepo.deleteQuestion(setId, term);
    }
}
