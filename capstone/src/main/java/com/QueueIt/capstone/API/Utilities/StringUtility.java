package com.QueueIt.capstone.API.Utilities;

public class StringUtility {
    public static String capitalizeFirstLetter(String input) {
        if (input == null || input.isEmpty()) {
            return input; // Return the input as is if it's null or empty
        }

        // Convert the first letter to uppercase and the rest to lowercase
        String firstLetter = input.substring(0, 1).toUpperCase();
        String restOfString = input.substring(1).toLowerCase();

        return firstLetter + restOfString;
    }
}
