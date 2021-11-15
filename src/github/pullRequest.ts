import { PrState, PullRequestJson } from "./types";

export default class PullRequest {
  /**
   * Accepts JSON data to build class
   */
  constructor(data: PullRequestJson) {
    this.number = data.number;
    this.state = data.state;
    this.locked = data.locked;
    this.title = data.title;
    this.createdAt = new Date(data.created_at);
    this.updatedAt = new Date(data.updated_at);
    this.mergedAt = new Date(data.merged_at);
    this.closedAt = new Date(data.closed_at);
  }

  private _number: number;
  public get number() {
    return this._number;
  }
  private set number(v) {
    this._number = v;
  }

  private _state: PrState;
  public get state() {
    return this._state;
  }
  private set state(v) {
    this._state = v;
  }

  private _locked: boolean;
  public get locked() {
    return this._locked;
  }
  private set locked(v) {
    this._locked = v;
  }

  private _title: string;
  public get title() {
    return this._title;
  }
  private set title(v) {
    this._title = v;
  }

  private _createdAt: Date;
  public get createdAt(): Date {
    return this._createdAt;
  }
  private set createdAt(v: Date) {
    this._createdAt = v;
  }

  private _updatedAt: Date;
  public get updatedAt(): Date {
    return this._updatedAt;
  }
  private set updatedAt(v: Date) {
    this._updatedAt = v;
  }

  private _closedAt: Date;
  public get closedAt(): Date {
    return this._closedAt;
  }
  private set closedAt(v: Date) {
    this._closedAt = v;
  }

  private _mergedAt: Date;
  public get mergedAt(): Date {
    return this._mergedAt;
  }
  private set mergedAt(v: Date) {
    this._mergedAt = v;
  }
}
