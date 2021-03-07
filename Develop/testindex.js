const inquirer = require("inquirer");
const fs = require("fs");


const Employee = require("./lib/employee")
const Engineer = require("./lib/engineer")
const Manager = require("./lib/manager")
const Intern = require("./lib/intern")

let myTeamArray =[];


function teamName() {
    inquirer.prompt([
        {
        message: "Please Enter your team Name :",
        name: "team"
        }
    ])

.then(function(data){
    const myTeamName= data.myTeamName 
    myTeamArray.push(myTeamName)
    addManager();
})

}

function addManager(){
    inquirer.prompt([
        {
            message: "What is your team manager's name?",
            name: "name"
        },
        {
            message: "What is your team manager's email address?",
            name: "email"
        },

        {
            type: "number",
            message: "What is your team manager's office number?",
            name: "officeNumber"
        },
    ])
    .then(function (data) {
        const name = data.name
        const id = 1
        const email = data.email
        const officeNumber = data.officeNumber
        const teamMember = new Manager(name, id, email, officeNumber)
        myTeamArray.push(teamMember)
        addNewTeamMember();
    });

}

function addNewTeamMember() {
    inquirer.prompt([
        {
            type: "list",
            message: "Would you like to add more team members?",
            choices: ["Add an engineer", "Add an intern", "No, I am done adding teammember"],
            name: "addMemberData"
        }
    ])

        .then(function (data) {

            switch (data.addNewTeamMember) {
                case "Yes, add an engineer":
                    addEngineer();
                    break;

                case "Yes, add an intern":
                    addIntern();
                    break;
                case "No, my team is complete":
                    compileTeam();
                    break;
            }
        });
}
function addEngineer() {
    inquirer.prompt([
        {
            message: "What is your engineer's name?",
            name: "name"
        },
        {
            message: "What is your engineer's email address?",
            name: "email"
        },
        {
            message: "What is your engineer's Github profile?",
            name: "github"
        }
    ])

        .then(function (data) {
            const name = data.name
            const id = myTeamArray.length + 1
            const email = data.email
            const github = data.github
            const teamMember = new Engineer(name, id, email, github)
            myTeamArray.push(teamMember)
            addNewTeamMember()
        });

};

function addIntern() {
    inquirer.prompt([
        {
            message: "What is your intern's name?",
            name: "name"
        },
        {
            message: "What is your intern's email address?",
            name: "email"
        },
        {
            message: "What is your intern's school name?",
            name: "school"
        }
    ])

        .then(function (data) {
            const name = data.name
            const id = myTeamArray.length + 1
            const email = data.email
            const school = data.school
            const teamMember = new Intern(name, id, email, school)
            myTeamArray.push(teamMember)
            addNewTeamMember()
        });

};

function compileTeam() {
    console.log("Your team profile is created!!!")

    const htmlArray = []
    const htmlBeginning = `
    <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Star Wars - Express</title>
    <!-- Latest compiled and minified CSS & JS -->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"/>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"/>
  </head>
    <style>
     ${style}
    </style>
</head>
<body>
    <div class="banner-bar">
        <h1>${myTeamArray[0]}</h1>
    </div>
    <div class="card-container">
    `
    htmlArray.push(htmlBeginning);

    for (let i = 1; i < myTeamArray.length; i++) {
        let object = `
        <div class="member-card">
            <div class="card-top">
                <h2>${myTeamArray[i].name}</h2>
                <h2>${myTeamArray[i].title}</h2>
            </div>
            <div class="card-bottom">
                <p>Employee ID: ${myTeamArray[i].id}</p>
                <p>Email: <a href="mailto:${myTeamArray[i].email}">${myTeamArray[i].email}</a>></p>
        `
        if (myTeamArray[i].officeNumber) {
            object += `
            <p>${myTeamArray[i].officeNumber}</p>
            `
        }
        if (myTeamArray[i].github) {
            object += `
            <p>GitHub: <a href="https://github.com/${myTeamArray[i].github}">${myTeamArray[i].github}</a></p>
            `
        }
        if (myTeamArray[i].school) {
            object += `
            <p>School: ${myTeamArray[i].school}</p>
            `
        }
        object += `
        </div>
        </div>
        `
        htmlArray.push(object)
    }

    const htmlEnd = `
    </div>
    </body>
    </html>
    `
    htmlArray.push(htmlEnd);

    fs.writeFile(`./lib${myTeamArray[0]}.html`, htmlArray.join(""), function (err) {
        
    })
}

teamName();
