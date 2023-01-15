# 🚀 Mars Rover Challenge 🚀

## 1. The Challenge

You have been asked to create a program to move rovers around the surface of Mars!
✨
The surface of Mars is represented by a Plateau, you can make the assumption that the
Plateau is a square/rectangular grid for the purpose of this task.
Rovers navigate the Plateau so they can use their special cameras 📷 and robot arms
🦾 to collect samples back to Planet Earth 🌏

## 2. Assumptions

The design was based on the following assumptions:
- Plateau is rectangular and the furthest extent x, y coordinate is provided to determine the boundaries of the plateau.
- Each Rover will fulfil its whole set of instructions before any subsequent Rovers start their instructions.
- A Rover cannot move to a point that is occupied by another rover and if a move would result in this then an error is thrown.
- A Rover cannot move outside the boundaries of the plateau.
- A Rover's start coordinates must be in the boundaries of the plateau.

## 3. The Design

I went for a heavily typed solution based on the brief and the assumptions above. I broke down the problem into the follwing areas of responsibility:

### 3.1. The Rover
I implemented the rover itself as a class which encapsulates the attributes and behaviour for each rover such as:
- setting initial coordinates and orientation
- rotation and movement on the plateau

The Rover class holds the positional state for the individual rover during the Mars Mission.

### 3.2. The Plateau
I created a separate javascript file to validate the data for the Mars Plateau, it does the following:
- validates that the initial coordinates for the plateau
- validates that a given rover move remains within the boundaries of the plateau

### 3.3. Mars Mission Control
This is where the inputs for the Mars Mission are processed and validated and then the mission is undertaken. It does the following:
- validates the Mars Plateau parameters and throws appropriate error if not
- creates the requisite number of rovers
- processes the commands for each rover where valid and throws appropriate error if not
- returns the finishing coordinates and orientation for the given rovers

Therefore one of the following outcomes will occur:
- Error if a Rover's starting coordinates are not in the plateau's boundaries
- Error if plateau parameters are invalid
- Error if a rover would collide with another rover or fall off the plateau
- Success when the mission runs smoothly

## 4. Starting with TDD

I initially started with a TDD approach based on the design above and created tests for each area of responsibility. The tests test for valid and not valid data being provided. Obviously the use of TypeScript minimises the need for certain data validation.

## 5. Console Input

After completing the initial design I implemented a way of running the Mars Mission from the command line. I split the reponsibilities into the following:
- `index.ts` - contains the logic for navigating the application
- `console.ts` - handles the execution of printing to and inputting from the console, as well as validation of inputs

### 5.1. Running the Mars Mission

#### Start screen

![Welcome to Mission Control](./images/start.jpg)

Enter your name to enter mission control. If You don't you can't rover!

![Welcome to Mission Control](./images/no-name-abort.jpg)

#### Mission choices

![Welcome to Mission Control](./images/mission-choices.jpg)

Enter 1 to add mission parameters manually.
Enter 2 to add mission parameters from a file.

#### Enter parameters manually

First Enter the plateau details

![Welcome to Mission Control](./images/plateau.jpg)

Next add the details for each Rover on the mission.

![Welcome to Mission Control](./images/rover.jpg)

If you type invalid responses then a warning is shown and the question is asked again.

#### Enter mission from file

Type in a valid file that contains valid mission commands. The mission commands should look like this:

``` json
{
  "plateau": { "coordinates": { "x": 22, "y": 22 } },
  "roverInstructionsArray": [
    {
      "startCoordinates": {
        "coordinates": { "x": 1, "y": 1 },
        "facing": "N"
      },
      "instructions": "MM"
    },
    {
      "startCoordinates": {
        "coordinates": { "x": 2, "y": 2 },
        "facing": "E"
      },
      "instructions": "MM"
    }
  ]
}
```

![Welcome to Mission Control](./images/file-mission.jpg)

#### Successful Mission! 

The final destinations for each Rover is displayed

![Welcome to Mission Control](./images/success.jpg)

#### Unsuccessful Mission

If an error occurs during the mission then the mission aborts and an error is shown.

![Welcome to Mission Control](./images/error-abort.jpg)

If reading from an invalid file or contents is invalid then the mission is aborted.

![Welcome to Mission Control](./images/bad-file-abort.jpg)

## 6. Future enhancements, if I had time!

The one I almost finished but didn't quite get there before the deadline was adding a list of obstacles as part of the mission parameters.

Here's a list of enhancements I would like to add:

- Add obstructions, pitfalls and things to find and harness
- Add aliens, other vehicles
- Add weapons that work on certain obstacles
- Add two player elements (battleships style where you move your rover to find the opponents vehicles etc.)
- Different plateau types
- Visual UI components


