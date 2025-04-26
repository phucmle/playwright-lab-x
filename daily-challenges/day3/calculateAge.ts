function calculateAge(birthYear: number) {
  const today = new Date();
  const currentYear = today.getFullYear();

  const isValidBirthYear =
    Number.isInteger(birthYear) && birthYear <= currentYear;

  if (isValidBirthYear) {
    const age = currentYear - birthYear;
    console.table({ "Your Birth Year": birthYear, "Your Age": age });
  } else {
    console.table({
      "Your Birth Year": birthYear,
      "Your Age": "Invalid year of birth",
    });
  }
}

// Test cases
calculateAge(1990); // Valid case
calculateAge(2025); // Future year
calculateAge(1800); // Too far in past
calculateAge(2023.5); // Non-integer
