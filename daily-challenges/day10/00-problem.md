# JavaScript

## Problem:

Given any string that may contain spaces at the beginning, end, or between words. Your task is to write a function to
remove all excess spaces, keeping only one space between words, and ensuring there are no spaces at the beginning or end
of the string.

### Requirements:

- Write a JavaScript function called `trimSpaces` to remove all excess spaces in the string.
- Ensure there is only one space between words.
- Remove all spaces at the beginning and end of the string.

## Examples:

**Input 1**:

```javascript
'   Xin   chào   mọi người   ';
```

**Output 1**:

```javascript
'Xin chào mọi người';
```

**Input 2**:

```javascript
'   JavaScript    is    fun   ';
```

**Output 2**:

```javascript
'JavaScript is fun';
```

**Input 3**:

```javascript
'   Lập  trình   JavaScript   ';
```

**Output 3**:

```javascript
'Lập trình JavaScript';
```

# Playwright

- For the following website: https://material.playwrightvn.com/017-detect-user-agent.html
- Use emulation techniques in Playwright to set the status of location, camera and microphone to granted permissions
