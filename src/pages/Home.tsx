import { FC } from "react";
import styles from "./Home.module.scss";
import { Button, Typography } from "antd";
import { useNavigate } from "react-router-dom";
const { Title, Paragraph } = Typography;

const Home: FC = () => {
  const nav = useNavigate();
  return (
    <div className={styles.container}>
      <Title>轻问卷</Title>
      <Paragraph>
        轻问卷是一款低代码问卷调查系统，旨在帮助用户快速创建和发布问卷。
      </Paragraph>
      <div>
        <Button type="primary" onClick={() => nav("/manage/list")}>
          开始使用
        </Button>
      </div>
    </div>
  );
};
export default Home;
