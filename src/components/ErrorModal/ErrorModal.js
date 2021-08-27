import ReactDOM from "react-dom";

import styles from "./errorModal.module.scss";

const Backdrop = () => {
  return <div className={styles["backdrop"]}></div>;
};

const ModalOverlay = () => {
  return (
    <div className={styles["modal-overlay"]}>
      <p>
        Briefly unavailable for scheduled maintenance. Please check back in few
        minutes.
      </p>
    </div>
  );
};

const ErrorModal = () => {
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop />,
        document.getElementById("backdrop-root")
      )}
      {ReactDOM.createPortal(
        <ModalOverlay />,
        document.getElementById("overlay-root")
      )}
    </>
  );
};

export default ErrorModal;
