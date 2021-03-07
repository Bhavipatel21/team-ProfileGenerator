const inquirer = require("inquirer");
const fs = require("fs");


const Employee = require("./lib/employee")
const Engineer = require("./lib/engineer")
const Manager = require("./lib/manager")
const Intern = require("./lib/intern")

let myTeamArray = [];


 function myTeamName() {
    inquirer.prompt([
        {
            message: "Please Enter your team Name:",
            name: "teamname"
        }
    ])
        .then(function(data){
            const teamName = data.teamname
            myTeamArray.push(teamName)
            addManager();
        })

    
}
 
function addManager() {
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
            addTeamMembers();
        });

}

function addTeamMembers() {
    inquirer.prompt([
        {
            type: "list",
            message: "Would you like to add more team members?",
            choices: ["Yes, add an engineer", "Yes, add an intern", "No, my team is complete"],
            name: "addMemberData"
        }
    ])

        .then(function (data) {

            switch (data.addMemberData) {
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
            message: "What is this engineer's name?",
            name: "name"
        },
        {
            message: "What is this engineer's email address?",
            name: "email"
        },
        {
            message: "What is this engineer's Github profile?",
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
            addTeamMembers()
        });

};

function addIntern() {
    inquirer.prompt([
        {
            message: "What is this intern's name?",
            name: "name"
        },
        {
            message: "What is this intern's email address?",
            name: "email"
        },
        {
            message: "What is this intern's school?",
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
            addTeamMembers()
        });

};

function compileTeam() {
    console.log("Your team profile is successfully generated!!!")

    const htmlArray = []
    const htmlBeginning = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <title>My Team</title>
        <!-- Latest compiled and minified CSS & JS -->
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"/>
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"/>
        <!--font awesome kit-->
        <script src="https://kit.fontawesome.com/e9b8e84ab6.js"></script>
      </head>
    
      <body>
        <div class="container-fulid">
          <div class="jumbotron text-center" style="background-color:#dc3545">
            <h1 style="color:white;">${myTeamArray[0]}</h1>
           </div>
    <div class="container">
    <div class="row row-cols-1 row-cols-md-3 g-4">
    `
    htmlArray.push(htmlBeginning);

    for (let i = 1; i < myTeamArray.length; i++) {
         let object = `
  <div class="col">
    <div class="card mb-3 mt-3">
        <div class="card-body">
          <div class="card-header bg-primary text-white" style="font-size: 20px;">${myTeamArray[i].name}
            <p><i class="${myTeamArray[i].icon}"></i> ${myTeamArray[i].title}</p>
          </div>
          <ul class="list-group list-group-flush">
          <li class="list-group-item">ID:${myTeamArray[i].id}</li>
          <li class="list-group-item">Email :<a href="mailto:${myTeamArray[i].email}">${myTeamArray[i].email}</a></li>
              
        `
        if (myTeamArray[i].officeNumber) {
            object += `
            <li class="list-group-item">OfficeNumber:${myTeamArray[i].officeNumber} </li>`
        }
        if (myTeamArray[i].github) {
            object += `
            <li class="list-group-item">GitHub: <a href="https://github.com/${myTeamArray[i].github}">${myTeamArray[i].github}</a></li>
            `
        }
        if (myTeamArray[i].school) {
            object += `
            <li class="list-group-item">School: ${myTeamArray[i].school}</li>
            `
        }
        
        object += `
        </ul>
        </div>
        </div>
        </div>
      
        `
        htmlArray.push(object)
    }

    const htmlEnd = `
    </div>
    </div>
    </body>
    </html>
    `
    htmlArray.push(htmlEnd);

    fs.writeFile(`./dist/${myTeamArray[0]}.html`, htmlArray.join(""), function (err) {
        
    })
}

 myTeamName(); 

