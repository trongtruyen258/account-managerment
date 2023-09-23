import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
} from "reactstrap";
import { useEffect, useState } from "react";
import InputField from "./InputField";
import SelectField from "./SelectField";
import ButtonComponent from "./ButtonComponent";
export default function ModalComponent(props) {
  const { data, account, modal, toggle, listDepartment, listPosition } = props;
  const [accountUpdate, setAccountUpdate] = useState({
    id: "",
    email: "",
    useName: "",
    fullName: "",
    departmentId: "",
    positionId: "",
    createDate: "",
  });
  useEffect(() => {
    setAccountUpdate(account);
  }, [account]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setAccountUpdate({
      ...accountUpdate,
      [name]: value,
    });
  };
  const handleClick = () => {
    let accountUpdated = {
      ...accountUpdate,
    };
    if (data.buttonName === "Create") {
      accountUpdated.createDate = new Date().toLocaleDateString();
    }
    props.sendDataToParent(accountUpdated);
    toggle();
  };
  return (
    <Modal isOpen={modal} toggle={toggle}>
      <ModalHeader toggle={toggle}>{data.title}</ModalHeader>
      <ModalBody>
        <Form>
          <InputField
            id="id"
            label="Id"
            value={accountUpdate.id}
            disabled={true}
          />
          <InputField
            id="email"
            label="Email"
            value={accountUpdate.email}
            name="email"
            onChange={handleChange}
            type="email"
          />
          <InputField
            id="useName"
            label="Username"
            value={accountUpdate.useName}
            name="useName"
            onChange={handleChange}
            type="text"
          />
          <InputField
            id="fullName"
            label="Full name"
            value={accountUpdate.fullName}
            name="fullName"
            onChange={handleChange}
            type="text"
          />
          <SelectField
            id="departmentId"
            label="Select a Department"
            value={accountUpdate.departmentId}
            onChange={handleChange}
            type="select"
            listOption={listDepartment}
          />
          <SelectField
            id="positionId"
            label="Select a Position"
            value={accountUpdate.positionId}
            onChange={handleChange}
            type="select"
            listOption={listPosition}
          />
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
