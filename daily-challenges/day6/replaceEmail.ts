const testInputs: string[] = [
    "Contact me via email john.doe@example.com or support@mydomain.com",
    "My email is user123@gmail.com",
    "No emails in this string",
    "Multiple emails: first.last@company.org and another_user@service.net in one sentence.",
    "Email with punctuation: contact.me@domain.com.",
    "Email at the beginning: admin@system.io is the admin address.",
    "Email with numbers: user123@server456.com should be hidden.",
    "Email with underscores: first_last@mail_service.com is valid.",
    "Not an email: just@the@symbol used multiple times.",
    "Special case: user@domain",
    "Email in quotes: \"contact@business.com\" is our address.",
    "Two emails together: first@domain.com and second@domain.com need separation."
];

function replaceEmail(inputText: string): string {
    const hiddenText = "******";
    const words = inputText.split(" ");

    words.forEach((word, index) => {
        if (word.includes("@")) {
            const emailParts = word.split("@");
            const domainPart = emailParts[emailParts.length - 1];
            words[index] = hiddenText + "@" + domainPart;
        }
    })

    return words.join(" ");
}

testInputs.forEach(testInput => {
    console.log("Test Input :", testInput);
    console.log("Output     :", replaceEmail(testInput));
    console.log("------------");
});