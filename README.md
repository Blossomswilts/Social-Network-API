# Social Network API
![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)

## Description
This social network API is built off of the back end of a social network application. It uses Express.js for routing, a MongoDB database, and the Mongoose ODM. It also uses Moment.js to format time and date stamps. The API allows users to create, read, update, and delete users, thoughts, and reactions.
This could be implemented into a front end application to create a full social network application. Such as Facebook, Twitter, or Instagram.
You are able to see users, thoughts, and reactions. Within users, you are able to see their friends and friend count. Within thoughts, you are able to see reactions and reaction count. Using 'virtuals', we are able to see the total count of friends and reactions by linking the models together. (Connections are not made in the database, but are made virtually in the API.)

## Table of Contents
* [Installation](#installation)
* [Usage](#usage)
* [Contribution](#contribution)
* [Screenshots](#screenshots)
* [License](#license)
* [Questions](#questions)


## Installation
To have this application on your own system, `git clone` the repository and set it up in your local system. Ex (Vs Code).
You will need to run `npm install` which will install the necessary package dependencies;
* Once all the dependencies are installed, you will need to run the schema.sql file in mysql to create the database. 
* No seeding is necessary, as you populate the database through the program itself.
## Usage
In order to run the program, after obtaining all of the dependencies you will need to run;
* `npm start` : this will begin the program in your terminal, in which you will be able to navigate through the prompts to create, read, update, and delete from the E-COMMERCE database.
* Within this application, I used insomnia to test the routes and see the database. You can use insomnia or any other program that allows you to test routes and add data to the database.
* MongoDBCompass is also a great tool to use to see the database and the data within it.
* Application link to github repository: [Social Network API](https://github.com/Blossomswilts/Social-Network-API)

## Contribution
If you would like to contribute to this project, and improve it in your own way(s), please do the following:
- `Fork` the repository on GitHub
- `Clone` the project onto your own machine (such as VsCode)
- `Commit` your changes to a branch you have created
- `Push` your changes back up through your fork
- Submit a `pull request` so that my team and I can review your changes.

As a side note, when making changes, always merge or pull from the latest version to ensure you are working on the most up to date version of the application. 

## Screenshots
This is the program interface using Insomnia to view the database where you can CREATE, READ, UPDATE, and DELETE from the database.
You can also access the database through MongoDBCompass.

Here you can see how we add a new user.
![new-user](https://github.com/Blossomswilts/Social-Network-API/assets/117021869/f2793ea0-e71a-4375-8c49-f55bc37a6a52)

Here you can see how we add a new thought.
![new-thought](https://github.com/Blossomswilts/Social-Network-API/assets/117021869/4519eb09-2354-4bea-aad3-a5a335d4046b)

Here you see how we add a new reaction to a thought.
![reaction](https://github.com/Blossomswilts/Social-Network-API/assets/117021869/2cbd4eaf-6d63-4c3e-9bee-a7a84dfeca90)

Here is a brief overview of the database using MongoDBCompass.
![MongoDBCompass](https://github.com/Blossomswilts/Social-Network-API/assets/117021869/b7a648ae-3c8e-4caf-aafc-70fcea1cf2ce)





Video Walk-Through: [Social Network API](https://drive.google.com/file/d/1poFUHEjhTS3dvTKz1srrcgU2vaaGjeKz/view)

## License
[MIT](https://choosealicense.com/licenses/mit/)

## Questions
If you have any questions, or would like to show off some of your work, don't hesitate to message me through any of the following contacts!

GitHub: [Blossomswilts](https://github.com/Blossomswilts)
(ctrl+click to follow link, where you can see this user's repositories and profile)
    

Email: michael.r.tranquillo@gmail.com
(ctrl+click to send email to this address with your default email client or copy and paste address into your email client)