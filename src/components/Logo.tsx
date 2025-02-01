import React from "react";
import styles from "./Logo.module.scss";
import { useNavigate } from "react-router-dom";
const Logo: React.FC = () => {
  const nav = useNavigate();
  return (
    <div className={styles.container}>
      <h1 onClick={() => nav("/")}>轻问卷</h1>
    </div>
  );
};
export default Logo;
