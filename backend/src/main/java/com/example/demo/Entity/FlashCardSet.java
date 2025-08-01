package com.example.demo.Entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import lombok.ToString;
import org.springframework.beans.factory.annotation.Value;

import java.util.ArrayList;
import java.util.List;
import com.example.demo.Utils.Constants;

@Data
@Entity
@ToString
@Table(name = "FlashCardSet")
@RequiredArgsConstructor
public class FlashCardSet
{
    @Value("${title.length}")
    private int TITLE_LENGTH;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @NotBlank
    @Column(name = "Title", length = Constants.TITLE_LENGTH, nullable = false)
    private String title;

    @OneToMany(mappedBy = "flashCardSet", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonBackReference
    private List<Questions> questions = new ArrayList<>();
}
