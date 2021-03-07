const Employee = require('./Employee')


class Manager extends Employee {

    constructor(id,name,email,officeNumber){
        super(id,name,email);
        this.officeNumber=officeNumber;
        this.title ="Manager"
        this.icon = "fas fa-users fa-sm";
    }

    getOfficeNumber(){

        return this.officeNumber;
    }
    getRole() {

        return this.title;
    }
    getIcon(){
        return this.icon;
    }

    
}

module.exports = Manager;