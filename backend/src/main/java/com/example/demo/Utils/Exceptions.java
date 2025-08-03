package com.example.demo.Utils;

public final class Exceptions
{
    public static final class NotFoundException extends RuntimeException {
        public NotFoundException(String message) {
            super(message);
        }
    }
}
