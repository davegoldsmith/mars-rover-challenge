import { askQuestion, clear, print, printLine} from "./console";

/**
 * Mission control welcome page: enter your name
 */
function welcomeMissionController(): void {
  clear(false);
  print("------------------------------------------");
  print("| 🚀 Welcome to Mars Mission Control 🚀 |");
  print("------------------------------------------");

  askQuestion(`What's your name space cadet? `, startMission);
}

/**
 * Checks you entered a name at the welcome page. Launches
 * the mission if a name is given
 * 
 * @param name Cadet's name
 */
const startMission = (name: string): void => {
  if (name && name.length > 0) {
    askMissionParameters(name);
  } else {
    endMission(false, "🛑 Sorry, unable to verify your Rover status without a name.\n   That means no Rovering for you!");
  }
};

/**
 * Prints the mission options:
 * 1 - to enter mission parameters manually
 * 2 - to enter mission parameters from a file
 * 0 - quit to start
 * @param name Cadet's name
 */
const askMissionParameters = (name: string): void => {
  clear(false);
  const header = `| 🚀 Welcome space cadet ${name}! 🚀 |`;
  printLine("-", header.length);
  print(header);
  printLine("-", header.length);
  print("Please enter : ");
  print("  1: Enter direct commands", false);
  print("  2: Enter commands from a file", false);
  print("  0: Abort the mission");
  askQuestion("How you do want to handle the mission?", handleCommandType);
};

/**
 * Handles the response from the user to determine
 * how mission parameters will be provided
 * @param commandType command option typed in
 * @returns 
 */
const handleCommandType = (commandType: string) => {
  switch (commandType) {
    case "1":
      //return enterMissionParameters();
    case "2":
      //return enterFile();
    case "0":
    default:
      return endMission(false);
  }
};



/**
 * Page that show's if the mission was a success or not, if
 * a success then all rover's end positions are displayed. If
 * a mission fails then an error or warning message is shown
 * @param success - mission sucess status
 * @param message - message to display
 */
const endMission = (success: boolean, message?: string): void => {
  clear(false);
  print("***************************************");
  if (success) {
    print("Well done on a successful Mission! 🥳");
  } else {
    print("Mission aborted! 😭");
  }
  if (message) {
    print(message);
  }
  print("***************************************");

  askQuestion("Press ENTER to restart! ", welcomeMissionController);
};

welcomeMissionController();

