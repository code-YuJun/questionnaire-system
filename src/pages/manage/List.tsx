/*
 * @Author: qiangyujun qiangyujun@jd.com
 * @Date: 2025-01-26 14:59:13
 * @LastEditors: qiangyujun qiangyujun@jd.com
 * @LastEditTime: 2025-01-30 12:37:53
 * @FilePath: /project/questionnaire-system/src/List.tsx
 * @Description: 问卷列表页
 */
import { FC, useState, useEffect } from "react";
import QuestionCard from "@/components/QuestionCard";
// import { produce } from "immer";
import styles from "./common.module.scss";
import { useSearchParams } from "react-router-dom";
import { useTitle } from "ahooks";
import { QuestionType } from "./type";
import ListSearch from "@/components/ListSearch";
const List: FC = () => {
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get("keyword") || "";
  console.log(keyword);
  useTitle(`问卷管理 - ${keyword}`);
  const [questionList, setQuestionList] = useState<QuestionType[]>([
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
  ]);
  useEffect(() => {
    console.log("List组件被渲染了");
    return () => {
      console.log("List组件被卸载了");
    };
  }, []);
//   const addQuestion = () => {
//     setQuestionList(
//       produce((draft) => {
//         draft.push({
//           _id: questionList.length + 1,
//           title: "问卷" + (questionList.length + 1),
//           isPublished: false,
//         });
//       })
//     );
//   };
  const deleteQuestion = (id: number) => {
    setQuestionList(questionList.filter((item) => item._id !== id));
  };
  const editQuestion = (id: number) => {
    console.log("编辑问卷", id);
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
        {questionList.length > 0 &&
          questionList.map((item) => (
            <QuestionCard
              key={item._id}
              {...item}
              deleteQuestion={deleteQuestion}
              editQuestion={editQuestion}
            />
          ))}
      </div>
      <div className={styles.footer}>
        loaderMore... 上滑加载更多
      </div>
    </>
  );
};

export default List;
