/*
 * 用户登录
 * 
 * sobird<i@sobird.me> at 2021/11/19 13:10:38 created.
 */
import Head from "next/head";
import { Form, Input, Button, Checkbox } from "antd";

import Layout from "@/components/layout";
import axios from "@/lib/axios";

function login(data: any) {
  return axios.post('/api/user/login', data);
}

export default function UserLogin () {

  const onFinish = (values: any) => {
    console.log("Success:", values);

    login(values).then(res => {
      console.log(`res`, res)
    })
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Layout>
      <Head>
        <title>Sign in</title>
      </Head>

      <h1>登录</h1>

      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="用户名称"
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="登录密码"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="remember"
          valuePropName="checked"
          wrapperCol={{ offset: 8, span: 16 }}
        >
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            登录
          </Button>
        </Form.Item>
      </Form>
    </Layout>
  );
}
