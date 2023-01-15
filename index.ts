import {
  CompassPoint,
  DirectionCoordinates,
  MarsPlateau,
  MissionCommands,
  RoverInstructions,
} from "./src/marsMission.types";
import {
  launchMission
} from "./src/marsMissionControl";
import {
  askQuestion,
  askValidatedQuestion,
  clear,
  print,
  printHeader,
  printLine,
  readMissionFromFile,
  validateIsCompassPoint,  
  validateIsNumber,
  validateRoverInstructions
} from "./console";

/**
 * Mission control welcome page: enter your name
 */
function welcomeMissionController(): void {
  clear(false);
  printHeader("| 🚀 Welcome to Mars Mission Control 🚀 |");

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
    endMission(
      false,
      "🛑 Sorry, unable to verify your Rover status without a name.\n   That means no Rovering for you!"
    );
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
  printHeader(`| 🚀 Welcome space cadet ${name}! 🚀 |`);
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
 */
const handleCommandType = (commandType: string) => {
  switch (commandType) {
    case "1":
      enterMissionParameters();
      break;
    case "2":
      enterFile();
      break;
    case "0":
    default:
      endMission(false);
  }
};

/**
 * Get the mission parameters from a file
 */
const enterFile = (): void => {
  clear(true);
  askQuestion("Enter the file location of the mission commands: ", handleFileLoading);
};

/**
 * Handles loading a mission from a given file name, if the file
 * does not exist or does not contain valid mission commands
 * then the mission ends with failure
 * 
 * @param fileName - name of file containing mission commands
 */
const handleFileLoading = (fileName: string) => {
  try {
    const mission = readMissionFromFile(fileName);
    orchestrateMission(mission);    
  } catch(error) {
    endMission(false, `❌ Unable to load valid mission commands from file: '${fileName}'`);
  } 
}

/**
 * Handles all the questions that need to be asked in order to*
 * run the mission, async so that multiple questions can be
 * asked (looping the same questions for each Rover assigned
 * to the mission)
 */
const enterMissionParameters = async () => {
  clear(true);
  // ask the user questions to determine the plateau boundaries
  // and each rover's instruction set
  const marsPlateau = await askPlateauQuestions();
  const roversCommands = await askRoverCommandQuestions();
  // construct the mission object from the inputs
  const mission = {plateau: marsPlateau, roverInstructionsArray: roversCommands} as MissionCommands;
  // orchestrate mission based on all the data entered by the user
  orchestrateMission(mission);
};

/**
 * Launches mission based on the given mission commands
 * 
 * @param mission - the mission commands
 */
const orchestrateMission = (mission: MissionCommands) :void => {
  try {
    const result = launchMission(mission);
    let message = '';
    result.forEach((roverEndPosition: DirectionCoordinates, index: number) => {
      message += `\n🚔 Rover${index+1} finished at x=${roverEndPosition.coordinates.x}, y=${roverEndPosition.coordinates.y} facing ${roverEndPosition.facing} 🚔`
    });
    endMission(true, message);
  } catch(error) {
    endMission(false, `❌ ${(error as Error).message}`);
  } 
}

/**
 * Ask questions to determine the plateau boundaries
 * @returns resolved Promise (plateau object)
 */
const askPlateauQuestions = async () => {
  clear(false);
  printHeader("Enter information for the Mars Plateau 👇");

  const xcoord = await askValidatedQuestion("Enter plateau maximum x coordinate: ", validateIsNumber) as string;
  const ycoord = await askValidatedQuestion("Enter plateau maximum y coordinate: ", validateIsNumber) as string;

  return {
    coordinates: { x: parseInt(xcoord), y: parseInt(ycoord) },
  } as MarsPlateau;
};

/**
 * Ask questions to determine each Rover's starting point and instrustion set
 * @returns resolved Promise (array of rover instructions)
 */
const askRoverCommandQuestions = async () => {
  const numRovers = await askValidatedQuestion("How many Rovers? ", validateIsNumber) as number;
  return await loopRovers(numRovers);
}

/**
 * Loops through questions for each rover
 * @param roverNum number of rover instructions required
 * @returns resolved Promise (array of rover instructions)
 */
const loopRovers = async(roverNum: number) => {
  const roversInstructions = new Array<RoverInstructions>();

  for (let i = 1; i <= roverNum; i++) {
    const instructions = await askRoverQuestions(i);
    roversInstructions.push(instructions);
  }

  return roversInstructions;
};

/**
 * Asks the questions for a particular rover
 * @param roverNum rover number
 * @returns Resolved Promise (rover instructions)
 */
const askRoverQuestions = async(roverNum: number) => {  
  const roverName = `Rover${roverNum}`;
  clear(false);
  printHeader(`Enter details for ${roverName} 👇`);
  
  const xcoord = await askValidatedQuestion(`Enter starting x coordinate for ${roverName}: `, validateIsNumber) as string;
  const ycoord = await askValidatedQuestion(`Enter starting y coordinate for ${roverName}: `, validateIsNumber) as string;
  const facingDir: CompassPoint = await askValidatedQuestion(`Enter initial direction that ${roverName} is facing: `, validateIsCompassPoint) as CompassPoint;
  const instructions: string = await askValidatedQuestion(`Enter instructions for ${roverName}: `, validateRoverInstructions) as string;

  const roverOneInstructions = {
    startCoordinates: { coordinates: { x: parseInt(xcoord), y: parseInt(ycoord) }, facing: facingDir },
    instructions: instructions,
  } as RoverInstructions;
  
  return roverOneInstructions;
}

/**
 * Page that show's if the mission was a success or not, if
 * a success then all rover's end positions are displayed. If
 * a mission fails then an error or warning message is shown
 * @param success - mission sucess status
 * @param message - message to display
 */
const endMission = (success: boolean, message?: string): void => {
  clear(false);
  printLine("*", 40);
  if (success) {
    print("🥳 Well done on a successful Mission! 🥳");
  } else {
    print("Mission aborted! 😭");
  }
  if (message) {
    print(message);
  }
  printLine("*", 40);

  askQuestion("Press ENTER to restart! ", welcomeMissionController);
};

welcomeMissionController();
