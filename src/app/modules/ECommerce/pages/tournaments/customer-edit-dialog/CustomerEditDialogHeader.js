import React, { useState, useEffect } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { Modal } from "react-bootstrap";
import {ModalProgressBar} from "../../../../../../_metronic/_partials/controls";

export function CustomerEditDialogHeader({ id }) {
  // Customers Redux state
  const { customerForEdit, actionsLoading } = useSelector(
    (state) => ({
      customerForEdit: state.rounds.customerForEdit,
      actionsLoading: state.rounds.actionsLoading,
    }),
    shallowEqual
  );

  const [title, setTitle] = useState("");
  // Title couting
  useEffect(() => {    
    let _title = id ? "" : "New Tournament";
    if (customerForEdit && id) {
      _title = `Edit tournament '${customerForEdit.roundId}'`;
    }

    setTitle(_title);
    // eslint-disable-next-line
  }, [customerForEdit, actionsLoading]);

  return (
    <>
      {actionsLoading && <ModalProgressBar />}
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">{title}</Modal.Title>
      </Modal.Header>
    </>
  );
}
