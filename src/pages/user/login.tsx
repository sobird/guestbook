/*
 * 用户登录
 *
 * sobird<i@sobird.me> at 2021/11/19 13:10:38 created.
 */

import { GetServerSidePropsContext } from "next";
import Head from "next/head";
import { signIn } from "next-auth/react";
import Layout from "@/components/Layout";
import axios from "@/lib/axios";

import { useForm } from "react-hook-form";

function login(data: any) {
  return axios.post("/api/user/login", data);
}

export default function UserLogin() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    resetField,
  } = useForm();

  const onFinish = async (values: any) => {
    const result = await signIn('credentials', {
      redirect: false,
      callbackUrl: 'https://sobird.me',
      ...values
    })

    login(values).then((res) => {
      // console.log(`res`, res);
    });
  };

  const onFinishFailed = (errorInfo: any) => {
    // console.log("Failed:", errorInfo);
  };

  return (
    <Layout>
      <Head>
        <title>Sign in</title>
      </Head>

      <h1>登录</h1>

      {/* <Form
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
      </Form> */}
    </Layout>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { req, res } = context;

  return {
    props: {},
  };
}
