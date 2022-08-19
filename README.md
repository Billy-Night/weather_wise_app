# Weather Wise

Check out the current weather conditions and see what rating the application gives to your preferred sport.

<p align="center">
  <a href="https://weatherwise.netlify.app/">Demo</a> . 
  <a href="https://github.com/Billy-Night/weather_wise_app/issues">Report Bug</a>
 </p>

## Content 

- [Weather Wise](#weather-wise)
  - [Content](#content)
  - [Introduction](#introduction)
  - [Technologies](#technologies)
  - [Languages](#languages)
  - [Launching the project](#launching-the-project)
  - [Project Folder management](#project-folder-management)
    - [Assets](#assets)
    - [Componenets](#componenets)
      - [Current Weather Folder](#current-weather-folder)
      - [Status Bar folder](#status-bar-folder)
      - [The Current Rating File](#the-current-rating-file)
      - [The Utils Folder](#the-utils-folder)
    - [APP.css](#appcss)
    - [APP.js](#appjs)
    - [Other Files to Consider](#other-files-to-consider)
  - [Rating Logic](#rating-logic)
  - [Sports Research](#sports-research)
  - [Project Links](#project-links)
  - [The API's](#the-apis)
  - [Future development](#future-development)
  - [Contributions](#contributions)
## Introduction

The weather wise application was designed to give the user the information in a fast and affective way about how the weather would impact their day participating in their selected sport. It achieves this with taking into account the weather factors that will affect the specified sport, which has been selected by the user. Then it will run an algorithm that will check the parameters of the weather and produce an easy to understand rating system. This project is a student project, for the Wild Code School, which is a 5 month bootcamp in web development, it is carried out while learning React.

## Technologies
The project was built using the following packages:
1. mui/icons-material
2. emotion/react
3. emotion/styled
4. react
5. React-router-dom

The other internal methods used while creating this project were:
1. react context

## Languages 
The languages and frameworks used in the project were as follows:
1. React
2. JavaScript
3. CSS

## Launching the project 
The project can be launched by cloning it from the GitHub repository:
[Weather Wise](https://github.com/Billy-Night/project2-weather-wise-app)

The git clone command:

`$ git clone <repository url>` 

Then the command npm install can be used to install all the dependencies:

`npm install`

Then the user must set up a .env file which contains the API key.

It is also advised to add necessary details to the .gitignore file.

Now use the command npm start to run the server and launch the project.

`npm start`

## Project Folder management
The project is broken out into componenets, the main components in the project are under the source folder, a breakdown of the folders and files can be seen in the following section. 
### Assets
The assets folder contains all the images which relate to the project, they include the icons to the sports selection page and also the the images for the weather icons.

### Componenets
This folder contains all the projects components, which are shown below.
#### Current Weather Folder
This folder contains the  current weather component and the CSS for that component.
#### Status Bar folder
This folder contains the files for the rating circle which is called ProgressBar and the CSS for that component.
#### The Current Rating File
This file contains the content of the currentRating component to render the current rating page, it takes some variables from the MyProvider using context.

#### The Utils Folder
Contains the some of main logic for the project, including the API calls the logic to determine the rating for each sport and the sports data for each sport used when rending each selected sport.

### APP.css 
This file contains the main css for the project, some components were extracted and given their own css file due to the growing size of the APP.css file, in the future the aim would be to reduce this file.

### APP.js 
This file contains the main components that will be render in the project which are placed within react router for navigation throughout the project.

### Other Files to Consider
There is also two hidden files in the project, the .gitignore and the .env, the .env has been explained already. But the .gitignore contains all the files that will be blocked from being uploaded to GitHub.

## Rating Logic
The rating logic was designed by using weighted percentages out of 10. The follow documentation can be found within the Drive Folder of the project :
 [Rating Logic](https://docs.google.com/spreadsheets/d/1p70ekIo1Y9cjNWzRW7qnkRy26js3-0CaIBB37DIykLE/edit#gid=0)

The above file will show the excel used to work out the calculations of the project.

The written documentation which describes the logic for each sport can be found here: [Rating Description](https://docs.google.com/document/d/1-6jl5doi0yxx2qOCsEYJgLoKVLXTchKOUsKekyj6nxs/edit)

The documentation shows what weather factors were taken into account for the each sport that was consider, please take into account, that one of the main benefits of this project is about reusablity and scalability, so as we continue to work on the project the sports will be adding and updated.

## Sports Research
The next piece of documentation is the sports research which can be found here [Sports Research](https://docs.google.com/document/d/1MoCuNbKWR1nALxiuKG2vW8IAAUBz4IIrC84EyWFgNMc/edit)

## Project Links
The project links file contains links to all the external information gathered for the creation of the project. This is not an extensive list. It can be found here [Project Link](https://docs.google.com/document/d/1CigW9Lo96P91aW-7e1iCDInfQbjQc3KYd0_NT4gKNTw/edit)

## The API's
The API's that were used in this project are as follows:
1. The location API, this gets the geolocation of the city that the user has input.
2. The weather API, this API gets the weather using the geolocation from the previous API.
3. The air pollution API which gives the air pollution quality according to the geolocation.

The API's can be found at the following site [Open Weather Map](https://openweathermap.org/api)
## Future development
This project is ongoing and currently in development, we hope to add more sports and improve the recommendations for those sports.

## Contributions
Please feel free to contact me if you have any questions or recommendations

[<img src='https://cdn.jsdelivr.net/npm/simple-icons@3.0.1/icons/github.svg' alt='github' height='40'>](https://github.com/Billy-Night)  [<img src='https://static-exp1.licdn.com/sc/h/9wzc6pgtn06j7dubaufd5wbwv' alt='linkedin' height='40'>](https://www.linkedin.com/in/billynightingale)
