const mongoose = require('mongoose');
const Employee = require('../employee.model.js');
const expect = require('chai').expect;

describe('Employee', () => {
    it('should throw an error if no "firstName" arg', () => {
      const emp = new Employee({ lastName: 'Doe', department: 'IT' });
      const validationError = emp.validateSync();
      expect(validationError.errors.firstName).to.exist;
    });
  
    it('should throw an error if no "lastName" arg', () => {
      const emp = new Employee({ firstName: 'John', department: 'IT' });
      const validationError = emp.validateSync();
      expect(validationError.errors.lastName).to.exist;
    });
  
    it('should throw an error if no "department" arg', () => {
      const emp = new Employee({ firstName: 'John', lastName: 'Doe' });
      const validationError = emp.validateSync();
      expect(validationError.errors.department).to.exist;
    });
    it('should throw an error if "firstName" is not a string', () => {
        const cases = [{}, []];
        for (let invalidFirstName of cases) {
          const emp = new Employee({ firstName: invalidFirstName, lastName: 'Doe', department: 'IT' });
          const validationError = emp.validateSync();
          expect(validationError.errors.firstName).to.exist;
        }
      });
    
      it('should throw an error if "lastName" is not a string', () => {
        const cases = [{}, []];
        for (let invalidLastName of cases) {
          const emp = new Employee({ firstName: 'John', lastName: invalidLastName, department: 'IT' });
          const validationError = emp.validateSync();
          expect(validationError.errors.lastName).to.exist;
        }
      });

      it('should throw an error if "department" is not a string', () => {
        const cases = [{}, []];
        for (let invalidDepartment of cases) {
          const emp = new Employee({ firstName: 'John', lastName: 'Doe', department: invalidDepartment });
          const validationError = emp.validateSync();
          expect(validationError.errors.department).to.exist;
        }
      });
    
      it('should not throw an error if input is okay', () => {
        const cases = ['John', 'Doe', 'IT'];
        const emp = new Employee({ firstName: cases[0], lastName: cases[1], department: cases[2] });
        const validationError = emp.validateSync();
        expect(validationError).to.not.exist;
      });

    
      after(() => {
        mongoose.models = {};
      });
    });
