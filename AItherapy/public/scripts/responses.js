function getBotResponse(input) {
    //rock paper scissors
    if (input == "Yes") {
        return "Let's begin the test";
    } else if (input == "paper") {
        return "scissors";
    } else if (input == "scissors") {
        return "rock";
    }

    // Simple responses
    if (input == "ok") {
        return "You're welcome. Take care!";
    } else if (input == "goodbye") {
        return "Talk to you later!";
    } else {
        return "Try asking something else!";
    }
}