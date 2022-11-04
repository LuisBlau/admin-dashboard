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
  Checkbox,
  DatePickerField,
} from "../../../../../../_metronic/_partials/controls";


// Validation schema
const CustomerEditSchema = Yup.object().shape({
  roundId: Yup.number()
    .required()
    .positive()
    .integer(),
  startTime: Yup.number()
    .required()
    .positive()
    .integer(),
  entryPeriod: Yup.string().required(),
    // .required("Email is required"),
  minPlayers: Yup.number()
    .required()
    .positive()
    .integer(),
  maxPlayers: Yup.number()
    .required()
    .positive()
    .integer(),
  playPeriod: Yup.string().required(),
  finalPeriod: Yup.string().required(),
  entryAmount: Yup.number().required().integer(),
  adminFeeRate: Yup.number().required(),
  roundFeeRate: Yup.number().required(),
  distributed: Yup.bool().required(),
  locked: Yup.bool().required(),
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
        initialValues={customer}
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
              <Form className="form form-label-right">
                <div className="form-group row">
                  <div className="col-lg-6">
                    {/* {!customer.roundId && 
                      (<Field
                        name="roundId"
                        component={Input}
                        placeholder="Enter Round Id"
                        label="Round ID"
                      />)} */}
                    <Field
                      name="roundId"
                      component={Input}
                      placeholder="Enter Round Id"
                      label="Round ID"
                    />
                    <Field
                      name="startTime"
                      component={Input}
                      placeholder="Enter Start time"
                      label="Start time"
                    />
                    <Field
                      name="entryPeriod"
                      component={Input}
                      placeholder="Enter Entry Period"
                      label="Entry Period"
                    />
                    <Field
                      name="playPeriod"
                      component={Input}
                      placeholder="Enter Play Period"
                      label="Play Period"
                    />
                    <Field
                      name="finalPeriod"
                      component={Input}
                      placeholder="Enter Final Period"
                      label="Final Period"
                    />
                    <Field
                      name="minPlayers"
                      component={Input}
                      placeholder="Enter Min Players."
                      label="Min Players"
                    />
                    </div>
                    <div className="col-lg-6">
                    <Field
                      name="maxPlayers"
                      component={Input}
                      placeholder="Enter Max Players."
                      label="Max Players"
                    />
                    <Field
                      name="entryAmount"
                      component={Input}
                      placeholder="Enter Entry Amounts."
                      label="Entry Amounts"
                    />
                    <Field
                      name="adminFeeRate"
                      component={Input}
                      placeholder="Enter Admin Fee Rate."
                      label="Admin Fee Rate"
                    />
                    <Field
                      name="roundFeeRate"
                      component={Input}
                      placeholder="Enter Round Fee Rate."
                      label="Round Fee Rate"
                    />
                    <Field
                      name="distributed"
                      component={Input}
                      type="text"
                      label="Distributed"
                    />
                    <Field
                      name="locked"
                      component={Input}
                      type="text"
                      label="Locked"
                    />
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
