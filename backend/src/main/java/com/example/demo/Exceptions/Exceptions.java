package com.example.demo.Exceptions;

public final class Exceptions
{
    public static final class NotFoundException extends RuntimeException {
        public NotFoundException(String message) {
            super(message);
        }
    }
}
