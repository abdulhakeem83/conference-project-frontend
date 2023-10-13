import styles from "./Contact.module.css";
import { Formik, Form, ErrorMessage, Field } from "formik";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import validate from "utils/validationSchema/ValidationSchema";
import { contactTypes, resetFormValues } from "types/contact";
import { postContactUsDetails } from "service/contactUs/contactUsService";
import { errorHandler, successHandler } from "utils/toaster/toaster";
import { CONSTANTS } from "constants/Constants";
import { useNavigate } from "react-router-dom";
import { CONTACT_DROPDOWN_LIST, CONTACT_FORM_FIELDS } from "./ContactFormData";
const Contact = () => {
  const navigate = useNavigate();
  //Contact form submit functionality
  const handleContactForm = (
    values: contactTypes,
    resetForm: resetFormValues,
  ): void => {
    postContactUsDetails(values)
      .then((res) => {
        res.status === 200 && successHandler(CONSTANTS.CONTACT_MESSAGE);
        navigate("/");
      })
      .catch((e) => {
        errorHandler(e.response.data.message);
      });
    resetForm();
  };
  return (
    <>
      <div className="container pb-5 wrapper">
        <div className="row d-flex justify-content-center">
          <div className="col-lg-8">
            <h1
              className={`text-center  ${styles.headingTag}`}
              data-testid="paragraphData"
            >
              {CONSTANTS.CONTACT_HEADER}
            </h1>
          </div>
        </div>
        <div className="row ">
          {/* contact form */}
          <div className="col-lg-6">
            <div className="form-left h-100  pe-2  ">
              <Formik
                initialValues={CONTACT_FORM_FIELDS}
                validationSchema={validate(CONTACT_FORM_FIELDS)}
                onSubmit={(values, { resetForm }) =>
                  handleContactForm(values, resetForm)
                }
              >
                {({ touched, errors, handleChange }) => (
                  <Form>
                    <div className="col-12">
                      <div className="row">
                        <div className="col-6">
                          <label className="form-label">First Name</label>
                          <div className="input-group input-group-lg">
                            <Field
                              className={`form-control mt-1 input-lg ${
                                touched.firstName && Boolean(errors.firstName)
                                  ? "border-danger"
                                  : ""
                              }`}
                              type="text"
                              name="firstName"
                              data-testid="firstName"
                            />
                          </div>
                          <ErrorMessage
                            className="text-danger"
                            name="firstName"
                            component="div"
                          />
                        </div>
                        <div className="col-6 ">
                          <label className="form-label">Last Name</label>
                          <div className="input-group input-group-lg">
                            <Field
                              className={`form-control input-lg mt-1 ${
                                touched.lastName && Boolean(errors.lastName)
                                  ? "border-danger"
                                  : ""
                              }`}
                              type="text"
                              name="lastName"
                              data-testid="lastName"
                            />
                          </div>
                          <ErrorMessage
                            className="text-danger"
                            name="lastName"
                            component="div"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-12 mt-4">
                      <label className="form-label">Email</label>
                      <div className={`input-group input-group-lg `}>
                        <Field
                          className={` form-control input-lg border-end-0 ${
                            touched.email && Boolean(errors.email)
                              ? "border-danger"
                              : ""
                          }`}
                          type="email"
                          name="email"
                        />
                        <span
                          className={`input-group-text border-start-0 ${
                            touched.email && Boolean(errors.email)
                              ? "border-danger"
                              : ""
                          }`}
                        >
                          <FontAwesomeIcon icon={faEnvelope} />{" "}
                        </span>
                      </div>
                      <ErrorMessage
                        className="text-danger"
                        name="email"
                        component="div"
                      />
                    </div>
                    <div className="col-12 mt-4">
                      <div
                        className={`input-group input-group-lg   ${
                          touched.phoneNumber && Boolean(errors.phoneNumber)
                            ? "border-danger"
                            : ""
                        }`}
                      >
                        <span
                          className={`input-group-text border-right-0 ${
                            touched.phoneNumber && Boolean(errors.phoneNumber)
                              ? "border-danger"
                              : ""
                          }`}
                        >
                          <select
                            id="countryCode"
                            className={`border-right-0 ${
                              touched.phoneNumber && Boolean(errors.phoneNumber)
                                ? "border-danger"
                                : ""
                            }`}
                            onChange={(e) => {
                              handleChange(e);
                            }}
                            name="countryCode"
                          >
                            {CONTACT_DROPDOWN_LIST.map((option) => (
                              <option key={option.value} value={option.value}>
                                {option.label}
                              </option>
                            ))}
                          </select>
                        </span>
                        <span
                          className={`${styles.vl} ${
                            touched.phoneNumber && Boolean(errors.phoneNumber)
                              ? "border-danger"
                              : ""
                          }`}
                        ></span>
                        <Field
                          onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
                            (e.target.value = Math.max(
                              0,
                              parseInt(e.target.value),
                            )
                              .toString()
                              .slice(0, 10))
                          }
                          className={`form-control input-lg border-left-0 ${
                            touched.phoneNumber && Boolean(errors.phoneNumber)
                              ? "border-danger"
                              : ""
                          } `}
                          type="tel"
                          name="phoneNumber"
                          placeholder="0000 000000"
                        />
                        <div></div>
                      </div>
                      <ErrorMessage
                        className="text-danger"
                        name="phoneNumber"
                        component="div"
                      />
                    </div>
                    <div className="col-12 mt-4">
                      <label className="form-label ">Message</label>
                      <div className="input-group input-group-lg">
                        <Field
                          as="textarea"
                          className={`form-control input-lg mt-1  ${
                            touched.message && Boolean(errors.message)
                              ? "border-danger"
                              : ""
                          }`}
                          name="message"
                          rows="4"
                          placeholder="Enter your message"
                        />
                      </div>
                      <ErrorMessage
                        className="text-danger"
                        name="message"
                        component="div"
                      />
                    </div>
                    <div className="col-12 mt-4">
                      <div className="d-grid">
                        <button
                          className={`${styles.btnCustom} ${styles.btnColor} btn`}
                          type="submit"
                        >
                          Submit
                        </button>
                      </div>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
          {/* contact from end */}

          {/* contact form image */}
          <div className={`col-lg-6 ps-5`}>
            <div className={`${styles.backgroundColor}`}></div>
          </div>
          {/* contact form image end  */}
        </div>
      </div>
    </>
  );
};

export default Contact;
