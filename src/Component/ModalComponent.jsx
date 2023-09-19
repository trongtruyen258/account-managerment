import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Label,
  Input,
  Form,
  FormGroup,
} from "reactstrap";
import { useEffect, useState } from "react";
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
          <FormGroup>
            <Label>Id:</Label>
            <Input disabled value={accountUpdate.id}></Input>
          </FormGroup>
          <FormGroup>
            <Label>Email:</Label>
            <Input
              placeholder="Input Email"
              onChange={handleChange}
              value={accountUpdate.email}
              name="email"
            ></Input>
          </FormGroup>
          <FormGroup>
            <Label>Username:</Label>
            <Input
              placeholder="Input Username"
              onChange={handleChange}
              value={accountUpdate.useName}
              name="useName"
            ></Input>
          </FormGroup>
          <FormGroup>
            <Label>Full name:</Label>
            <Input
              placeholder="Input Full name"
              onChange={handleChange}
              value={accountUpdate.fullName}
              name="fullName"
            ></Input>
          </FormGroup>
          <FormGroup>
            <Label>Select a Department:</Label>
            <Input
              type="select"
              onChange={handleChange}
              name="departmentId"
              value={accountUpdate.departmentId}
            >
              <option key={0}>Select department</option>
              {listDepartment.map((department) => {
                return (
                  <option key={department.id} value={department.id}>
                    {department.name}
                  </option>
                );
              })}
            </Input>
          </FormGroup>
          <FormGroup>
            <Label>Select a Position:</Label>
            <Input
              type="select"
              onChange={handleChange}
              name="positionId"
              value={accountUpdate.positionId}
            >
              <option key={0}>Select position</option>
              {listPosition.map((position) => {
                return (
                  <option key={position.id} value={position.id}>
                    {position.name}
                  </option>
                );
              })}
            </Input>
          </FormGroup>
          <FormGroup>
            <Button color="primary" onClick={handleClick}>
              {data.buttonName}
            </Button>{" "}
            <Button color="danger" type="reset">
              Reset
            </Button>
          </FormGroup>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button color="danger" onClick={toggle}>
          Close
        </Button>
      </ModalFooter>
    </Modal>
  );
}
