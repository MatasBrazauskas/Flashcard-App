package com.example.demo.Config;

import com.example.demo.DTOs.TitlesArray;
import com.example.demo.Entity.FlashCardSet;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class ModelMapperConfig
{
    @Bean
    public ModelMapper modelMapper()
    {
        ModelMapper modelMapper = new ModelMapper();

        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT).setSkipNullEnabled(true);
        modelMapper.createTypeMap(FlashCardSet.class, TitlesArray.class)
                .addMapping(fc -> fc.getQuestions(), TitlesArray::setTitles);

        return modelMapper;
    }
}
