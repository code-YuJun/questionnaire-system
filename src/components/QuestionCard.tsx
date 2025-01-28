import { FC, useEffect } from "react";
import styles from "./QuestionCard.module.scss";
import { Button, Space, Divider, Tag, Popconfirm, Modal, message } from "antd";
import {
  EditOutlined,
  LineChartOutlined,
  StarOutlined,
  CopyOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
interface QuestionCardProps {
  _id: number;
  title: string;
  isStar: boolean;
  isPublished: boolean;
  answerCount: number;
  createdAt: string;
  deleteQuestion: (id: number) => void;
  editQuestion: (id: number) => void;
}
const QuestionCard: FC<QuestionCardProps> = (props) => {
  const nav = useNavigate();
  function duplicate() {
    message.success("复制成功");
  }
  function del() {
    Modal.confirm({
      title: "确定要删除吗？",
      okText: "确定",
      cancelText: "取消",
      onOk: () => {
        deleteQuestion(_id);
      },
    });
  }
  const {
    _id,
    title,
    isStar,
    isPublished,
    deleteQuestion,
    // editQuestion,
    answerCount,
    createdAt,
  } = props;
  useEffect(() => {
    console.log("QuestionCard组件被渲染了");
    return () => {
      console.log("QuestionCard组件被卸载了");
    };
  }, []);
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <div className={styles.left}>
          <Link
            to={isPublished ? `/question/stat/${_id}` : `/question/edit/${_id}`}
          >
            <Space>
              {isStar && <StarOutlined style={{ color: "red" }} />}
              {title}
            </Space>
          </Link>
        </div>
        <div className={styles.right}>
          <Space>
            {isPublished ? (
              <Tag color="success">已发布</Tag>
            ) : (
              <Tag color="warning">未发布</Tag>
            )}
            <span>答卷: {answerCount}</span>
            <span>创建时间: {createdAt}</span>
          </Space>
        </div>
      </div>
      <Divider />
      <div className={styles["button-container"]}>
        <div className={styles.left}>
          <Space>
            <Button
              type="text"
              size="small"
              icon={<EditOutlined />}
              onClick={() => nav(`/question/edit/${_id}`)}
            >
              编辑问卷
            </Button>
            <Button
              type="text"
              size="small"
              icon={<LineChartOutlined />}
              onClick={() => nav(`/question/stat/${_id}`)}
              disabled={!isPublished}
            >
              数据统计
            </Button>
          </Space>
        </div>
        <div className={styles.right}>
          <Space>
            <Button
              type="text"
              size="small"
              icon={<StarOutlined />}
              onClick={() => deleteQuestion(_id)}
            >
              {isStar ? "取消收藏" : "收藏"}
            </Button>
            <Popconfirm
              title="确定要复制吗？"
              okText="确定"
              cancelText="取消"
              onConfirm={duplicate}
            >
              <Button type="text" size="small" icon={<CopyOutlined />}>
                复制
              </Button>
            </Popconfirm>
            <Button
              type="text"
              size="small"
              icon={<DeleteOutlined />}
              onClick={del}
            >
              删除
            </Button>
          </Space>
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;
