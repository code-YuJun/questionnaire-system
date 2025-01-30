/*
 * @Author: qiangyujun qiangyujun@jd.com
 * @Date: 2025-01-27 17:05:59
 * @LastEditors: qiangyujun qiangyujun@jd.com
 * @LastEditTime: 2025-01-30 12:38:28
 * @FilePath: /project/questionnaire-system/src/pages/manage/Star.tsx
 * @Description: 这是默认设置,请设置`customQuestioaTdpee`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { FC, useState } from "react";
import styles from "./common.module.scss";
import QuestionCard from "@/components/QuestionCard";
import { Empty } from "antd";
import { QuestionType } from "./type";
import ListSearch from "@/components/ListSearch";
const Star: FC = () => {
  const [questionList] = useState<QuestionType[]>([
    {
      _id: 3,
      title: "问卷3",
      isPublished: true,
      isStar: true,
    }
  ]);
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
        {questionList.length > 0 &&
          questionList.map((item) => <QuestionCard key={item._id} {...item} />)}
      </div>
      <div className={styles.footer}>loaderMore... 上滑加载更多</div>
    </>
  );
};
export default Star;
