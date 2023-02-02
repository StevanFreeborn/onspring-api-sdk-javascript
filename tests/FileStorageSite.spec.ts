import { FileStorageSite } from '../src/enums/FileStorageSite';
import { expect } from 'chai';

describe('FileStorageSite', function () {
  describe('GoogleDrive', function () {
    it('should return the correct value', function () {
      const result = FileStorageSite.GoogleDrive;
      expect(result).to.equal('GoogleDrive');
    });
  });

  describe('OneDrive', function () {
    it('should return the correct value', function () {
      const result = FileStorageSite.OneDrive;
      expect(result).to.equal('OneDrive');
    });
  });

  describe('Internal', function () {
    it('should return the correct value', function () {
      const result = FileStorageSite.Internal;
      expect(result).to.equal('Internal');
    });
  });
});
