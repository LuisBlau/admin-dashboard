// Form is based on Formik
// Data validation is based on Yup
// Please, be familiar with article first:
// https://hackernoon.com/react-form-validation-with-formik-and-yup-8b76bda62e10
import React from "react";
import { format } from 'date-fns';
import { Modal } from "react-bootstrap";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import {
  Input,
  Select,
  Checkbox,
  DatePickerField,
  FieldFeedbackLabel
} from "../../../../../../_metronic/_partials/controls";

const UNITS = ['seconds', 'minutes', 'hours'];

const getFieldCSSClasses = (touched, errors) => {
  const classes = ["form-control"];
  if (touched && errors) {
    classes.push("is-invalid");
  }

  if (touched && !errors) {
    classes.push("is-valid");
  }

  return classes.join(" ");
};

// Validation schema
const CustomerEditSchema = Yup.object().shape({
  roundId: Yup.number()
    .required()
    .positive()
    .integer(),
  startTimeFormat: Yup.string()
    .required(),
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
  roundFeeRate: Yup.number().required()
});

export function CustomerEditForm({
  saveCustomer,
  customer,
  actionsLoading,
  onHide,
}) {
  const [distributed, setDistributed] = React.useState(false);
  const [locked, setLocked] = React.useState(false);
  // const [entryPeriod, setEntryPeriod] = React.useState(0);
  const [entryPeriodUnit, setEntryPeriodUnit] = React.useState(UNITS[0]);
  const [playPeriodUnit, setPlayPeriodUnit] = React.useState(UNITS[0]);
  const [finalPeriodUnit, setFinalPeriodUnit] = React.useState(UNITS[0]);
  React.useEffect(()=>{
    setDistributed(customer.distributed);
    setLocked(customer.locked);
    // setEntryPeriod(customer.entryPeriod);
  }, [customer]);

  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={{
          ...customer,
          startTimeFormat: format(Number(customer.startTime) * 1000,
          'yyyy-MM-dd HH:mm:ss'),
          entryPeriodUnit: UNITS[0],
          playPeriodUnit: UNITS[0],
          finalPeriodUnit: UNITS[0]
        }}
        validationSchema={CustomerEditSchema}
        onSubmit={(values) => {
          values.startTime = new Date(values.startTimeFormat).getTime() / 1000;
          values.locked = locked;
          values.distributed = distributed;
          values.entryPeriodUnit = entryPeriodUnit;
          values.playPeriodUnit = playPeriodUnit;
          values.finalPeriodUnit = finalPeriodUnit;
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
                      name="startTimeFormat"
                      component={Input}
                      type="datetime-local"
                      placeholder="Enter Start time"
                      label="Start time"
                    />
                    <Field
                      name="entryPeriod"
                    >
                      {({
                        field, // { name, value, onChange, onBlur }
                        form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                        meta,
                        customFeedbackLabel
                      }) => (
                        <>
                          <label style={{display: "block"}}>Enter Entry Period</label>
                          <input
                            className={getFieldCSSClasses(touched[field.name], errors[field.name])}
                            placeholder="Enter Entry Period"
                            {...field}
                            // {...props}
                            style={{display: "inline", width: "70%"}}
                          />
                          <select
                            name="entryPeriodUnit"
                            value={entryPeriodUnit}
                            onChange={(event) => {setEntryPeriodUnit(event.target.value)}}
                            className="form-control"
                            style={{display: "inline", width: "30%"}}
                          >
                            {UNITS.map((unit, index) => (
                              <option key={index} value={unit}>{unit}</option>
                            ))}
                          </select>
                          <FieldFeedbackLabel
                            error={errors[field.name]}
                            touched={touched[field.name]}
                            label="Entry Period"
                            customFeedbackLabel={customFeedbackLabel}
                          />
                        </>
                      )}
                    </Field>
                    <Field
                      name="playPeriod"
                    >
                      {({
                        field, // { name, value, onChange, onBlur }
                        form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                        meta,
                        customFeedbackLabel
                      }) => (
                        <>
                          <label style={{display: "block"}}>Enter Play Period</label>
                          <input
                            className={getFieldCSSClasses(touched[field.name], errors[field.name])}
                            placeholder="Enter Play Period"
                            {...field}
                            // {...props}
                            style={{display: "inline", width: "70%"}}
                          />
                          <select
                            name="playPeriodUnit"
                            value={playPeriodUnit}
                            onChange={(event) => {setPlayPeriodUnit(event.target.value)}}
                            className="form-control"
                            style={{display: "inline", width: "30%"}}
                          >
                            {UNITS.map((unit, index) => (
                              <option key={index} value={unit}>{unit}</option>
                            ))}
                          </select>
                          <FieldFeedbackLabel
                            error={errors[field.name]}
                            touched={touched[field.name]}
                            label="Play Period"
                            customFeedbackLabel={customFeedbackLabel}
                          />
                        </>
                      )}
                    </Field>
                    <Field
                      name="finalPeriod"
                    >
                      {({
                        field, // { name, value, onChange, onBlur }
                        form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                        meta,
                        customFeedbackLabel
                      }) => (
                        <>
                          <label style={{display: "block"}}>Enter Final Period</label>
                          <input
                            className={getFieldCSSClasses(touched[field.name], errors[field.name])}
                            placeholder="Enter Final Period"
                            {...field}
                            // {...props}
                            style={{display: "inline", width: "70%"}}
                          />
                          <select
                            name="finalPeriodUnit"
                            value={finalPeriodUnit}
                            onChange={(event) => {setFinalPeriodUnit(event.target.value)}}
                            className="form-control"
                            style={{display: "inline", width: "30%"}}
                          >
                            {UNITS.map((unit, index) => (
                              <option key={index} value={unit}>{unit}</option>
                            ))}
                          </select>
                          <FieldFeedbackLabel
                            error={errors[field.name]}
                            touched={touched[field.name]}
                            label="Final Period"
                            customFeedbackLabel={customFeedbackLabel}
                          />
                        </>
                      )}
                    </Field>
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
                    >
                      {({
                        field, // { name, value, onChange, onBlur }
                        form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                        meta,
                      }) => (
                        <div>
                          <span>
                            Distributed
                          </span>
                          <label className="toggle">
                            <input type="checkbox" name={field.name} checked={distributed}
                              onChange={(evt) => {
                                setDistributed(evt.target.checked);
                              }}
                            />
                            <span className="toggle-slider round"></span>
                          </label>
                        </div>
                      )}
                    </Field>
                    <Field
                      name="locked"
                    >
                      {({
                        field, // { name, value, onChange, onBlur }
                        form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                        meta,
                      }) => (
                        <div>
                          <span>
                            Locked
                          </span>
                          <label className="toggle">
                            <input type="checkbox" name={field.name} checked={locked}
                              onChange={(evt) => {
                                setLocked(evt.target.checked);
                              }}
                            />
                            <span className="toggle-slider round"></span>
                          </label>
                        </div>
                      )}
                    </Field>
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
