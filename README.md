# 🚀 Mars Rover Challenge 🚀

## The Challenge

## My approach

I initially started with a TDD aproach implementing and refining my initial design that broke down the areas of responsibility into the following:

### The Rover

I implemented the rover itself as a class which encapsulate the attributes and behaviour for each rover such as:
-- setting initial coordinates and orientation
-- rotation and movement on the plateau

The Rover class holds the positional state for the individual rover during the Mars Mission.

### The Plateau

I created a separate javascript file to validate the data for the Mars Plateau, it does the following:
-- validates that the initial coordinates for the plateau
-- validates that a given rover move remains within the boundaries of the plateau

### Mars Mission Control

This is where the inputs for the Mars Mission are processed and validated and then the mission is undertaken. It does the following:
-- validates the Mars Plateau parameters and throws appropriate error if not
-- creates the requisite number of rovers
-- processes the commands for each rover where valid and throws appropriate error if not
-- returns the finishing coordinates and orientation for the given rovers

Therefore one of the following outcomes will occur:
-- Error if plateau parameters are invalid
-- Error if a rover would collide with another rover or fall off the plateau
-- Success when the mission runs smoothly

## Assumptions


### Starting with TDD

I initially started with a TDD approach based on my initalise

## Instructions

- Click the "Use this template" button

- Click "Create new repository"

- Give your repository a name and click "Create repository from template"

- Clone down your new repository to your computer

- Navigate to the directory on your command line

- Run `npm install` followed by `npm test` to run the tests

