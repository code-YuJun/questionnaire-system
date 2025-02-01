import { FC } from "react";
import { useTitle } from "ahooks";
import styles from "./Register.module.scss";
import type { FormProps } from "antd";
import { Button, Form, Input, Space, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useRequest } from "ahooks";
import { register } from "../service/user";
type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
  confirm?: string;
  nickname?: string;
};
const Register: FC = () => {
  useTitle("轻问卷-注册");
  const nav = useNavigate();
  const { run: registerRun } = useRequest(
    async (values: FieldType) => {
      const { username, password, nickname } = values;
      await register(username, password, nickname);
    },
    {
      manual: true,
      onSuccess: () => {
        message.success("注册成功");
        nav("/login");
      },
    }
  );
  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    registerRun(values);
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>注册</h2>
      <div className={styles.form}>
        <Form
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
            label="确认密码"
            name="confirm"
            dependencies={["password"]}
            rules={[
              { required: true, message: "请确认密码!" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("两次密码不一致!"));
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item<FieldType>
            label="昵称"
            name="nickname"
            rules={[{ required: true, message: "请输入昵称!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item label={null}>
            <Space>
              <Button type="primary" htmlType="submit">
                注册
              </Button>
              <Link to="/login">已有账号，去登录</Link>
            </Space>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};
export default Register;
