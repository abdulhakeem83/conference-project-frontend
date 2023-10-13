export const CONSTANTS = {
  // First Name
  FIRST_PATTERN: /^[a-zA-Z\s]+$/,
  FIRST_NAME_PATTERN_NOT_MATCH: "Invalid First Name",
  FIRST_NAME_MIN_LENGTH: "Minimum 3 characters required!",
  FIRST_NAME_MAX_LENGTH: "Maximum allowed characters is 50",
  FIRST_NAME_REQ: "First name is required",

  // Last Name
  LAST_PATTERN: /^[a-zA-Z\s]+$/,
  LAST_NAME_PATTERN_NOT_MATCH: "Invalid Last Name",
  LAST_NAME_MAX_LENGTH: "Maximum allowed characters is 50",
  LAST_NAME_REQUIRED: "Last name is required",
  MESSAGE_REQUIRED: "Message is required",
  // Email
  EMAIL_PATTERN_NOT_MATCH: "Please provide valid email",
  EMAIL_REQUIRED: "Email is required",
  EMAIL_MAX_LEN: "Email ID must be atmost 100 characters",
  EMAIL_PATTERN:
    /^(?=.*[a-zA-Z])[a-zA-Z0-9._%+-]*[a-zA-Z][a-zA-Z0-9._%+-]*@[a-zA-Z0-9-]+(\.[a-zA-Z]{2,3})(\.[a-zA-Z]{2})?$/,

  // Phone Number
  PHONE_NUMBER_PATTERN: /[`~!@#$%^&*()_|+\-=÷¿?;:'",.<>{}[\]\\/]/gi,
  PHONE_NUMBER_PATTERN_NOT_MATCH: "Phone number is not valid",
  PHONE_NUMBER_REQUIRED: "Phone number is required",
  PHONE_NUMBER_MSG: "Phone number must be 10 digits",

  // Contact
  CONTACT_HEADER: " Get in touch with us and let's start a coversation",
  CONTACT_MESSAGE:
    "Thank you for getting in touch. We appreciate your interest. We will be in contact with you shortly.",

  // Home Component
  HOME_HEADER: "Explore a world of networking and innovation",
  HOME_PARAGRAPH: "with our curated collection of upcoming conferences.",
  HOME_BROWSING:
    "Stay updated by browsing through our extensive list of conferences",
  HOME_VARIOUS:
    "Whether you are a professional, researcher, or simply someone passionate about a particular field, our website is designed to connect you with conferences across various industries and domains.",
  HOME_TRENDING: "Trending topics",
  HOME_CONFERENCES: "Conferences nearby",

  //links
  LINKS_DATA: [
    { name: "Home", link: "/" },
    { name: "Conferences", link: "/Conferences" },
    { name: "About", link: "/about" },
    { name: "Contact", link: "/contact" },
  ],

  // Footer component
  RGT_WEBSITE_LINK: "https://www.ratnaglobaltech.com/",
  Linked_IN_URL: "https://www.linkedin.com/company/ratnaglobaltech/mycompany/",
  YOUTUBE_URL: "https://www.youtube.com/@ratnaglobaltech1255",
  INSTAGRAM_URL: "https://www.instagram.com/ratnaglobaltech/",
  COPY_RIGHTS:
    "Copyright 2023 Ratna Global Technologies Pvt. Ltd. All rights reserved",

  // swiper settings
  settings: {
    dots: false,
    infinite: false,
    speed: 2000,
    slidesToShow: 3,
    slidesToScroll: 3,
    rows: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  },
};
