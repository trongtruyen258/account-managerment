import { Table } from "reactstrap";
import { listAccount, listDepartment, listPosition } from "./Data";
import { useState } from "react";
import ButtonComponent from "./ButtonComponent";
import swal from "sweetalert";

export default function ResultForm(props) {
  const { toggle } = props;

  const [accounts, setAccounts] = useState(listAccount);
  const handleData = (accounts) => {
    setAccounts(accounts);
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
        {accounts.map((account) => {
          return (
            <tr key={account.id}>
              <td>{account.id}</td>
              <td>{account.email}</td>
              <td>{account.useName}</td>
              <td>{account.fullName}</td>
              <td>
                {
                  listDepartment.find((department) => {
                    return account.departmentId === department.id;
                  })?.name
                }
              </td>
              <td>
                {
                  listPosition.find((position) => {
                    return account.positionId === position.id;
                  })?.name
                }
              </td>
              <td>{account.createDate}</td>
              <td>
                <ButtonComponent
                  name="Edit"
                  color="warning"
                  handleClick={() => toggle("Edit")}
                />
              </td>
              <td>
                <ButtonDelete
                  id={account.id}
                  sendData={handleData}
                  accounts={accounts}
                />
              </td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
}
function ButtonDelete(props) {
  const sendData = () => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this account!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        let accounts = props.accounts.filter((account) => {
          return account.id !== props.id;
        });
        props.sendData(accounts);
        swal("Poof! This account has been deleted!", {
          icon: "success",
        });
      } else {
        swal("This account is safe!");
      }
    });
  };
  return (
    <ButtonComponent name="Delete" color="warning" handleClick={sendData} />
  );
}
