import React, { FC } from "react";
import styles from "./ManageLayout.module.scss";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { Button, Space, Divider } from "antd";
import {
  PlusOutlined,
  BarsOutlined,
  StarOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
const ManageLayout: FC = () => {
  const navigate = useNavigate();
  const pathname = useLocation();
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <Space direction="vertical">
          <Button type="primary" size="large" icon={<PlusOutlined />}>
            创建问卷
          </Button>
          <Divider style={{ borderTop: "transparent" }} />
          <Button
            type={pathname.pathname === "/manage/list" ? "primary" : "text"}
            size="large"
            icon={<BarsOutlined />}
            onClick={() => navigate("/manage/list")}
          >
            我的问卷
          </Button>
          <Button
            type={pathname.pathname === "/manage/star" ? "primary" : "text"}
            size="large"
            icon={<StarOutlined />}
            onClick={() => navigate("/manage/star")}
          >
            收藏问卷
          </Button>
          <Button
            type={pathname.pathname === "/manage/trash" ? "primary" : "text"}
            size="large"
            icon={<DeleteOutlined />}
            onClick={() => navigate("/manage/trash")}
          >
            回收站
          </Button>
        </Space>
      </div>
      <div className={styles.right}>
        <Outlet />
      </div>
    </div>
  );
};
export default ManageLayout;
