import { Col, Container, Row } from "reactstrap";
import ResultForm from "../Component/ResultForm";
import ButtonComponent from "../Component/ButtonComponent";
import ModalComponent from "../Component/ModalComponent";
import { useEffect, useMemo, useState } from "react";
import swal from "sweetalert";
// import ACCOUNTS from "../constant/Accounts"; //code no API
import DEPARTMENTS from "../constant/Departments";
import POSITIONS from "../constant/Positions";
import { getAccounts } from "../api/account/GetAccountsFromAPI";
import { addAccount } from "../api/account/AddAccount";
import { updateAccount } from "../api/account/UpdateAccounts";
import { removeAccount } from "../api/account/RemoveAccount";
import Pagination from "../pagination/Pagination";
let PageSize = 8;
export default function Account() {
  const [modal, setModal] = useState(false);
  const [dataModal, setDataModal] = useState({ title: "", buttonName: "" });
  // const [accounts, setAccounts] = useState(ACCOUNTS); //code no API
  const [accounts, setAccounts] = useState([]);
  const [listAccount, setListAccount] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return accounts.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, accounts]);
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
    setListAccount([
      {
        // id: newId, //code no API
        id: "",
        email: "",
        useName: "",
        fullName: "",
        departmentId: "",
        positionId: "",
        createDate: "",
      },
    ]);
    toggle();
  };
  const handleEdit = (account) => {
    setDataModal({
      title: "Update Account",
      buttonName: "Update",
    });
    setListAccount([account]);
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
  const receiveDataFromModal = async (accountsUpdate) => {
    for (const accountUpdate of accountsUpdate) {
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
    }
    //edit here

    await getAccounts().then((res) => {
      setAccounts(res ? res : []);
    });
  };
  const [listSelected, setListSelected] = useState([]);
  const receiveAccountsSelected = (listAccountSelected) => {
    setListSelected(listAccountSelected);
  };
  const handleDeleteMultiple = () => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this accounts!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        for (const accountDelete of listSelected) {
          await removeAccount(accountDelete.id);
        }

        await getAccounts().then((res) => {
          setAccounts(res ? res : []);
        });
        swal("Poof! This accounts has been deleted!", {
          icon: "success",
        });
      } else {
        swal("This accounts is safe!");
      }
    });
  };
  const handleEditMultiple = () => {
    setDataModal({
      title: "Update Accounts Selected",
      buttonName: "Update",
    });
    setListAccount(listSelected);
    toggle();
  };
  return (
    <Container fluid>
      <Row>
        <Col lg="auto">
          <ButtonComponent
            name="Create New Account"
            color="primary"
            handleClick={handleCreate}
          />
        </Col>
        <Col lg="auto">
          <ButtonComponent
            name="Delete Accounts selected"
            color="danger"
            handleClick={handleDeleteMultiple}
          />
        </Col>
        <Col lg="auto">
          <ButtonComponent
            name="Edit Accounts selected"
            color="danger"
            handleClick={handleEditMultiple}
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
          listAccount={currentTableData}
          handleClickEdit={handleEdit}
          sendDataToParent={receiveDataFromHandleDelete}
          sendAccountDelete={receiveAccountsSelected}
        />
        <Pagination
          className="pagination-bar"
          currentPage={currentPage}
          totalCount={accounts.length}
          pageSize={PageSize}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </Row>
      <ModalComponent
        data={dataModal}
        accounts={listAccount}
        modal={modal}
        toggle={toggle}
        sendDataToParent={receiveDataFromModal}
        listDepartment={DEPARTMENTS}
        listPosition={POSITIONS}
      />
    </Container>
  );
}
