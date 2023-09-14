import React, { useState } from "react";
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
import { listDepartment, listPosition } from "./Data";

export default function CreateButton(args) {
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);
  return (
    <div>
      <Button color="primary" onClick={toggle}>
        Create New Account
      </Button>
      <Modal isOpen={modal} toggle={toggle} {...args}>
        <ModalHeader toggle={toggle}>Create New Account</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label>Email:</Label>
              <Input placeholder="Input Email"></Input>
            </FormGroup>
            <FormGroup>
              <Label>Username:</Label>
              <Input placeholder="Input Username"></Input>
            </FormGroup>
            <FormGroup>
              <Label>Full name:</Label>
              <Input placeholder="Input Full name"></Input>
            </FormGroup>
            <FormGroup>
              <Label>Select a Department:</Label>
              <Input type="select">
                {listDepartment.map((department) => {
                  return <option key={department.id}>{department.name}</option>;
                })}
              </Input>
            </FormGroup>
            <FormGroup>
              <Label>Select a Position:</Label>
              <Input type="select">
                {listPosition.map((position) => {
                  return <option key={position.id}>{position.name}</option>;
                })}
              </Input>
            </FormGroup>
            <FormGroup>
              <Button color="primary">Create</Button>{" "}
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
    </div>
  );
}
