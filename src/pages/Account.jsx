import { Col, Container, Row } from "reactstrap";
import ResultForm from "../Component/ResultForm";
import ButtonComponent from "../Component/ButtonComponent";
import ModalComponent from "../Component/ModalComponent";
import { useState } from "react";
import swal from "sweetalert";
import ACCOUNTS from "../constant/Accounts";
import DEPARTMENTS from "../constant/Departments";
import POSITIONS from "../constant/Positions";
export default function Account() {
  const [modal, setModal] = useState(false);
  const [dataModal, setDataModal] = useState({ title: "", buttonName: "" });
  const [accounts, setAccounts] = useState(ACCOUNTS);
  const [account, setAccount] = useState({
    id: "",
    email: "",
    useName: "",
    fullName: "",
    departmentId: "",
    positionId: "",
    createDate: "",
  });
  const handleCreate = () => {
    setDataModal({
      title: "Create New Account",
      buttonName: "Create",
    });
    let newId = 1;
    accounts.forEach((ele) => {
      if (ele.id === newId) {
        newId++;
      } else {
        return;
      }
    });
    setAccount({
      id: newId,
      email: "",
      useName: "",
      fullName: "",
      departmentId: "",
      positionId: "",
      createDate: "",
    });
    toggle();
  };
  const handleEdit = (account) => {
    setDataModal({
      title: "Update Account",
      buttonName: "Update",
    });
    setAccount(account);
    toggle();
  };

  const toggle = () => {
    setModal(!modal);
  };
  const receiveDataFromHandleDelete = (id) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this account!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        let listAccountUpdate = accounts.filter((account) => {
          return account.id !== id;
        });
        setAccounts(listAccountUpdate);
        swal("Poof! This account has been deleted!", {
          icon: "success",
        });
      } else {
        swal("This account is safe!");
      }
    });
  };
  const receiveDataFromModal = (accountUpdate) => {
    let index = accounts.findIndex((account) => {
      return account.id === accountUpdate.id;
    });
    if (index === -1) {
      accounts.push(accountUpdate);
    } else {
      accounts[index] = accountUpdate;
    }
    setAccounts(accounts);
  };
  return (
    <Container>
      <Row>
        <Col>
          <ButtonComponent
            name="Create New Account"
            color="primary"
            handleClick={handleCreate}
          />
        </Col>
      </Row>
      <Row>
        <h2>Danh sách account</h2>
      </Row>
      <Row>
        <ResultForm
          listDepartment={DEPARTMENTS}
          listPosition={POSITIONS}
          listAccount={accounts}
          handleClickEdit={handleEdit}
          sendDataToParent={receiveDataFromHandleDelete}
        />
      </Row>
      <ModalComponent
        data={dataModal}
        account={account}
        modal={modal}
        toggle={toggle}
        sendDataToParent={receiveDataFromModal}
        listDepartment={DEPARTMENTS}
        listPosition={POSITIONS}
      />
    </Container>
  );
}
