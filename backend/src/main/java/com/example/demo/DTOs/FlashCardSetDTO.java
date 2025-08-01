package com.example.demo.DTOs;

import com.example.demo.Entity.Questions;
import lombok.Data;

import java.util.List;

@Data
public class FlashCardSetDTO
{
    private String title;
    private String name;
    private List<Questions> questions;
}
