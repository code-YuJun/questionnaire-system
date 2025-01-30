/*
 * @Author: qiangyujun qiangyujun@jd.com
 * @Date: 2025-01-27 17:03:19
 * @LastEditors: qiangyujun qiangyujun@jd.com
 * @LastEditTime: 2025-01-30 14:46:04
 * @FilePath: /project/questionnaire-system/src/pages/Login.tsx
 * @Description: 登录页
 */
import { FC, useEffect } from "react";
import styles from "./Login.module.scss";
import type { FormProps } from "antd";
import { Button, Form, Input, Space, Checkbox } from "antd";
import { Link } from "react-router-dom";
import { useTitle } from "ahooks";
type FieldType = {
  username?: string;
  password?: string;
  remember?: boolean;
};
const USERNAME_KEY = "USERNAME";
const PASSWORD_KEY = "PASSWORD";

function rememberUserInfo(values: FieldType) {
  localStorage.setItem(USERNAME_KEY, values.username || "");
  localStorage.setItem(PASSWORD_KEY, values.password || "");
}
function deleteUserInfo() {
  localStorage.removeItem(USERNAME_KEY);
  localStorage.removeItem(PASSWORD_KEY);
}
function getUserInfo() {
  return {
    username: localStorage.getItem(USERNAME_KEY),
    password: localStorage.getItem(PASSWORD_KEY),
  };
}
const Login: FC = () => {
  useTitle("登录页面");
  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    if (values.remember) {
      rememberUserInfo(values);
    } else {
      deleteUserInfo();
    }
  };
  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };
  const [form] = Form.useForm();
  useEffect(() => {
    const { username, password } = getUserInfo();
    form.setFieldsValue({
      username,
      password,
    });
  }, []);
  return (
    <div className={styles.container}>
      <h3 className={styles.title}>用户登录</h3>
      <div className={styles.form}>
        <Form
          form={form}
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item<FieldType>
            label="用户名"
            name="username"
            rules={[
              { required: true, message: "请输入用户名!" },
              {
                type: "string",
                min: 5,
                max: 20,
                message: "用户名长度为5-20位",
              },
              {
                pattern: /^[a-zA-Z0-9]+$/,
                message: "用户名只能包含字母和数字",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label="密码"
            name="password"
            rules={[{ required: true, message: "请输入密码!" }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item<FieldType>
            name="remember"
            valuePropName="checked"
            label={null}
          >
            <Checkbox>记住我</Checkbox>
          </Form.Item>
          <Form.Item label={null}>
            <Space>
              <Button type="primary" htmlType="submit">
                登录
              </Button>
              <Link to="/register">没有账号，去注册</Link>
            </Space>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};
export default Login;
