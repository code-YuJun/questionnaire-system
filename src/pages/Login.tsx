import { FC, useEffect } from "react";
import styles from "./Login.module.scss";
import type { FormProps } from "antd";
import { Button, Form, Input, Space, Checkbox, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useTitle, useRequest } from "ahooks";
import { login } from "../service/user";
import { setToken } from "../utils";
type FieldType = {
  username?: string;
  password?: string;
  remember?: boolean;
};

// 用户名、密码
const USERNAME_KEY = "USERNAME";
const PASSWORD_KEY = "PASSWORD";

// 记住用户信息
function rememberUserInfo(username: string, password: string) {
  localStorage.setItem(USERNAME_KEY, username);
  localStorage.setItem(PASSWORD_KEY, password);
}

// 删除用户信息
function deleteUserInfo() {
  localStorage.removeItem(USERNAME_KEY);
  localStorage.removeItem(PASSWORD_KEY);
}

// 获取用户信息
function getUserInfo() {
  return {
    username: localStorage.getItem(USERNAME_KEY),
    password: localStorage.getItem(PASSWORD_KEY),
  };
}

const Login: FC = () => {
  useTitle("轻问卷-登录");
  const nav = useNavigate();
  const [form] = Form.useForm();
  // 判断本地是否有过存储
  useEffect(() => {
    const { username, password } = getUserInfo();
    form.setFieldsValue({
      username,
      password,
    });
  }, []);

  // 登录请求逻辑
  const { run: loginRun } = useRequest(
    (username: string, password: string) => login(username, password),
    {
      manual: true,
      onSuccess: (res) => {
        const { token = "" } = res;
        setToken(token);
        // 登录成功
        message.success("登录成功");
        nav("/manage/list");
      },
      onError: (error) => {
        message.error(error.message);
      },
    }
  );

  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    const { username, password, remember } = values;
    if (remember) {
      rememberUserInfo(username, password);
    } else {
      deleteUserInfo();
    }
    loginRun(username, password);
  };
  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    message.error(errorInfo.errorFields[0].errors[0]);
  };
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>登录</h2>
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
