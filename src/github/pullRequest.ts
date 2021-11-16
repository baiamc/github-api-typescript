import { PrState, PullRequestJson } from "./types";

/**
 * PullRequest
 *
 * Class to manage pull request data retrieved from Github.
 * Parses data as needed from original JSON and ensures
 * that modifications to the data aren't made later.
 */
export default class PullRequest {
  /**
   * Accepts JSON data to build class
   */
  constructor(data: PullRequestJson) {
    this.number = data.number;
    this.state = data.state;
    this.locked = data.locked;
    this.title = data.title;
    if (data.created_at) {
      this.createdAt = new Date(data.created_at);
    }
    if (data.updated_at) {
      this.updatedAt = new Date(data.updated_at);
    }
    if (data.merged_at) {
      this.mergedAt = new Date(data.merged_at);
    }
    if (data.closed_at) {
      this.closedAt = new Date(data.closed_at);
    }
  }

  private _number: number;
  public get number(): number {
    return this._number;
  }
  private set number(v: number) {
    this._number = v;
  }

  private _state: PrState;
  public get state(): PrState {
    return this._state;
  }
  private set state(v: PrState) {
    this._state = v;
  }

  private _locked: boolean;
  public get locked(): boolean {
    return this._locked;
  }
  private set locked(v: boolean) {
    this._locked = v;
  }

  private _title: string;
  public get title(): string {
    return this._title;
  }
  private set title(v: string) {
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
