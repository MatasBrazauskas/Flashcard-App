package com.example.demo.Utils;

public final class Constants
{
    public static final int TITLE_LENGTH = 25;
    public static final int TERM_LENGTH = 30;
    public static final int DEFINITION_LENGTH = 256;

    public static final String FLASH_CARD_SET_TABLE = "flash_card_set";
    public static final String QUESTIONS_TABLE = "questions";

    public static final int MAX_REQUESTS_PER_SECOND = 2;

    public static String NotFoundErrorMessage(String name)
    {
        return "FlashCard not found with name " + name;
    }
}
