const Sequelize = require('sequelize');

var sequelize = new Sequelize('dd94rltmtpgprb', 'wumokwfclmgqse', '50fa06511804961e677c50695f0a590afa105e4b61e143a4003786677faeb89b', {
 host: 'ec2-52-71-85-210.compute-1.amazonaws.com',
 dialect: 'postgres',
 port: 5432,
 dialectOptions: {
 ssl: true
 }
});

const Employee = sequelize.define('Employee', {
    employeeNum: {
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    firstName:Sequelize.STRING,
    lastName:Sequelize.STRING,
    email:Sequelize.STRING,
    SSN:Sequelize.STRING,
    addressStreet:Sequelize.STRING,
    addressCity:Sequelize.STRING,
    addressState:Sequelize.STRING,
    addressPostal:Sequelize.STRING,
    martialStatus:Sequelize.STRING,
    isManager:Sequelize.BOOLEAN,
    employeeManagerNum:Sequelize.INTEGER,
    status:Sequelize.STRING,
    department:Sequelize.INTEGER,
    hireDate:Sequelize.STRING,
});

 const Department = sequelize.define('Department',{
    departmentId:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    departmentName: Sequelize.STRING
});

exports.initialize = function() {
    return new Promise((resolve, reject) => {
        sequelize.sync()
        .then(() => resolve())
        .catch(() => reject("unable to sync the database"));
    });
};

exports.getAllEmployees = function(){
    return new Promise(function (resolve, reject) {
        Employee.findAll().then(function (data) {
            resolve(data);
        }).catch((err) => {
            reject("query returned 0 results");
        });
    });
}

/*exports.getManagers = function(){
    return new Promise((resolve, reject) => {
        let filteredEmployees = Employee.filter(Employee => Employee.isManager == true);
        filteredEmployees.findAll()
        .then(()=>resolve(filteredEmployees))
        .catch(()=>reject("no results returned")) 
    });
};*/

exports.getDepartments = function(){
    return new Promise(function (resolve, reject) {
        Department.findAll().then(function (data) {
            resolve(data);
        }).catch((err) => {
            reject("query returned 0 results");
        });
    });
}


exports.getEmployeesByStatus = function(status){
    return new Promise((resolve, reject) => {
        Employee.findAll({
            where:{
                status: status
            }
        })
        .then(()=>resolve(Employee.findAll({
            where:{
                status: status
            }
        })))
        .catch(()=>reject("no results returned")) 
    });
}

exports.getEmployeesByDepartment = function(department){
    return new Promise((resolve, reject) => {
        Employee.findAll({
            where:{
                department: department
            }
        })
        .then(()=>resolve(Employee.findAll({
            where:{
                department: department
            }
        })))
        .catch(()=>reject("no results returned")) 
    });
}

exports.getEmployeesByManager = function(manager){
    return new Promise((resolve, reject) => {
        Employee.findAll({
            where:{
                employeeManagerNum: manager
            }
        })
        .then(()=>resolve(Employee.findAll({
            where:{
                employeeManagerNum: manager
            }
        })))
        .catch(()=>reject("no results returned")) 
    });
}

exports.getEmployeeByNum = function(num){
    return new Promise((resolve, reject) => {
        Employee.findAll({
            where:{
                employeeNum: num
            }
        })
        .then(()=>resolve(Employee.findAll({
            where:{
                employeeNum: num
            }
        })))
        .catch(()=>reject("no results returned")) 
    });
}

exports.getDepartmentById = function(id){
    return new Promise((resolve, reject) => {
       Department.findAll({
            where:{
                departmentId: id
            }
        })
        .then(()=>resolve(Department.findAll({
            where:{
                departmentId: id
            }
        })))
        .catch(()=>reject("no results returned")) 
    });
}

exports.addEmployee = function (employeeData) {
    return new Promise(function (resolve, reject) {

        employeeData.isManager = (employeeData.isManager) ? true : false;

        for (var prop in employeeData) {
            if(employeeData[prop] == '')
                employeeData[prop] = null;
        }

        Employee.create(employeeData).then(() => {
            resolve();
        }).catch((err)=>{
            console.log(err);
            reject("unable to create employee");
        });

    });

};

exports.addDepartment = function(departmentData){
    for(prop in departmentData){
        if(prop=="") prop=null;
    }
    return new Promise((resolve, reject) => {
        Department.create(departmentData)
        .then(()=>resolve())
        .catch(()=>reject("unable to create employee"))
    });
};

exports.updateEmployee = function(employeeData){
    employeeData.isManager = (employeeData.isManager) ? true : false;
    for(prop in employeeData){
        if(prop=="") prop=null;
    }
    return new Promise((resolve, reject) => {
        Employee.update(employeeData,{where: {employeeNum:employeeData.employeeNum}}) 
        .then(()=>resolve(Employee.update(employeeData,{where: {employeeNum:employeeData.employeeNum}}) ))
        .catch(()=>reject("unable to update employee"))
    });
};

exports.updateDepartment = function(departmentData){
    for(prop in departmentData){
        if(prop=="") prop=null;
    }
    return new Promise((resolve, reject) => {
        Department.update(departmentData,{where:{departmentId: departmentData.departmentId}}) 
        .then(()=>resolve(Department.update(departmentData,{where:{departmentId: departmentData.departmentId}})))
        .catch(()=>reject("unable to update department"))
    });
};

exports.deleteEmployeeByNum = function(empNum){
    return new Promise((resolve, reject) => {
        Employee.destroy({where: {employeeNum:empNum}}) 
        .then(()=>resolve(Employee.destroy({where: {employeeNum:empNum}}))) 
        .catch(()=>reject("unable to delete employee"))
    });
};