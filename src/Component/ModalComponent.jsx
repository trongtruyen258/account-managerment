import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
} from "reactstrap";
import React, { useEffect, useState } from "react";
import InputField from "./InputField";
import SelectField from "./SelectField";
import ButtonComponent from "./ButtonComponent";
export default function ModalComponent(props) {
  const { data, accounts, modal, toggle, listDepartment, listPosition } = props;
  const [accountsUpdate, setAccountsUpdate] = useState([]);
  useEffect(() => {
    setAccountsUpdate(accounts);
  }, [accounts]);
  const handleChange = (e) => {
    //edit here
    const { name, value, id } = e.target;
    const index = parseInt(id.charAt(id.length - 1));
    let accountUpdate = { ...accountsUpdate[index], [name]: value };
    accountsUpdate[index] = accountUpdate;
    setAccountsUpdate([...accountsUpdate]);
  };
  const handleClick = () => {
    //edit here
    let accountsUpdated = [...accountsUpdate];
    if (data.buttonName === "Create") {
      accountsUpdated[0].createDate = new Date().toLocaleDateString();
    }
    props.sendDataToParent(accountsUpdated);
    toggle();
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
                  id={`id${index}`}
                  label="Id"
                  value={accountUpdate.id}
                  disabled={true}
                />
                <InputField
                  id={`email${index}`}
                  label="Email"
                  value={accountUpdate.email}
                  name="email"
                  onChange={handleChange}
                  type="email"
                />
                <InputField
                  id={`useName${index}`}
                  label="Username"
                  value={accountUpdate.useName}
                  name="useName"
                  onChange={handleChange}
                  type="text"
                />
                <InputField
                  id={`fullName${index}`}
                  label="Full name"
                  value={accountUpdate.fullName}
                  name="fullName"
                  onChange={handleChange}
                  type="text"
                />
                <SelectField
                  id={`departmentId${index}`}
                  label="Select a Department"
                  value={accountUpdate.departmentId}
                  onChange={handleChange}
                  type="select"
                  listOption={listDepartment}
                  name="departmentId"
                />
                <SelectField
                  id={`positionId${index}`}
                  label="Select a Position"
                  value={accountUpdate.positionId}
                  onChange={handleChange}
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
          <Button color="danger" type="reset">
            Reset
          </Button>
        </Form>
      </ModalBody>
      <ModalFooter>
        <ButtonComponent color="danger" name="Close" handleClick={toggle} />
      </ModalFooter>
    </Modal>
  );
}
