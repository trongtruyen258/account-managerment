import { Button } from "reactstrap";
import { listAccount, listDepartment, listPosition } from "./Data";

export default function ResultFormItem() {
  return listAccount.map((account) => {
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
          <Button color="warning">Edit</Button>
        </td>
        <td>
          <Button color="warning">Delete</Button>
        </td>
      </tr>
    );
  });
}
