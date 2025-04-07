Feature: User registration

    Scenario: Successfully user registration with valid data
        Given I navigate to the Registration page
        When I fill in the registration form with following details:
            | User Name | felix                |
            | Email     | felix_test@gmail.com |
            | Gender    | male                 |
            | Hobbies   | reading, cooking     |
        And I submit the form
        Then The following user details should be displayed:
            | User Name | felix                |
            | Email     | felix_test@gmail.com |
            | Gender    | male                 |
            | Hobbies   | reading, cooking     |