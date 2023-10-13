export type conferenceTypes = {
  _id: string;
  pageNumber?: number;
  name?: string;
  location?: string;
  topic?: string;
  type: [];
  city?: [string];
  startDate?: string;
  id: number;
  country?: string;
  displaySymbol?: string;
  endDate: string;
  fromTime: string;
  toTime: string;
  ticketPrice: string;
  bookingWebsite: string;
  organizedBy: [string];
  speakers: [string];
  contactPerson: string;
  description?: string;
};

export type similarConferencetypes = {
  totalCount?: number;
  list?: [conferenceTypes] | undefined;
};

export interface responsiveSettings {
  dots: boolean;
  infinite: boolean;
  speed: number;
  slidesToShow: number;
  slidesToScroll: number;
  rows: number;
  responsive: [
    {
      breakpoint: number;
      settings: {
        slidesToShow: number;
        slidesToScroll: number;
        infinite: boolean;
        dots: boolean;
      };
    },
    {
      breakpoint: number;
      settings: {
        slidesToShow: number;
        slidesToScroll: number;
        initialSlide: number;
      };
    },
    {
      breakpoint: number;
      settings: {
        slidesToShow: number;
        slidesToScroll: number;
      };
    },
  ];
}
