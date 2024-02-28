export interface LinkItemType {
  label: string;
  href: string;
}

export interface CardItemType {
  cardTitle: string;
  cardAllHref?: string;
  cardLinks: LinkItemType[];
}

export interface HotTopicType {
  questions: LinkItemType[];
  topicCards: CardItemType[];
}

export type GroupTopicType = {
  groupTit: string;
  groupCards: CardItemType[];
}[];

export type HomePageDataType = { hotTopics: HotTopicType; topicGroup: GroupTopicType };
