export const GRADEBOOK_NAME_PATTERN = "([a-zA-Z0-9\\(\\)\\[\\]]| (?! )){0,29}[a-zA-Z0-9\\(\\)\\[\\]]";
export const CATEGORY_NAME_PATTERN = GRADEBOOK_NAME_PATTERN;
export const ASSIGNMENT_NAME_PATTERN = GRADEBOOK_NAME_PATTERN;

// Only alphanumerics, underscore, and dot.
// Underscore/dot cannot be at end or start.
// Underscore and dot cannot be adjacent to another underscore or dot.
// Number of characters is between 4 and 30, inclusive.
export const usernamePattern = "[a-zA-Z0-9]([._](?![._])|[a-zA-Z0-9]){2,28}[a-zA-Z0-9]";