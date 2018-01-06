/*********************************************************************************
 *  WEB322 – Assignment 06 
 * I declare that this assignment is my own work in accordance with Seneca Academic Policy.
 * No part of this assignment has been copied manually or electronically from any other source
 * (including web sites) or distributed to other students.
 *
 * Name: _Avinash Singh_ Student ID: _115408163_ Date: 21-DEC-2017
 *
 * Online (Heroku) URL: https://lit-brook-78873.herokuapp.com/
 *
 ********************************************************************************/
const Sequelize = require("sequelize");
var sequelize = new Sequelize('dce4a6mkr93m65', 'tbdejonfjndidy', '964bb5f86b0c0d96f253768e882c35c8455410c5d1ba716a5b4ee335cc2bb89d', {
    host: 'ec2-54-235-210-115.compute-1.amazonaws.com',
    dialect: 'postgres',
    port: 5432,
    dialectOptions: {
        ssl: true
    }
});


var Employee = sequelize.define('Employee', {
    employeeNum: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    firstName: Sequelize.STRING,
    last_name: Sequelize.STRING,
    email: Sequelize.STRING,
    SSN: Sequelize.STRING,
    addressStreet: Sequelize.STRING,
    addressCity: Sequelize.STRING,
    addressState: Sequelize.STRING,
    addressPostal: Sequelize.STRING,
    maritalStatus: Sequelize.STRING,
    isManager: Sequelize.BOOLEAN,
    employeeManagerNum: Sequelize.INTEGER,
    status: Sequelize.STRING,
    department: Sequelize.INTEGER,
    hireDate: Sequelize.STRING
});



var Department = sequelize.define('Department', {
    departmentId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    departmentName: Sequelize.STRING
});


module.exports.initialize = function() {
    return new Promise(function(resolve, reject) {
        sequelize.sync().then(() => {
            resolve();
        }).catch(() => {
            reject();
        });
    });
};

module.exports.getAllEmployees = function() {
    return new Promise(function(resolve, reject) {
        Employee.findAll().then(function(employee) {
            resolve(employee);
        }).catch(function(error) {
            console.log(error);
            reject("No result returned");
        });
    });

}

module.exports.getEmployeesByStatus = function(status) {
    return new Promise(function(resolve, reject) {
        Employee.findAll({
            where: {
                status: status
            }
        }).then(function(data) {
            resolve(data);
        }).catch(() => {
            reject("query returned 0 results");
        });
    });
};

module.exports.getEmployeesByDepartment = function(department) {
    return new Promise(function(resolve, reject) {
        Employee.findAll({
            where: {
                department: department
            }
        }).then(function(data) {
            resolve(data);
        }).catch(() => {
            reject("query returned 0 results");
        });
    });
};

module.exports.getEmployeesByManager = function(manager) {
    return new Promise(function(resolve, reject) {
        Employee.findAll({
            where: {
                employeeManagerNum: manager
            }
        }).then(function(data) {
            resolve(data);
        }).catch(() => {
            reject("query returned 0 results");
        });
    });
};

module.exports.getEmployeeByNum = function(num) {
    return new Promise(function(resolve, reject) {
        Employee.findAll({
            where: {
                employeeNum: num
            }
        }).then(function(data) {
            resolve(data[0]);
        }).catch(() => {
            reject("query returned 0 results");
        });
    });
};

module.exports.deleteEmployeeByNum = function(empNum) {
    return new Promise(function(resolve, reject) {
        Employee.destroy({
            where: {
                employeeNum: empNum
            }
        }).then(function() {
            resolve();
        }).catch((err) => {
            reject("unable to delete employee");
        });
    });
}

module.exports.getDepartmentById = function(id) {
    return new Promise(function(resolve, reject) {
        Department.findAll({
            where: {
                departmentId: id
            }
        }).then(function(data) {
            resolve(data[0]);
        }).catch(() => {
            reject("query returned 0 results");
        });
    });
};

module.exports.getManagers = function() {
    return new Promise(function(resolve, reject) {
        Employee.findAll({
            where: {
                isManager: true
            }
        }).then(function(data) {
            resolve(data);
        }).catch(() => {
            reject("query returned 0 results");
        });
    });
};

module.exports.getDepartments = function() {
    return new Promise(function(resolve, reject) {
        Department.findAll().then(function(data) {
            resolve(data);
        }).catch((err) => {
            reject("query returned 0 results");
        });
    });

};

module.exports.addEmployee = function(employeeData) {
    return new Promise(function(resolve, reject) {

        employeeData.isManager = (employeeData.isManager) ? true : false;

        for (var prop in employeeData) {
            if (employeeData[prop] == '')
                employeeData[prop] = null;
        }

        Employee.create(employeeData).then(() => {
            resolve();
            console.log("It IS WORKING");
        }).catch((e) => {
            reject(employeeData.employeeNum);
            //reject();
        });

    });
};

module.exports.updateEmployee = function(employeeData) {

    return new Promise(function(resolve, reject) {

        employeeData.isManager = (employeeData.isManager) ? true : false;

        for (var prop in employeeData) {
            if (employeeData[prop] == '')
                employeeData[prop] = null;
        }

        Employee.update(employeeData, {
            where: { employeeNum: employeeData.employeeNum }
        }).then(() => {
            resolve();
        }).catch((e) => {
            reject();
        });
    });
};

module.exports.addDepartment = function(departmentData) {
    return new Promise(function(resolve, reject) {

        for (var prop in departmentData) {
            if (departmentData[prop] == '')
                departmentData[prop] = null;
        }

        Department.create(departmentData).then(() => {
            resolve();
        }).catch((e) => {
            reject();
        });

    });
};

module.exports.updateDepartment = function(departmentData) {
    return new Promise(function(resolve, reject) {

        for (var prop in departmentData) {
            if (departmentData[prop] == '')
                departmentData[prop] = null;
        }

        Department.update(departmentData, {
            where: { departmentId: departmentData.departmentId }
        }).then(() => {
            resolve();
        }).catch((e) => {
            reject();
        });
    });

};