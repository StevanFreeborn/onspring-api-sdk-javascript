import { ScoringGroup } from '../src/models/ScoringGroup';
import { expect } from 'chai';

describe('ScoringGroup', function () {
  it('should be defined', function () {
    expect(ScoringGroup).to.not.be.undefined;
  });

  it('should have a constructor', function () {
    expect(ScoringGroup).to.have.property('constructor');
  });

  it('should have a constructor that takes 4 parameters', function () {
    expect(ScoringGroup).to.have.lengthOf(4);
  });

  it('should have a listValueId property', function () {
    expect(
      new ScoringGroup('7c9e6679-7425-40de-944b-e07fc1f90ae7', 'test', 1, 1)
    ).to.have.property('listValueId');
  });

  it('should have a name property', function () {
    expect(
      new ScoringGroup('7c9e6679-7425-40de-944b-e07fc1f90ae7', 'test', 1, 1)
    ).to.have.property('name');
  });

  it('should have a score property', function () {
    expect(
      new ScoringGroup('7c9e6679-7425-40de-944b-e07fc1f90ae7', 'test', 1, 1)
    ).to.have.property('score');
  });

  it('should have a maximumScore property', function () {
    expect(
      new ScoringGroup('7c9e6679-7425-40de-944b-e07fc1f90ae7', 'test', 1, 1)
    ).to.have.property('maximumScore');
  });

  it('should have a constructor that sets its properties correctly', function () {
    const listValueId = '7c9e6679-7425-40de-944b-e07fc1f90ae7';
    const name = 'test';
    const score = 1;
    const maximumScore = 1;

    const scoringGroup = new ScoringGroup(
      listValueId,
      name,
      score,
      maximumScore
    );

    expect(scoringGroup).to.have.property('listValueId', listValueId);
    expect(scoringGroup).to.have.property('name', name);
    expect(scoringGroup).to.have.property('score', score);
    expect(scoringGroup).to.have.property('maximumScore', maximumScore);
  });
});
