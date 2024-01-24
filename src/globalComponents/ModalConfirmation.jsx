import { useSelector } from "react-redux";
import Modal from "./Modal";

function ModalConfirmation() {
  const { modalconfirmation } = useSelector((state) => state.rapprochements);
  return (
    <Modal
      modaleSate={modalconfirmation}
      setModalSate     = {""}
      OnActionBtnClick = {""}
    >

    </Modal>
  );
}
export default ModalConfirmation;