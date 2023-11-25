
const Employee = require('../employee.model');
const expect = require('chai').expect;
const Department = require('../department.model');

describe('Employee Reading data', () => {

    before(async function () {
        const testEmployeeOne = new Employee({ firstName: 'John', lastName: 'Doe', department: 'Marketing' });
        await testEmployeeOne.save();

        const testEmployeeTwo = new Employee({ firstName: 'Jane', lastName: 'Smith', department: 'Marketing' });
        await testEmployeeTwo.save();
    });

    it('should return all the data with "find" method', async () => {
        const employees = await Employee.find();
        const expectedLength = 2;
        expect(employees.length).to.be.equal(expectedLength);
    });

    it('should return a proper document by "firstName" with "findOne" method', async () => {
        const employee = await Employee.findOne({ firstName: 'John' });
        const expectedName = 'John';
        expect(employee.firstName).to.be.equal(expectedName);
    });

    after(async function () {
        await Employee.deleteMany();
    });
});

describe('Employee Creating data', () => {

    it('should insert new employee document with "save" method', async () => {
        const newEmployee = new Employee({ firstName: 'Alice', lastName: 'Doe', department: 'Sales' });
        await newEmployee.save();
        expect(newEmployee.isNew).to.be.false;

        const foundEmployee = await Employee.findOne({ firstName: 'Alice' });
        expect(foundEmployee).to.not.be.null;
        expect(foundEmployee.firstName).to.equal('Alice');
    });

    after(async function () {
        await Employee.deleteMany();
    });
});

describe('Employee Deleting data', () => {
    before(async function () {
        try {
            const newEmployee = new Employee({ firstName: 'John', lastName: 'Doe', department: 'Marketing' });
            await newEmployee.save();
        } catch (err) {
            console.error(err);
        }
    });

    it('should properly remove one employee document with "deleteOne" method', async () => {
        await Employee.deleteOne({ firstName: 'John' });
        const removedEmployee = await Employee.findOne({ firstName: 'John' });
        expect(removedEmployee).to.be.null;
    });

    it('should properly remove all employee documents with "deleteMany" method', async () => {
        await Employee.deleteMany();
        const employees = await Employee.find();
        expect(employees).to.have.lengthOf(0);
    });

    after(async function () {
        await Employee.deleteMany();
    });
});

describe('Employee Populating Department', () => {
    before(async function () {
        try {
            const testDepartment = new Department({ name: 'Marketing' });
            await testDepartment.save();

            const newEmployee = new Employee({ firstName: 'John', lastName: 'Doe', department: testDepartment._id });
            await newEmployee.save();
        } catch (err) {
            console.error(err);
        }
    });

    it('should properly populate the department field of an employee', async () => {
        const employeesWithDepartment = await Employee.find().populate('department');
        const employee = employeesWithDepartment[0];

        expect(employee.department.name).to.equal('Marketing');
        expect(employee.department).to.be.an('object');
    });

    after(async function () {
        await Employee.deleteMany();
        await Department.deleteMany();
    });
});