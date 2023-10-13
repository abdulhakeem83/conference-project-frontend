import * as Yup from "yup";
import { AnyObject } from "yup";
import { formFields } from "types/index";
import { CONSTANTS } from "../../constants/Constants";

const fields: formFields = {
  firstName: Yup.string()
    .matches(CONSTANTS.FIRST_PATTERN, CONSTANTS.FIRST_NAME_PATTERN_NOT_MATCH)
    .min(3, CONSTANTS.FIRST_NAME_MIN_LENGTH)
    .max(50, CONSTANTS.FIRST_NAME_MAX_LENGTH)
    .required(CONSTANTS.FIRST_NAME_REQ),
  lastName: Yup.string()
    .matches(CONSTANTS.LAST_PATTERN, CONSTANTS.LAST_NAME_PATTERN_NOT_MATCH)
    .max(50, CONSTANTS.LAST_NAME_MAX_LENGTH)
    .required(CONSTANTS.LAST_NAME_REQUIRED),

  email: Yup.string()
    .matches(CONSTANTS.EMAIL_PATTERN, CONSTANTS.EMAIL_PATTERN_NOT_MATCH)
    .required(CONSTANTS.EMAIL_REQUIRED)
    .email(CONSTANTS.EMAIL_PATTERN_NOT_MATCH),
  phoneNumber: Yup.string()
    .required(CONSTANTS.PHONE_NUMBER_REQUIRED)
    .min(10, CONSTANTS.PHONE_NUMBER_MSG)
    .max(10, CONSTANTS.PHONE_NUMBER_MSG),
  message: Yup.string().required(CONSTANTS.MESSAGE_REQUIRED),
};

const validate = (fieldsObj: AnyObject) => {
  const validationObj: formFields = {};
  Object.keys(fieldsObj).forEach((item: string) => {
    validationObj[item as keyof formFields] = fields[item as keyof formFields];
  });
  return Yup.object().shape(validationObj);
};

export default validate;
