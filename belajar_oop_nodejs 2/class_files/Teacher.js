let per = require('./Person.js');

// Inheritance

class Teacher extends per.Person{
    constructor(name,city,school,subject,enrollYear,basesalary) {
        super(name, city, school);
        this.subject=subject;
        this.enrollYear=enrollYear;
        this.basesalary=basesalary;

        let bonus = 1000;

        let fullSalaryPermonth = function(){
            return basesalary+ bonus;
        }
        this.salary = fullSalaryPermonth();
    }

    // Encapsulation
    getTeacherId(){
        return this.tid;
    }
    setTeacherId(tid){
        this.tid = tid;
    }
    serviceYears(){
        return new Date().getFullYear()-this.enrollYear;
    }
    retireFund(){
       return this.serviceYears()*50000;
    }

    bio(){  
        let gen = "";
        if(this.getGender()=="female"){
            gen ="She";
        
        }
        else{
            gen =  "He";
            
        }
       
       return `${this.name} is born in ${this.getDOB()}.
       <br> ${gen} lives in ${this.city}.
       <br> ${gen} is ${this.calculateAge()} years old.
       <br> ${gen} is a teacher who works at ${this.school}.
       <br>${gen} is a ${this.subject} teacher. 
       <br>the ID of ${this.name} is ${this.getTeacherId()}.
       <br>${gen} has a monthly salary of ${this.salary}.
       <br> ${gen} has ${this.serviceYears()} of service years.
       <br>If ${gen} retires now, ${gen} has a retire fund of ${this.retireFund()}.`;
   };
}

module.exports = {Teacher:Teacher}