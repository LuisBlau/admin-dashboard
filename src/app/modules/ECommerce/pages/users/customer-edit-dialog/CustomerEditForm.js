// Form is based on Formik
// Data validation is based on Yup
// Please, be familiar with article first:
// https://hackernoon.com/react-form-validation-with-formik-and-yup-8b76bda62e10
import React from "react";
import { Modal } from "react-bootstrap";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import {
  Input,
  Select,
  DatePickerField,
} from "../../../../../../_metronic/_partials/controls";


// Validation schema
const CustomerEditSchema = Yup.object().shape({
  name: Yup.string()
    .required("Display Name is required"),
  password: Yup.string()
    // .min(8, "Minimum 8 symbols")
    // .max(50, "Maximum 50 symbols")
    .matches(/^(?=.*[a-zA-Z])(?=.*[0-9])(?=.{8,})/, "Password must contain 8 Characters and at least 1 letter, 1 number")
    .required("Password is required"),
  email: Yup.string()
    .email("Invalid email")
    .required("Email is required"),  
});

export function CustomerEditForm({
  saveCustomer,
  customer,
  actionsLoading,
  onHide,
}) {
  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={{...customer, password: ""}}
        validationSchema={CustomerEditSchema}
        onSubmit={(values) => {
          saveCustomer(values);
        }}
      >
        {({ handleSubmit }) => (          
          <>
            <Modal.Body className="overlay overlay-block cursor-default">
              {actionsLoading && (
                <div className="overlay-layer bg-transparent">
                  <div className="spinner spinner-lg spinner-success" />
                </div>
              )}
              <Form className="form form-label-right" autoComplete="off">
                <div className="form-group row">
                  <div className="col-lg-6">
                    <Field
                      name="name"
                      component={Input}
                      placeholder="Trista Francis"
                      label="Display Name"
                    />

                    <Field
                      name="email"
                      component={Input}
                      placeholder="Enter your email."
                      label="Email"
                    />

                    <Field
                      name="password"
                      component={Input}
                      type="password"
                      placeholder="Enter password."
                      label="Password"
                    />
                
                  </div>
                  <div className="col-lg-6">

                  </div>
                </div>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <button
                type="button"
                onClick={onHide}
                className="btn btn-light btn-elevate"
              >
                Cancel
              </button>
              <> </>
              <button
                type="submit"
                onClick={() => handleSubmit()}
                className="btn btn-primary btn-elevate"
              >
                Save
              </button>
            </Modal.Footer>
          </>
        )}
      </Formik>
    </>
  );
}
