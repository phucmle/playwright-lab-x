# Javascript
## Problem:
Email is sensitive information and sometimes we need to replace emails in a string with a fixed string like "hidden@example.com". In this exercise, you will write a function to find and replace all email addresses in a text string.

### Requirements:
- Write a JavaScript function named `replaceEmail` to replace all email addresses in the input text string with the string `"hidden@example.com"`.
- Email addresses in the string follow the general format `something@domain.com`, where:
    - `something` is the username (can contain letters, numbers, dots, or underscores).
    - `domain.com` is the domain name (can contain letters, dots).

## Example:
**Input**:
- String: `"Contact me via email john.doe@example.com or support@mydomain.com"`

**Output**:
- Result: `"Contact me via email hidden@example.com or hidden@example.com"`

**Explanation**:
In the string, `"john.doe@example.com"` and `"support@mydomain.com"` are both email addresses, so both are replaced with `"hidden@example.com"`.