import { Table } from "reactstrap";
import ButtonComponent from "./ButtonComponent";

export default function ResultForm(props) {
  const { listDepartment, listPosition, listAccount, handleClickEdit } = props;
  const handleDelete = (id) => {
    props.sendDataToParent(id);
  };

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
        {listAccount.map((account) => {
          return (
            <tr key={account.id}>
              <td>{account.id}</td>
              <td>{account.email}</td>
              <td>{account.useName}</td>
              <td>{account.fullName}</td>
              <td>
                {
                  listDepartment.find((department) => {
                    return +account.departmentId === department.id;
                  })?.name
                }
              </td>
              <td>
                {
                  listPosition.find((position) => {
                    return +account.positionId === position.id;
                  })?.name
                }
              </td>
              <td>{account.createDate}</td>
              <td>
                <ButtonComponent
                  name="Edit"
                  color="warning"
                  handleClick={() => handleClickEdit(account)}
                />
              </td>
              <td>
                <ButtonComponent
                  name="Delete"
                  color="warning"
                  handleClick={() => handleDelete(account.id)}
                />
              </td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
}
