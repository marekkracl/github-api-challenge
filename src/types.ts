type APIResult = {
  id: number;
  number: number;
  title: string;
  author: string;
  commit_count?: number;
};

type IGitHubResult = {
  //these are the only fields we care about
  id: number;
  number: number;
  title: string;
  user: { login: string };
};
