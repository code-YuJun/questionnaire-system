import { FC, useState, useEffect, useRef, useMemo } from "react";
import QuestionCard from "@/components/QuestionCard";
import styles from "./common.module.scss";
import { useSearchParams } from "react-router-dom";
import { useTitle, useRequest, useDebounceFn } from "ahooks";
import { QuestionType } from "./type";
import ListSearch from "@/components/ListSearch";
import { getQuestionListService } from "@/service/question";
import { Empty, Spin } from "antd";
const List: FC = () => {
  useTitle("轻问卷-管理");
  const [searchParams] = useSearchParams(); // 有 keyword 参数
  const keyword = searchParams.get("keyword") || ""; // 搜索关键词
  const [page, setPage] = useState(1); // 当前页码
  const [total, setTotal] = useState(0); // 总数
  const [start, setStart] = useState(false); // 是否开始加载
  const [questionList, setQuestionList] = useState<QuestionType[]>([]); // 问卷列表
  const containerRef = useRef<HTMLDivElement>(null);
  const haveMoreData = total > questionList.length; // 是否还有更多数据
  useEffect(() => {
    console.log("List组件被渲染了");
    return () => {
      console.log("List组件被卸载了");
    };
  }, []);
  // 列表数据请求
  const { run: loadQuestionList, loading } = useRequest(
    () =>
      getQuestionListService({
        keyword,
        page,
        pageSize: 10,
      }),
    {
      manual: true,
      onSuccess(res) {
        const { list, total } = res;
        setQuestionList((prev) => [...prev, ...list]);
        setTotal(total);
        setPage(page + 1);
      },
    }
  );
  const loadMoreContentElem = useMemo(() => {
    if (loading) return <Spin />;
    if (total === 0) return <Empty description="暂无数据" />;
    if (!haveMoreData && questionList.length > 0)
      return <div>暂无更多数据</div>;
    return <div>开始加载下一页</div>;
  }, [loading, start, haveMoreData]);
  const { run: tryLoadMore } = useDebounceFn(
    () => {
      const elem = containerRef.current;
      if (elem === null) return;
      const domRect = elem.getBoundingClientRect();
      if (domRect === null) return;
      const { bottom } = domRect;
      if (bottom <= document.body.clientHeight) {
        loadQuestionList();
        setStart(true);
      }
    },
    {
      wait: 1000,
    }
  );
  // 1. 页面加载时 或者 url 参数变化时，触发加载
  useEffect(() => {
    tryLoadMore();
  }, [searchParams]);
  // 2. 滚动条到底部时，触发加载
  useEffect(() => {
    if (haveMoreData) {
      window.addEventListener("scroll", tryLoadMore);
    }
    return () => {
      window.removeEventListener("scroll", tryLoadMore);
    };
  }, [searchParams, haveMoreData]);

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
          questionList.map((item) => <QuestionCard key={item._id} {...item} />)}
      </div>
      <div className={styles.footer} ref={containerRef}>
        {loadMoreContentElem}
      </div>
    </>
  );
};

export default List;
