import { FC } from "react";
import { Outlet } from "react-router-dom";
import { Layout } from "antd";
import Logo from "@/components/Logo";
import UserInfo from "@/components/UserInfo";
import styles from "./MainLayout.module.scss";
const { Header, Footer, Content } = Layout;
const MainLayout: FC = () => {
  return (
    <Layout>
      {/* 公共头部 */}
      <Header className={styles.header}>
        <div className={styles.left}>
          <Logo />
        </div>
        <div className={styles.right}>
          <UserInfo />
        </div>
      </Header>
      {/* 公共内容区 */}
      <Content className={styles.main}>
          <Outlet />
      </Content>
      {/* 公共底部 */}
      <Footer className={styles.footer}>轻问卷 ©2025 Created by YuJun</Footer>
    </Layout>
  );
};
export default MainLayout;
