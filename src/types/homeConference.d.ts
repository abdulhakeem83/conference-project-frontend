export type conferenceTypes = {
  pageNumber?: number;
  name?: string;
  location?: string;
  topic?: string;
  type?: [string];
  city?: [string];
  startDate?: string;
  _id: string;
};

export type conferenceListCountTypes = {
  totalCount?: number;
  list?: [conferenceTypes] | undefined;
};

export type topicTypes = {
  type?: [string];
};
export type filterTypes = {
  conferenceType?: [];
  conferenceSearchParam: string;
  conferenceDate: [];
  conferenceEntryFee: [];
  conferenceCities: [];
  conferenceRandomDate: string;
};

export interface homePageLoaders {
  nearByConferences: boolean;
  conferenceList: boolean;
  trendingTopics: boolean;
}

export interface conferenceListType {
  pageNumber?: number;
  name?: string;
  location?: string;
  topic?: string;
  type?: [string];
  city?: [string];
  startDate?: string;
  _id?: string;
}

export interface homeFilters {
  conferenceType: Array;
  conferenceSearchParam: string;
  conferenceDate: Array;
  conferenceEntryFee: Array;
  conferenceCities: Array;
  conferenceRandomDate: string;
}

export interface loaderState {
  nearByConferences: boolean;
  conferenceList: boolean;
}
