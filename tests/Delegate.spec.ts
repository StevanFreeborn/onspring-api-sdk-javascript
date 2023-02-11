import { Delegate } from '../src/models/Delegate';
import { expect } from 'chai';
import { DelegateType } from '../src/enums/DelegateType';

describe('Delegate', function () {
  it('should be defined', function () {
    expect(Delegate).to.not.be.undefined;
  });

  it('should have a constructor', function () {
    expect(Delegate).to.have.property('constructor');
  });

  it('should have a constructor that takes 5 parameters', function () {
    expect(Delegate).to.have.lengthOf(5);
  });

  it('should have a delegateType property', function () {
    expect(
      new Delegate(
        DelegateType.External,
        'John Doe',
        'john.doe@email.com',
        new Date(),
        new Date()
      )
    ).to.have.property('delegateType');
  });

  it('should have a name property', function () {
    expect(
      new Delegate(
        DelegateType.External,
        'John Doe',
        'john.doe@email.com',
        new Date(),
        new Date()
      )
    ).to.have.property('name');
  });

  it('should have a emailAddress property', function () {
    expect(
      new Delegate(
        DelegateType.External,
        'John Doe',
        'john.doe@email.com',
        new Date(),
        new Date()
      )
    ).to.have.property('emailAddress');
  });

  it('should have a delegationDateTime property', function () {
    expect(
      new Delegate(
        DelegateType.External,
        'John Doe',
        'john.doe@email.com',
        new Date(),
        new Date()
      )
    ).to.have.property('delegationDateTime');
  });

  it('should have a delegationCompletedDateTime property', function () {
    expect(
      new Delegate(
        DelegateType.External,
        'John Doe',
        'john.doe@email.com',
        new Date(),
        new Date()
      )
    ).to.have.property('delegationCompletedDateTime');
  });

  it('should have a constructor that sets its properties correctly', function () {
    const delegateType = DelegateType.External;
    const name = 'John Doe';
    const emailAddress = 'john.doe@email.com';
    const delegationDateTime = new Date();
    const delegationCompletedDateTime = new Date();

    const delegate = new Delegate(
      delegateType,
      name,
      emailAddress,
      delegationDateTime,
      delegationCompletedDateTime
    );

    expect(delegate).to.have.property('delegateType', delegateType);
    expect(delegate).to.have.property('name', name);
    expect(delegate).to.have.property('emailAddress', emailAddress);
    expect(delegate).to.have.property('delegationDateTime', delegationDateTime);
    expect(delegate).to.have.property(
      'delegationCompletedDateTime',
      delegationCompletedDateTime
    );
  });
});
