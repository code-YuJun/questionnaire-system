import React, { FC } from "react";
import styles from "./QuestionLayout.module.scss";
import { Outlet } from "react-router-dom";
const QuestionLayout: FC = () => {
  return <div className={styles.container}>
    <Outlet />
  </div>;
};
export default QuestionLayout;
