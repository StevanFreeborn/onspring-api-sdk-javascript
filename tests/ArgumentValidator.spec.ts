import { ArgumentValidator } from '../src/models/ArgumentValidator';
import { expect } from 'chai';

describe('ArgumentValidator', function () {
  describe('isNullOrWhiteSpace', function () {
    it('should be defined', function () {
      expect(ArgumentValidator.isNullOrWhiteSpace).to.not.be.undefined;
    });

    it('should have 1 parameter of type string', function () {
      expect(ArgumentValidator.isNullOrWhiteSpace).to.have.lengthOf(1);
    });

    it('should return true when the value is null', function () {
      expect(ArgumentValidator.isNullOrWhiteSpace(null)).to.be.true;
    });

    it('should return true when the value is undefined', function () {
      expect(ArgumentValidator.isNullOrWhiteSpace(undefined)).to.be.true;
    });

    it('should return true when the value is an empty string', function () {
      expect(ArgumentValidator.isNullOrWhiteSpace('')).to.be.true;
    });

    it('should return true when the value is a string with only spaces', function () {
      expect(ArgumentValidator.isNullOrWhiteSpace(' ')).to.be.true;
    });

    it('should return true when the value is a string with only tabs', function () {
      expect(ArgumentValidator.isNullOrWhiteSpace('\t')).to.be.true;
    });

    it('should return true when the value is a string with only newlines', function () {
      expect(ArgumentValidator.isNullOrWhiteSpace('\n')).to.be.true;
    });

    it('should return true when the value is a string with only spaces, tabs, and newlines', function () {
      expect(ArgumentValidator.isNullOrWhiteSpace(' \t\n')).to.be.true;
    });

    it('should return false when the value is a string with a character', function () {
      expect(ArgumentValidator.isNullOrWhiteSpace('a')).to.be.false;
    });

    it('should return false when the value is a string with a number', function () {
      expect(ArgumentValidator.isNullOrWhiteSpace('1')).to.be.false;
    });

    it('should return false when the value is a string with a symbol', function () {
      expect(ArgumentValidator.isNullOrWhiteSpace('@')).to.be.false;
    });

    it('should return false when the value is a string with a character and spaces', function () {
      expect(ArgumentValidator.isNullOrWhiteSpace('a ')).to.be.false;
    });

    it('should return false when the value is a string with a number and spaces', function () {
      expect(ArgumentValidator.isNullOrWhiteSpace('1 ')).to.be.false;
    });

    it('should return false when the value is a string with a symbol and spaces', function () {
      expect(ArgumentValidator.isNullOrWhiteSpace('@ ')).to.be.false;
    });

    it('should return false when the value is a string with a character and tabs', function () {
      expect(ArgumentValidator.isNullOrWhiteSpace('a\t')).to.be.false;
    });

    it('should return false when the value is a string with a number and tabs', function () {
      expect(ArgumentValidator.isNullOrWhiteSpace('1\t')).to.be.false;
    });

    it('should return false when the value is a string with a symbol and tabs', function () {
      expect(ArgumentValidator.isNullOrWhiteSpace('@\t')).to.be.false;
    });

    it('should return false when the value is a string with a character and newlines', function () {
      expect(ArgumentValidator.isNullOrWhiteSpace('a\n')).to.be.false;
    });

    it('should return false when the value is a string with a number and newlines', function () {
      expect(ArgumentValidator.isNullOrWhiteSpace('1\n')).to.be.false;
    });

    it('should return false when the value is a string with a symbol and newlines', function () {
      expect(ArgumentValidator.isNullOrWhiteSpace('@\n')).to.be.false;
    });

    it('should return false when the value is a string with a character and spaces, tabs, and newlines', function () {
      expect(ArgumentValidator.isNullOrWhiteSpace('a \t \n')).to.be.false;
    });

    it('should return false when the value is a string with a number and spaces, tabs, and newlines', function () {
      expect(ArgumentValidator.isNullOrWhiteSpace('1 \t \n')).to.be.false;
    });

    it('should return false when the value is a string with a symbol and spaces, tabs, and newlines', function () {
      expect(ArgumentValidator.isNullOrWhiteSpace('@ \t \n')).to.be.false;
    });
  });

  describe('isValidUrl', function () {
    it('should be defined', function () {
      expect(ArgumentValidator.isValidUrl).to.not.be.undefined;
    });

    it('should have 1 parameter of type string', function () {
      expect(ArgumentValidator.isValidUrl).to.have.lengthOf(1);
    });

    it('should return false when the value is null', function () {
      expect(ArgumentValidator.isValidUrl(null)).to.be.false;
    });

    it('should return false when the value is undefined', function () {
      expect(ArgumentValidator.isValidUrl(undefined)).to.be.false;
    });

    it('should return false when the value is an empty string', function () {
      expect(ArgumentValidator.isValidUrl('')).to.be.false;
    });

    it('should return false when the value is a string with only spaces', function () {
      expect(ArgumentValidator.isValidUrl(' ')).to.be.false;
    });

    it('should return false when the value is a string with only tabs', function () {
      expect(ArgumentValidator.isValidUrl('\t')).to.be.false;
    });

    it('should return false when the value is a string with only newlines', function () {
      expect(ArgumentValidator.isValidUrl('\n')).to.be.false;
    });

    it('should return false when the value is a string with only spaces, tabs, and newlines', function () {
      expect(ArgumentValidator.isValidUrl(' \t \n')).to.be.false;
    });

    it('should return false when the value is a string with a character', function () {
      expect(ArgumentValidator.isValidUrl('a')).to.be.false;
    });

    it('should return false when the value is a string with a number', function () {
      expect(ArgumentValidator.isValidUrl('1')).to.be.false;
    });

    it('should return false when the value is a string with a symbol', function () {
      expect(ArgumentValidator.isValidUrl('@')).to.be.false;
    });

    it('should return false when invalid url is passed', function () {
      expect(ArgumentValidator.isValidUrl('www.google.com')).to.be.false;
    });

    it('should return false when invalid url is passed', function () {
      expect(ArgumentValidator.isValidUrl('ht://www.google')).to.be.false;
    });

    it('should return false when url with non http or https protocol is passed', function () {
      expect(ArgumentValidator.isValidUrl('ftp://www.google.com')).to.be.false;
    });

    it('should return true when the value is a string with a valid http url', function () {
      expect(ArgumentValidator.isValidUrl('http://www.google.com')).to.be.true;
    });

    it('should return true when the value is a string with a valid https url', function () {
      expect(ArgumentValidator.isValidUrl('https://www.google.com')).to.be.true;
    });
  });

  describe('isValidPageSize', function () {
    it('should be defined', function () {
      expect(ArgumentValidator.isValidPageSize).to.not.be.undefined;
    });

    it('should have 1 parameter of type number', function () {
      expect(ArgumentValidator.isValidPageSize).to.have.lengthOf(1);
    });

    it('should return false when the value is null', function () {
      expect(ArgumentValidator.isValidPageSize(null)).to.be.false;
    });

    it('should return false when the value is undefined', function () {
      expect(ArgumentValidator.isValidPageSize(undefined)).to.be.false;
    });

    it('should return false when the value is greater than 1000', function () {
      expect(ArgumentValidator.isValidPageSize(1001)).to.be.false;
    });

    it('should return false when the value is less than 1', function () {
      expect(ArgumentValidator.isValidPageSize(0)).to.be.false;
    });

    it('should return true when the value is 1', function () {
      expect(ArgumentValidator.isValidPageSize(1)).to.be.true;
    });

    it('should return true when the value is 1000', function () {
      expect(ArgumentValidator.isValidPageSize(1000)).to.be.true;
    });

    it('should return true when the value is 500', function () {
      expect(ArgumentValidator.isValidPageSize(500)).to.be.true;
    });
  });

  describe('isValidPageNumber', function () {
    it('should be defined', function () {
      expect(ArgumentValidator.isValidPageNumber).to.not.be.undefined;
    });

    it('should have 1 parameter of type number', function () {
      expect(ArgumentValidator.isValidPageNumber).to.have.lengthOf(1);
    });

    it('should return false when the value is null', function () {
      expect(ArgumentValidator.isValidPageNumber(null)).to.be.false;
    });

    it('should return false when the value is undefined', function () {
      expect(ArgumentValidator.isValidPageNumber(undefined)).to.be.false;
    });

    it('should return false when the value is less than 1', function () {
      expect(ArgumentValidator.isValidPageNumber(0)).to.be.false;
    });

    it('should return true when the value is 1', function () {
      expect(ArgumentValidator.isValidPageNumber(1)).to.be.true;
    });
  });
});
