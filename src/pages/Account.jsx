import { Col, Container, Row } from "reactstrap";
import ResultForm from "../Component/ResultForm";
import ButtonComponent from "../Component/ButtonComponent";
import ModalComponent from "../Component/ModalComponent";
import { useEffect, useState } from "react";
import swal from "sweetalert";
// import ACCOUNTS from "../constant/Accounts"; //code no API
import DEPARTMENTS from "../constant/Departments";
import POSITIONS from "../constant/Positions";
import { getAccounts } from "../api/GetAccountsFromAPI";
import { addAccount } from "../api/AddAccount";
import { updateAccount } from "../api/UpdateAccounts";
import { removeAccount } from "../api/RemoveAccount";
export default function Account() {
  const [modal, setModal] = useState(false);
  const [dataModal, setDataModal] = useState({ title: "", buttonName: "" });
  // const [accounts, setAccounts] = useState(ACCOUNTS); //code no API
  const [accounts, setAccounts] = useState([]);
  const [account, setAccount] = useState({
    id: "",
    email: "",
    useName: "",
    fullName: "",
    departmentId: "",
    positionId: "",
    createDate: "",
  });
  useEffect(() => {
    getAccounts().then((res) => {
      setAccounts(res ? res : []);
    });
  }, []);
  const handleCreate = () => {
    setDataModal({
      title: "Create New Account",
      buttonName: "Create",
    });
    // let newId = 1; //code no API
    // accounts.forEach((ele) => {
    //   if (ele.id === newId) {
    //     newId++;
    //   } else {
    //     return;
    //   }
    // });
    setAccount({
      // id: newId, //code no API
      id: "",
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
    }).then(async (willDelete) => {
      if (willDelete) {
        // let listAccountUpdate = accounts.filter((account) => { //code no API
        //   return account.id !== id;
        // });
        // setAccounts(listAccountUpdate);
        await removeAccount(id);
        await getAccounts().then((res) => {
          setAccounts(res ? res : []);
        });
        swal("Poof! This account has been deleted!", {
          icon: "success",
        });
      } else {
        swal("This account is safe!");
      }
    });
  };
  const receiveDataFromModal = async (accountUpdate) => {
    let index = accounts.findIndex((account) => {
      return account.id === accountUpdate.id;
    });
    if (index === -1) {
      // accounts.push(accountUpdate); //code no API
      await addAccount(accountUpdate);
    } else {
      // accounts[index] = accountUpdate; //code no API
      await updateAccount(accountUpdate);
    }
    await getAccounts().then((res) => {
      setAccounts(res ? res : []);
    });
  };
  return (
    <Container fluid>
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
