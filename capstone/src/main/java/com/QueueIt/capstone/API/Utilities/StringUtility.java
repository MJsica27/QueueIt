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

    public static String randomBackgroundColorString(int e) {
        String[] colors = {
                "#51a647",
                "#85c454",
                "#a7d192",
                "#4ca16f",
                "#a3d4b2",
                "#51b7c4",
                "#0285b5",
                "#04578f",
                "#242d4a",
                "#67679c",
                "#4c4699",
                "#232d61",
                "#342354",
                "#413063",
        };

        return colors[e];
    }
}
