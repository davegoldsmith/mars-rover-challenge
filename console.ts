import * as readline from "node:readline";

const reader = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

export const print = (str: string, spacing?: boolean): void => {
  console.log(str);
  if (spacing === undefined || spacing === true) {
    console.log();
  }
};

export const clear = (addTopBorder: boolean): void => {
  console.clear();
  if (addTopBorder) {
    print("------------------------------------");
  }
};

export const printLine = (value: string, repeatNumber: number): void => {
  let line = "";
  for (let i = 0; i < repeatNumber; i++) {
    line += value;
  }
  print(line);
};

// this function allows us to prompt the user with a question, and call a callback function with whatever string has been input
export function askQuestion(question: string, callback: (arg: string) => void) {
  reader.question(`❓ ${question} 👉 `, callback);
};
