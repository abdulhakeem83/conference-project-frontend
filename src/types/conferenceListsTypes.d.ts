export type conferenceTypes = {
  type: string;
};

export type conferenceLists = {
  list: {
    _id: string;
    name: string;
    type: string[];
    location: string;
    city: string[];
    country: string;
    startDate: string;
    endDate: string;
    ticketPrice: number;
    fromTime: string;
    toTime: string;
    description: string;
  }[];
  count: number;
};

export interface conferenceEntryFeeType {
  name: string;
  value: number;
}

export interface listFiltersTypes {
  conferenceType: string[];
  conferenceSearchParam: string;
  conferenceDate: { name: string; value: string }[];
  conferenceEntryFee: {
    displayName: string;
    minimumPrice: number;
    maximumPrice: number;
  }[];
  conferenceCities: { name: string }[];
  conferenceRandomDate: string;
}

export interface modalFilterTypes {
  conferenceDate: { name: string; value: string }[];
  conferenceCities: { name: string }[];
  conferenceRandomDate: string;
  conferenceEntryFee: {
    displayName: string;
    minimumPrice: number;
    maximumPrice: number;
  }[];
}

export interface conferenceListResponseType {
  totalCount: number;
  list: [
    {
      bookingWebsite: string;
      city: string[];
      contactPerson: string;
      country: string;
      description: string;
      displaySymbol: string;
      endDate: string;
      enquireyEmail: string;
      enquiryNumber: string;
      fromTime: string;
      location: string;
      name: string;
      organizedBy: string;
      startDate: string;
      ticketPrice: number;
      toTime: string;
      type: string[];
      _id: string;
    },
  ];
}

export interface ApiResponse {
  data: conferenceListResponseType;
}

export interface errorResponse {
  response: {
    data: {
      message: string;
    };
  };
}

export interface conferenceLoaders {
  conferenceLists: boolean;
  conferenceDates: boolean;
  conferencePrices: boolean;
  conferenceTopics: boolean;
  conferenceLocations: boolean;
}
