// Types of all the global components should be mentioned here
export type formFields = {
  firstName?: StringSchema<string>;
  lastName?: StringSchema<string>;
  email?: StringSchema<string>;
  phoneNumber?: StringSchema<string>;
  message?: StringSchema<string>;
};
export type geoLocationAddress = {
  country?: string;
  state?: string;
  city?: string;
  postalCode?: string;
};
export type conferenceDataTypes = {
  pageNumber?: number;
  name?: string;
  location?: string;
  topic?: string;
  type?: [string];
  city?: [string];
  startDate?: string;
  _id?: string;
};
export type CardPropType = {
  data?: [conferenceDataTypes];
  handlePreviousPage?: function;
  handleNextPage?: function;
  pageNumber?: number;
  totalRecords?: number;
  from?: string;
  currentLocation?: string;
  lazyLoading?: boolean;
  setLazyLoading?: (value: boolean) => void;
  limit?: number;
};

export type filterTypes = {
  conferenceType?: [];
  conferenceSearchParam: string;
  conferenceDate: [];
  conferenceEntryFee: [];
  conferenceCities: [];
  conferenceRandomDate: string;
};
