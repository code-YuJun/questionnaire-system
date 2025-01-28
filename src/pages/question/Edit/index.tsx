import React, { FC } from "react";
import styles from "./Edit.module.scss";
import { useParams } from "react-router-dom";
const Edit: FC = () => {
  const { id } = useParams();
  return <div className={styles.container}>Edit {id}</div>;
};
export default Edit;
