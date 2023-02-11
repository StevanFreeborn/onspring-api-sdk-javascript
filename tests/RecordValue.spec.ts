import { RecordValue } from '../src/models/RecordValue';
import { expect } from 'chai';
import { RecordValueType } from '../src/enums/RecordValueType';
import { Attachment } from '../src/models/Attachment';
import { Delegate } from '../src/models/Delegate';
import { ScoringGroup } from '../src/models/ScoringGroup';
import { TimeSpanData } from '../src/models/TimeSpanData';

describe('RecordValue', function () {
  it('should be defined', function () {
    expect(RecordValue).to.not.be.undefined;
  });

  it('should have a constructor', function () {
    expect(RecordValue).to.have.property('constructor');
  });

  it('should have a constructor that has 3 parameters', function () {
    expect(RecordValue).to.have.lengthOf(3);
  });

  it('should have a constructor that sets its properties correctly', function () {
    const recordValue = new RecordValue(
      RecordValueType.Date,
      2,
      new Date().toUTCString()
    );
    expect(recordValue).to.have.property('type', RecordValueType.Date);
    expect(recordValue).to.have.property('fieldId', 2);
    expect(recordValue).to.have.property('value', new Date().toUTCString());
  });

  it('should have a type property', function () {
    expect(
      new RecordValue(RecordValueType.Date, 2, new Date().toUTCString())
    ).to.have.property('type');
  });

  it('should have a fieldId property', function () {
    expect(
      new RecordValue(RecordValueType.Date, 2, new Date().toUTCString())
    ).to.have.property('fieldId');
  });

  it('should have a value property', function () {
    expect(
      new RecordValue(RecordValueType.Date, 2, new Date().toUTCString())
    ).to.have.property('value');
  });

  describe('asString', function () {
    it('should be defined', function () {
      expect(RecordValue.prototype.asString).to.not.be.undefined;
    });

    it('should be a function', function () {
      expect(RecordValue.prototype.asString).to.be.a('function');
    });

    it('should return the value as a string for valid types', function () {
      const value = 'test';
      const validTypes = [RecordValueType.String, RecordValueType.Guid];

      validTypes.forEach((type) => {
        expect(new RecordValue(type, 2, value).asString())
          .to.equal(value)
          .and.to.be.a('string');
      });
    });

    it('should throw an error if called on record value with incorrect type', function () {
      expect(() =>
        new RecordValue(RecordValueType.Date, 2, 'test').asString()
      ).to.throw();
    });
  });

  describe('asNumber', function () {
    it('should be defined', function () {
      expect(RecordValue.prototype.asNumber).to.not.be.undefined;
    });

    it('should be a function', function () {
      expect(RecordValue.prototype.asNumber).to.be.a('function');
    });

    it('should return the value as a number for valid types', function () {
      const value = 1;
      const validTypes = [RecordValueType.Integer, RecordValueType.Decimal];

      validTypes.forEach((type) => {
        expect(new RecordValue(type, 2, value).asNumber())
          .to.equal(value)
          .and.to.be.a('number');
      });
    });

    it('should throw an error if called on record value with incorrect type', function () {
      expect(() =>
        new RecordValue(RecordValueType.Date, 2, 2).asNumber()
      ).to.throw();
    });
  });

  describe('asDate', function () {
    it('should be defined', function () {
      expect(RecordValue.prototype.asDate).to.not.be.undefined;
    });

    it('should be a function', function () {
      expect(RecordValue.prototype.asDate).to.be.a('function');
    });

    it('should return the value as a date for valid type', function () {
      const value = new Date().toUTCString();
      expect(new RecordValue(RecordValueType.Date, 2, value).asDate())
        .to.deep.equal(new Date(value))
        .and.to.be.a('date');
    });

    it('should throw an error if called on record value with incorrect type', function () {
      expect(() =>
        new RecordValue(RecordValueType.Integer, 2, 'test').asDate()
      ).to.throw();
    });
  });

  describe('asAttachmentArray', function () {
    it('should be defined', function () {
      expect(RecordValue.prototype.asAttachmentArray).to.not.be.undefined;
    });

    it('should be a function', function () {
      expect(RecordValue.prototype.asAttachmentArray).to.be.a('function');
    });

    it('should return the value as an array of attachments for valid type', function () {
      const value = [
        {
          fileId: 1,
          fileName: 'test',
          notes: 'test',
          storageLocation: 'Internal',
        },
        {
          fileId: 1,
          fileName: 'test',
          storageLocation: 'Internal',
        },
        {
          fileId: 1,
          fileName: 'test',
          notes: null,
          storageLocation: 'Internal',
        },
      ];

      const attachmentArray = new RecordValue(
        RecordValueType.AttachmentList,
        2,
        value
      ).asAttachmentArray();

      expect(attachmentArray).to.be.an('array');

      attachmentArray.forEach((attachment) => {
        expect(attachment).to.be.an.instanceOf(Attachment);
        expect(attachment).to.have.property('fileId');
        expect(attachment).to.have.property('fileName');
        expect(attachment).to.have.property('notes');
        expect(attachment).to.have.property('storageLocation');
      });
    });

    it('should throw an error if attachment has incorrect storage location', function () {
      const value = [
        {
          fileId: 1,
          fileName: 'test',
          notes: 'test',
          storageLocation: 'Invalid',
        },
      ];

      expect(() =>
        new RecordValue(
          RecordValueType.AttachmentList,
          2,
          value
        ).asAttachmentArray()
      ).to.throw();
    });

    it('should throw an error if called on record value with incorrect type', function () {
      expect(() =>
        new RecordValue(RecordValueType.Integer, 2, []).asAttachmentArray()
      ).to.throw();
    });
  });

  describe('asNumberArray', function () {
    it('should be defined', function () {
      expect(RecordValue.prototype.asNumberArray).to.not.be.undefined;
    });

    it('should be a function', function () {
      expect(RecordValue.prototype.asNumberArray).to.be.a('function');
    });

    it('should return the value as an array of numbers for valid types', function () {
      const value = [1, 2, 3];
      const validTypes = [
        RecordValueType.FileList,
        RecordValueType.IntegerList,
      ];

      validTypes.forEach((type) => {
        const recordValue = new RecordValue(type, 2, value).asNumberArray();
        expect(recordValue).to.deep.equal(value).and.to.be.an('array');

        recordValue.forEach((item) => {
          expect(item).to.be.a('number');
        });
      });
    });

    it('should throw an error if called on record value with incorrect type', function () {
      expect(() =>
        new RecordValue(RecordValueType.Integer, 2, []).asNumberArray()
      ).to.throw();
    });
  });

  describe('asStringArray', function () {
    it('should be defined', function () {
      expect(RecordValue.prototype.asStringArray).to.not.be.undefined;
    });

    it('should be a function', function () {
      expect(RecordValue.prototype.asStringArray).to.be.a('function');
    });

    it('should return the value as an array of strings for valid types', function () {
      const value = ['test', 'test', 'test'];
      const validTypes = [RecordValueType.StringList, RecordValueType.GuidList];

      validTypes.forEach((type) => {
        const recordValue = new RecordValue(type, 2, value).asStringArray();
        expect(recordValue).to.deep.equal(value).and.to.be.an('array');

        recordValue.forEach((item) => {
          expect(item).to.be.a('string');
        });
      });
    });

    it('should throw an error if called on record value with incorrect type', function () {
      expect(() =>
        new RecordValue(RecordValueType.Integer, 2, []).asStringArray()
      ).to.throw();
    });
  });

  describe('asDelegateArray', function () {
    it('should be defined', function () {
      expect(RecordValue.prototype.asDelegateArray).to.not.be.undefined;
    });

    it('should be a function', function () {
      expect(RecordValue.prototype.asDelegateArray).to.be.a('function');
    });

    it('should return the value as an array of delegates for valid type', function () {
      const value = [
        {
          delegateType: 'External',
          name: 'test',
          emailAddress: 'test@test.com',
          delegationDateTime: '2019-01-01T00:00:00.000Z',
          delegationCompletedDateTime: '2019-01-01T00:00:00.000Z',
        },
        {
          delegateType: 'External',
          name: null,
          emailAddress: 'test@test.com',
          delegationDateTime: '2019-01-01T00:00:00.000Z',
          delegationCompletedDateTime: null,
        },
        {
          delegateType: 'External',
          emailAddress: 'test@test.com',
          delegationDateTime: '2019-01-01T00:00:00.000Z',
        },
      ];

      const recordValue = new RecordValue(
        RecordValueType.ScoringGroupList,
        2,
        value
      ).asDelegateArray();

      expect(recordValue).to.be.an('array');
      recordValue.forEach((item) => {
        expect(item).to.be.an.instanceOf(Delegate);
        expect(item).to.have.property('delegateType');
        expect(item).to.have.property('name');
        expect(item).to.have.property('emailAddress');
        expect(item).to.have.property('delegationDateTime');
        expect(item).to.have.property('delegationCompletedDateTime');
      });
    });

    it('should throw an error if called on record value with incorrect type', function () {
      expect(() =>
        new RecordValue(RecordValueType.Integer, 2, []).asDelegateArray()
      ).to.throw();
    });

    it('should throw an error if delegate has incorrect delegate type', function () {
      const value = [
        {
          delegateType: 'Invalid',
          name: 'test',
          emailAddress: 'test@test.com',
          delegationDateTime: '2019-01-01T00:00:00.000Z',
          delegationCompletedDateTime: '2019-01-01T00:00:00.000Z',
        },
      ];

      expect(() =>
        new RecordValue(
          RecordValueType.ScoringGroupList,
          2,
          value
        ).asDelegateArray()
      ).to.throw();
    });
  });

  describe('asScoringGroupArray', function () {
    it('should be defined', function () {
      expect(RecordValue.prototype.asScoringGroupArray).to.not.be.undefined;
    });

    it('should be a function', function () {
      expect(RecordValue.prototype.asScoringGroupArray).to.be.a('function');
    });

    it('should return the value as an array of scoring groups for valid type', function () {
      const value = [
        {
          listValueId: 'test',
          name: 'test',
          score: 1,
          maximumScore: 1,
        },
      ];

      const recordValue = new RecordValue(
        RecordValueType.ScoringGroupList,
        2,
        value
      ).asScoringGroupArray();

      expect(recordValue).to.deep.equal(value).and.to.be.an('array');

      recordValue.forEach((item) => {
        expect(item).to.be.an.instanceOf(ScoringGroup);
        expect(item).to.have.property('listValueId');
        expect(item).to.have.property('name');
        expect(item).to.have.property('score');
        expect(item).to.have.property('maximumScore');
      });
    });

    it('should throw an error if called on record value with incorrect type', function () {
      expect(() =>
        new RecordValue(RecordValueType.Integer, 2, []).asScoringGroupArray()
      ).to.throw();
    });
  });

  describe('asTimeSpanData', function () {
    it('should be defined', function () {
      expect(RecordValue.prototype.asTimeSpanData).to.not.be.undefined;
    });

    it('should be a function', function () {
      expect(RecordValue.prototype.asTimeSpanData).to.be.a('function');
    });

    it('should return the value as a TimeSpanData for valid type', function () {
      const cases = [
        {
          quantity: 1,
          increment: 'Days',
          recurrence: 'None',
          endAfterOccurrences: 1,
          endByDate: '2019-01-01T00:00:00.000Z',
        },
        {
          quantity: 1,
          increment: 'Days',
          recurrence: null,
          endAfterOccurrences: null,
          endByDate: null,
        },
        {
          quantity: 1,
          increment: 'Days',
        },
      ];

      cases.forEach((value) => {
        const recordValue = new RecordValue(
          RecordValueType.TimeSpan,
          2,
          value
        ).asTimeSpanData();

        expect(recordValue).to.be.an.instanceOf(TimeSpanData);
        expect(recordValue).to.have.property('quantity');
        expect(recordValue).to.have.property('increment');
        expect(recordValue).to.have.property('recurrence');
        expect(recordValue).to.have.property('endAfterOccurrences');
        expect(recordValue).to.have.property('endByDate');
      });
    });

    it('should throw an error if called on record value with incorrect type', function () {
      expect(() =>
        new RecordValue(RecordValueType.Integer, 2, []).asTimeSpanData()
      ).to.throw();
    });

    it('should throw an error if timespan has incorrect increment', function () {
      const value = {
        quantity: 1,
        increment: 'Invalid',
        recurrence: 'None',
        endAfterOccurrences: 1,
        endByDate: '2019-01-01T00:00:00.000Z',
      };

      expect(() =>
        new RecordValue(RecordValueType.TimeSpan, 2, value).asTimeSpanData()
      ).to.throw();
    });

    it('should throw an error if timespan has incorrect recurrence', function () {
      const value = {
        quantity: 1,
        increment: 'Days',
        recurrence: 'Invalid',
        endAfterOccurrences: 1,
        endByDate: '2019-01-01T00:00:00.000Z',
      };

      expect(() =>
        new RecordValue(RecordValueType.TimeSpan, 2, value).asTimeSpanData()
      ).to.throw();
    });
  });
});
