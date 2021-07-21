import styles from "./sideMenuContent.module.scss";

const SideMenuContent = ({ item }) => {
  return <div className={styles.container}>{item}</div>;
};

export default SideMenuContent;
