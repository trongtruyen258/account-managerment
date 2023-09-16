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
export default function ModalComponent(props) {
  const { modal, toggle, data } = props;
  return (
    <Modal isOpen={modal} toggle={() => toggle(data.name)}>
      <ModalHeader toggle={() => toggle(data.name)}>{data.title}</ModalHeader>
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
            <Button color="primary">{data.buttonName}</Button>{" "}
            <Button color="danger" type="reset">
              Reset
            </Button>
          </FormGroup>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button color="danger" onClick={() => toggle(data.name)}>
          Close
        </Button>
      </ModalFooter>
    </Modal>
  );
}
