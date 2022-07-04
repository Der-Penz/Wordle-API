# Wordle-API

Simple node.js API that provides with different kind off operations you need for your Wordle clone

# Host your own

## Requierments

-   node.js
-   npm

## Step 1

Clone the repository and navigate into it via. the console

## Step 2

install all depedencies  
`npm i`

## Step 3

start the api  
`npm run start`

---

# API

-   `/word/valid`:  
    **Description**: check if a word is a valid Wordle  
    **REQUEST query**:  
    `word` -> a word you want to check  
    **RESPONSE**:  
     | key | Description |
    |-------------|---|
    | error | error message if something went wrong (only if status code over 400) |
    | valid | true if the word is in the dictionary |
    | word | the requested word |
    | potentialTargetWord | true if the word can be a solution for a daily Wordle |

<br>

-   `/word/random`:  
    **Description**: gives back a completly random word  
    **REQUEST query**:  
    `count` -> how many random words you want (not required, default: 1)  
    **RESPONSE**:  
     | key | Description |
    |-------------|---|
    | randomWords | an array of random words |
    | count | requested count or 1 |

<br>

-   `/word/daily`:  
    **Description**: returns the the daily wordle or a wordle from a given date  
    **REQUEST query**:  
    `date` -> a date for a wordle can be used to get a wordle from the past or future (not required, default: current Date)  
    **RESPONSE**:  
     | key | Description |
    |-------------|---|
    | error| error message if something went wrong (only if status code over 400) |
    | date | the requested or current date |
    | word | the word from the query |

<br>

-   `/word/costum/create`:  
     **Description**: creates an id for a given word  
    **REQUEST query**:  
    `word` -> a valid word  
     **RESPONSE**:
    | key | Description |
    |-------------|---|
    | error| error message if something went wrong (only if status code over 400) |
    | id | the id from of the word |
    | word | the word from the query |
    | potentialTargetWord | true if the word can be a solution for a daily Wordle |

<br>

-   `/word/costum/get`:  
    **Description**: gives back a word for a given id  
    **REQUEST query**:  
    `id` -> id of a word  
    **RESPONSE**:
    | key | Description |
    |-------------|---|
    | error| error message if something went wrong (only if status code over 400) |
    | id | the id from the query |
    | word | the requested word |

<br>

-   `/word/all`:  
    **Description**: gives back all words sorted inn dictionary and target words  
    **REQUEST query**:  
    **RESPONSE**:  
    | key | Description |
    |-------------|---|
    | dictionary:| |
    | count | number of words |
    | words | all valid words |
    | targetWords: | |
    | count | number of words |
    | words | all words that could be the solution |
