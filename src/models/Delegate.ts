import { type DelegateType } from '../enums/DelegateType';

/**
 * @class Delegate - Represents a delegate.
 */
export class Delegate {
  /**
   * @property {DelegateType} delegateType - The type of delegate.
   */
  public delegateType: DelegateType;

  /**
   * @property {string | null} name - The name of the delegate.
   */
  public name: string | null;

  /**
   * @property {string} emailAddress - The email address of the delegate.
   */
  public emailAddress: string;

  /**
   * @property {Date} delegationDateTime - The date and time the delegate was assigned.
   */
  public delegationDateTime: Date;

  /**
   * @property {Date | null} delegationCompletedDateTime - The date and time the delegate completed the survey.
   */
  public delegationCompletedDateTime: Date | null;

  /**
   * @constructor - Creates a new instance of Delegate.
   * @param {DelegateType} delegateType - The type of delegate.
   * @param {string | null} name - The name of the delegate.
   * @param {string} emailAddress - The email address of the delegate.
   * @param {Date} delegationDateTime - The date and time the delegate was assigned.
   * @param {Date | null} delegationCompletedDateTime - The date and time the delegate completed the survey.
   * @returns {Delegate} - A new instance of Delegate.
   */
  constructor(
    delegateType: DelegateType,
    name: string | null,
    emailAddress: string,
    delegationDateTime: Date,
    delegationCompletedDateTime: Date | null
  ) {
    this.delegateType = delegateType;
    this.name = name;
    this.emailAddress = emailAddress;
    this.delegationDateTime = delegationDateTime;
    this.delegationCompletedDateTime = delegationCompletedDateTime;
  }
}
