export interface ChangeLogPageDataType {
  title: string;
  notices: string;
  changelogs: ChangelogTypes[];
}

export interface ChangelogTypes {
  title: string;
  version: string;
  release: string;
  tags: string[];
  content: string;
}
