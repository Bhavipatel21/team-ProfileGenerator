const Employee = require('./Employee')


class Intern extends Employee {

    constructor(id, name, email, school) {
        super(id, name, email)
        this.school = school
        this.title = 'Intern'
        this.icon = "fas fa-graduation-cap fa-sm";
    }


    getSchool(){
        return this.school;
    }

    getRole() {
        return this.title;
    }
    getIcon(){
        return this.icon;
    }



}

module.exports = Intern;