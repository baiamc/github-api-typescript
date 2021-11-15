export interface IPullRequest {
  number: number;
  state: string;
  locked: boolean;
  title: string;
}

export interface IRepo {
  name: string;
}
