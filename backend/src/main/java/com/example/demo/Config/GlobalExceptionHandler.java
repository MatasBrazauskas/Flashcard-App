package com.example.demo.Config;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import com.example.demo.Utils.Exceptions;

@ControllerAdvice
public class GlobalExceptionHandler
{
    @ExceptionHandler(Exceptions.NotFoundException.class)
    public ResponseEntity<String> handleFontFormatException(Exceptions.NotFoundException e)
    {
        return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
    }
}
