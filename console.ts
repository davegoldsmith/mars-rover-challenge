import * as readline from "node:readline";
import { CompassPoint } from "./src/marsMission.types";

/**
 * Creates input reader
 */
const reader = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

/**
 * Prints out the string value given to the console
 * 
 * @param str - message to print
 * @param spacing - either underfined or set to true/ false - if given
 * then an extra empty line is printed after the message
 */
export const print = (str: string, spacing?: boolean): void => {
  console.log(str);
  if (spacing === undefined || spacing === true) {
    console.log();
  }
};

/**
 * Clears the console
 * 
 * @param addTopBorder - add a line border
 */
export const clear = (addTopBorder: boolean): void => {
  console.clear();
  if (addTopBorder) {
    printLine("-", 40);
  }
};

/**
 * Prints a line based on the given value and length
 * 
 * @param value - prints the given value the number of times given
 * @param repeatNumber - print the value this many times
 */
export const printLine = (value: string, repeatNumber: number): void => {
  let line = "";
  for (let i = 0; i < repeatNumber; i++) {
    line += value;
  }
  print(line);
};

/**
 * Print header value
 * 
 * @param header - header message
 */
export const printHeader = (header: string): void => {
  printLine("-", header.length);
  print(header);
  printLine("-", header.length);
}

/**********************************************************************
 * 
 * Asking questions functions
 * 
 **********************************************************************/

/**
 * Ask given question, the logic for which is handled by the callback
 * function
 * 
 * @param question - the question to ask
 * @param callback - callback function
 */
export const askQuestion = (question: string, callback: (arg: string) => void) => {
  reader.question(`❓ ${question} 👉 `, callback);
};

/**
 * Gets question and returns answer asynchronously
 * 
 * @param question - question to ask
 * @returns - response typed by user
 */
export const getQuestionAsync = async (question: string) => {
  return new Promise((resolve, reject) => {
    reader.question(`❓ ${question} 👉 `, (answer) => {
      resolve(answer);
    });
  });
};

/**
 * 
 * @param question - question to ask
 * @param validateFunction - function to handle validation of the response
 * @returns 
 */
export const askValidatedQuestion = async (question: string, validateFunction: Function) => {
  let isValid = false;
  while (isValid === false) {
    const result = await getQuestionAsync(question);
    isValid = validateFunction(result);
    if (isValid) {
      return result;
    }
  }
};

/**********************************************************************
 * 
 * Response validation functions
 * 
 **********************************************************************/

/**
 * Validates that a response is a number
 * 
 * @param value - user response
 * @returns - true if valid else false
 */
export const validateIsNumber = ((value: number) : boolean => {
  let isValid = true;
  if (isNaN(value)) {
    isValid = false;
    print(`⛔ Value must be a number, please try again.`, false);
  }  
  return isValid;
});

/**
 * Validates that a response is a valid compass value
 * @param value - user response
 * @returns - true if valid else false
 */
export const validateIsCompassPoint = ((value: CompassPoint) : boolean => {
  let isValid = "NESW".includes(value);
  if (isValid === false) {
    print(`⛔ Value must be a compass point (N, E, S or W), please try again.`, false);
  }
  return isValid;
})

/**
 * Validates that a response is a valid rover command
 * @param value - user response
 * @returns - true if valid else false
 */
export const validateRoverInstructions = ((value: string) : boolean => {
  let isValid = value.split("").reduce(
    (previous, current) => previous === true || "LMR".includes(current), false);
  if (isValid === false) {
    print(`⛔ Each rover instruction must be L, M or R. please try again.`, false);
  }
  return isValid;
});
