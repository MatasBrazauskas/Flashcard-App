package com.example.demo.Entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

import com.example.demo.Utils.Constants;
import lombok.ToString;

@Data
@Entity
@Table(name = Constants.QUESTIONS_TABLE)
public class Questions
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonBackReference
    private FlashCardSet flashCardSet;

    @NotBlank
    @Column(name = "Term", length = Constants.TERM_LENGTH, nullable = false)
    private String term;

    @NotBlank
    @Column(name = "Definition", length = Constants.DEFINITION_LENGTH, nullable = false)
    private String definition;
}
