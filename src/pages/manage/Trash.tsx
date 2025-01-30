/*
 * @Author: qiangyujun qiangyujun@jd.com
 * @Date: 2025-01-27 17:06:20
 * @LastEditors: qiangyujun qiangyujun@jd.com
 * @LastEditTime: 2025-01-30 12:38:36
 * @FilePath: /project/questionnaire-system/src/pages/manage/Trash.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { FC, useState } from "react";
import styles from "./common.module.scss";
import { useTitle } from "ahooks";
import { Empty, Table, Tag, Button, Space, Modal } from "antd";
import { QuestionType } from "./type";
import ListSearch from "@/components/ListSearch";
const Trash: FC = () => {
  useTitle(`问卷管理 - 回收站`);
  const [selectedQuestionIds, setSelectedQuestionIds] = useState<string[]>([]);
  const rawQuestionList = [
    {
      _id: 1,
      title: "问卷1",
      isPublished: true,
      isStar: false,
    },
    {
      _id: 2,
      title: "问卷2",
      isPublished: true,
      isStar: false,
    },
    {
      _id: 3,
      title: "问卷3",
      isPublished: true,
      isStar: true,
    },
    {
      _id: 4,
      title: "问卷4",
      isPublished: false,
      isStar: false,
    },
  ];
  const [questionList] = useState<QuestionType[]>(rawQuestionList);
  const columns = [
    {
      title: "标题",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "是否发布",
      dataIndex: "isPublished",
      key: "isPublished",
      render: (isPublished: boolean) => (
        <Tag color={isPublished ? "success" : "default"}>
          {isPublished ? "已发布" : "未发布"}
        </Tag>
      ),
    },
    {
      title: "是否星标",
      dataIndex: "isStar",
      key: "isStar",
      render: (isStar: boolean) => (
        <Tag color={isStar ? "success" : "default"}>
          {isStar ? "已星标" : "未星标"}
        </Tag>
      ),
    },
    {
      title: "回收时间",
      dataIndex: "deletedAt",
      key: "deletedAt",
      render: (deletedAt: string) => (
        <span>{new Date(deletedAt).toLocaleString()}</span>
      ),
    },
  ];
  const handleRestore = () => {
    console.log(selectedQuestionIds);
  };
  const handleDelete = () => {
    Modal.confirm({
      title: "确定要彻底删除吗？",
      content: "删除以后不可以找回",
      okText: "确定",
      cancelText: "取消",
      onOk: () => {
        console.log(selectedQuestionIds);
      },
    });
  };
  const TableElement = () => {
    return (
      <>
        <div style={{ marginBottom: 16 }}>
          <Space>
            <Button
              type="primary"
              onClick={handleRestore}
              disabled={selectedQuestionIds.length === 0}
            >
              恢复
            </Button>
            <Button
              onClick={handleDelete}
              danger
              disabled={selectedQuestionIds.length === 0}
            >
              彻底删除
            </Button>
          </Space>
        </div>
        <Table
          rowSelection={{
            type: "checkbox",
            onChange: (selectedRowKeys) => {
              setSelectedQuestionIds(selectedRowKeys as string[]);
            },
          }}
          dataSource={questionList}
          columns={columns}
          pagination={false}
          rowKey={"_id"}
        />
      </>
    );
  };
  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <h3>我的问卷</h3>
        </div>
        <div className={styles.right}>
          <ListSearch />
        </div>
      </div>
      <div className={styles.content}>
        {questionList.length === 0 && (
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description={"暂无数据"}
          />
        )}
        {questionList.length > 0 && TableElement()}
      </div>
    </>
  );
};
export default Trash;
