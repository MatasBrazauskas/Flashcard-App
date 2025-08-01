package com.example.demo.Entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import lombok.ToString;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;

import java.util.ArrayList;
import java.util.List;
import com.example.demo.Utils.Constants;

@Data
@Entity
@Table(name = "flash_card_set")
@RequiredArgsConstructor
public class FlashCardSet
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @NotBlank
    @Column(name = "Title", length = Constants.TITLE_LENGTH, nullable = false)
    private String title;

    @NotBlank
    @Column(name = "name", length = 0, nullable = false)
    private String name;

    @OneToMany(mappedBy = "flashCardSet", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    @JsonManagedReference
    private List<Questions> questions = new ArrayList<>();

    public FlashCardSet(String title, String nameAndSurname)
    {
        this.title = title;
        this.name = nameAndSurname;
    }
}
