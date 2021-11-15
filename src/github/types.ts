export type PullRequestJson = {
  number: number;
  state: PrState;
  locked: boolean;
  title: string;
  created_at: string;
  updated_at: string;
  closed_at: string;
  merged_at: string;
};

export type RepoJson = {
  name: string;
};

export type PrState = "open" | "closed";
