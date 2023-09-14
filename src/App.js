import "./App.css";
import { Container, Row } from "reactstrap";
import CreateButton from "./Component/CreateButton";
import "bootstrap/dist/css/bootstrap.min.css";
import ResultForm from "./Component/ResultForm";

function App() {
  return (
    <Container fluid>
      <Row>
        <CreateButton />
      </Row>
      <Row>
        <h2>Danh sách account</h2>
      </Row>
      <Row>
        <ResultForm />
      </Row>
    </Container>
  );
}

export default App;
