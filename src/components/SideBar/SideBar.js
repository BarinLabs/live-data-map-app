import styles from "./sideBar.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { closeDevice } from "../../redux/CurrentDevice/currentDeviceSlice";

const SideBar = () => {
  const dispatch = useDispatch();
  const device = useSelector((state) => state.currentDevice.device);
  const error = useSelector((state) => state.currentDevice.error);
  console.log(device);
  console.log(error);
  return (
    <div className={styles.container}>
      <div>
        <button onClick={() => dispatch(closeDevice())}>close</button>
      </div>
      {error && <p>Something went wrong. Please try again.</p>}
      {!error && <p>Info here...</p>}
    </div>
  );
};

export default SideBar;
