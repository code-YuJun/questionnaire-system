import React from "react";
import styles from "./Logo.module.scss";
import logo from "@/assets/logo.jpg";
import { Space } from "antd";
import { useNavigate } from "react-router-dom";
const Logo: React.FC = () => {
  const nav = useNavigate();
  return (
    <div className={styles.container}>
      <Space onClick={() => nav("/")}>
        <div className={styles.logo}>
          <img src={logo} alt="logo" />
        </div>
        <h1>慧问</h1>
      </Space>
    </div>
  );
};
export default Logo;
