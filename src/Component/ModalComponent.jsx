import { Modal, ModalHeader, ModalBody, ModalFooter, Form } from "reactstrap";
import React, { useEffect, useState } from "react";
import InputField from "./InputField";
import SelectField from "./SelectField";
import ButtonComponent from "./ButtonComponent";
export default function ModalComponent(props) {
  const { data, accounts, modal, toggle, listDepartment, listPosition } = props;
  const [accountsUpdate, setAccountsUpdate] = useState([]);
  useEffect(() => {
    setAccountsUpdate([...accounts]);
  }, [accounts]);
  const handleChange = (e, index) => {
    const { name, value } = e.target;
    let accountUpdate = { ...accountsUpdate[index], [name]: value };
    accountsUpdate[index] = accountUpdate;
    setAccountsUpdate([...accountsUpdate]);
  };
  const handleClick = () => {
    let accountsUpdated = [...accountsUpdate];
    if (data.buttonName === "Create") {
      accountsUpdated[0].createDate = new Date().toLocaleDateString();
    }
    props.sendDataToParent(accountsUpdated);
    toggle();
  };
  const handleClickReset = () => {
    setAccountsUpdate([...accounts]);
  };
  return (
    <Modal isOpen={modal} toggle={toggle}>
      <ModalHeader toggle={toggle}>{data.title}</ModalHeader>
      <ModalBody>
        <Form>
          {accountsUpdate.map((accountUpdate, index) => {
            return (
              <React.Fragment key={index}>
                {data.buttonName === "Create" ? (
                  ""
                ) : (
                  <h6>Update for Username: {accountUpdate.useName}</h6>
                )}
                <InputField
                  id={`id`}
                  label="Id"
                  value={accountUpdate.id}
                  disabled={true}
                />
                <InputField
                  id={`email`}
                  label="Email"
                  value={accountUpdate.email}
                  name="email"
                  onChange={(e) => {
                    handleChange(e, index);
                  }}
                  type="email"
                />
                <InputField
                  id={`useName`}
                  label="Username"
                  value={accountUpdate.useName}
                  name="useName"
                  onChange={(e) => {
                    handleChange(e, index);
                  }}
                  type="text"
                />
                <InputField
                  id={`fullName`}
                  label="Full name"
                  value={accountUpdate.fullName}
                  name="fullName"
                  onChange={(e) => {
                    handleChange(e, index);
                  }}
                  type="text"
                />
                <SelectField
                  id={`departmentId`}
                  label="Select a Department"
                  value={accountUpdate.departmentId}
                  onChange={(e) => {
                    handleChange(e, index);
                  }}
                  type="select"
                  listOption={listDepartment}
                  name="departmentId"
                />
                <SelectField
                  id={`positionId`}
                  label="Select a Position"
                  value={accountUpdate.positionId}
                  onChange={(e) => {
                    handleChange(e, index);
                  }}
                  type="select"
                  listOption={listPosition}
                  name="positionId"
                />
              </React.Fragment>
            );
          })}
          <ButtonComponent
            color="primary"
            name={data.buttonName}
            handleClick={handleClick}
          />{" "}
          <ButtonComponent
            color="danger"
            name="Reset"
            handleClick={handleClickReset}
          />
        </Form>
      </ModalBody>
      <ModalFooter>
        <ButtonComponent color="danger" name="Close" handleClick={toggle} />
      </ModalFooter>
    </Modal>
  );
}
