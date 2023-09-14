import { Table } from "reactstrap";
import ResultFormItem from "./ResultFormItem";

export default function ResultForm() {
  return (
    <Table responsive>
      <thead>
        <tr>
          <th>ID</th>
          <th>Email</th>
          <th>Username</th>
          <th>Full name</th>
          <th>Department</th>
          <th>Position</th>
          <th>Create Date</th>
          <th>Edit</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        <ResultFormItem />
      </tbody>
    </Table>
  );
}
