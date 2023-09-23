import { Table } from "reactstrap";
import ButtonComponent from "./ButtonComponent";
import InputField from "./InputField";
import { useEffect, useState } from "react";

export default function ResultForm(props) {
  const {
    listDepartment,
    listPosition,
    listAccount,
    handleClickEdit,
    sendAccountDelete,
  } = props;
  const handleDelete = (id) => {
    props.sendDataToParent(id);
  };
  const [listAccountSelected, setListAccountSelected] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  useEffect(() => {
    setListAccountSelected([]);
    setSelectAll(false);
  }, [listAccount]);
  useEffect(() => {
    sendAccountDelete(listAccountSelected);
  }, [sendAccountDelete, listAccountSelected]);
  const handleSelectAll = (e) => {
    setSelectAll(!selectAll);
    if (e.target.checked) {
      setListAccountSelected(listAccount);
    } else {
      setListAccountSelected([]);
    }
  };
  const handleChange = (account) => {
    if (listAccountSelected.includes(account)) {
      let accountsSelected = listAccountSelected.filter((accountDel) => {
        return accountDel.id !== account.id;
      });
      setListAccountSelected(accountsSelected);
    } else {
      setListAccountSelected([...listAccountSelected, account]);
    }
  };
  return (
    <Table responsive>
      <thead>
        <tr>
          <th>
            <InputField
              type="checkbox"
              onChange={handleSelectAll}
              checked={selectAll}
            />
          </th>
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
          const isSelected = listAccountSelected.includes(account);
          return (
            <tr key={account.id}>
              <td>
                <InputField
                  type="checkbox"
                  onChange={() => {
                    handleChange(account);
                  }}
                  checked={isSelected}
                />
              </td>
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
