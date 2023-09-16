import { Col, Container, Row } from "reactstrap";
import ResultForm from "../Component/ResultForm";
import ButtonComponent from "../Component/ButtonComponent";
import ModalComponent from "../Component/ModalComponent";
import { useState } from "react";
export default function Account() {
  const [modal, setModal] = useState(false);
  const [data, setData] = useState({ title: "", buttonName: "" });

  const toggle = (name) => {
    setModal(!modal);
    let data;
    switch (name) {
      case "Edit":
        data = {
          name: name,
          title: "Update Account",
          buttonName: "Update",
        };
        break;
      case "Create New Account":
        data = {
          name: name,
          title: "Create New Account",
          buttonName: "Create",
        };
        break;
      default:
        data = {
          name: "",
          title: "",
          buttonName: "",
        };
        break;
    }
    setData(data);
  };

  return (
    <Container fluid>
      <Row>
        <Col>
          <ButtonComponent
            name="Create New Account"
            color="primary"
            handleClick={() => toggle("Create New Account")}
          />
        </Col>
      </Row>
      <Row>
        <h2>Danh sách account</h2>
      </Row>
      <Row>
        <ResultForm toggle={toggle} />
      </Row>
      <ModalComponent data={data} modal={modal} toggle={toggle} />
    </Container>
  );
}
