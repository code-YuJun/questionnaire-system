/*
 * @Author: qiangyujun qiangyujun@jd.com
 * @Date: 2025-01-30 12:36:28
 * @LastEditors: qiangyujun qiangyujun@jd.com
 * @LastEditTime: 2025-01-30 12:59:38
 * @FilePath: /project/questionnaire-system/src/components/ListSearch.tsx
 * @Description: 搜索组件
 */
import { FC, useState } from "react";
import { Input } from "antd";
import styles from "./ListSearch.module.scss";
const { Search } = Input;
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";
const ListSearch: FC = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  const keyword = searchParams.get("keyword") || "";
  const [value, setValue] = useState(keyword);
  const handleSearch = (value: string) => {
    navigate(`${pathname}?keyword=${value}`);
    setSearchParams({ keyword: value });
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  return (
    <div className={styles.container}>
      <Search
        size="large"
        placeholder="请输入关键字"
        onSearch={handleSearch}
        style={{ width: 200 }}
        value={value}
        onChange={handleChange}
        allowClear
      />
    </div>
  );
};

export default ListSearch;
