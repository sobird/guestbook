import Head from "next/head";
import Layout from "@/components/Layout";
import axios from "@/lib/axios";
import { useForm } from "react-hook-form";
import useSWR, { mutate } from "swr";
import { Button, TextField, Box, Grid, styled } from "@mui/material";

function register(data: any) {
  return axios.post('/api/user/register', data);
}

const TextError = styled("div")(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  color: theme.palette.error.light,
}));

export default function UserRegister() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    resetField,
  } = useForm();


  const onSubmit = (values: any) => {
    
    // register(values).then(res => {
    // });
  };

  return (
    <Layout>
      <Head>
        <title>用户注册</title>
      </Head>

      <Box component="form" mb={3} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={12} display="flex" alignItems="center">
            <TextField
              autoFocus
              sx={{ width: "300px" }}
              variant="outlined"
              label="姓名"
              size="small"
              {...register("author", {
                maxLength: { value: 32, message: "too long" },
              })}
            />
            <TextError>
              {errors.email ? (errors.email.message as any) : "*"}
            </TextError>
          </Grid>
          <Grid item xs={12} display="flex" alignItems="center">
            <TextField
              type="email"
              sx={{ width: "300px" }}
              variant="outlined"
              label="邮箱"
              size="small"
              {...register("email", {
                required: "请输入邮箱",
                maxLength: { value: 64, message: "您输入的邮箱过长" },
              })}
              error={Boolean(errors.email)}
            />

            <TextError>
              {errors.email ? (errors.email.message as any) : "*"}
            </TextError>
          </Grid>
          <Grid item xs={12}>
            <TextField
              sx={{ width: "300px" }}
              variant="outlined"
              label="密码"
              type="password"
              size="small"
              {...register("url")}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              disableElevation
              size="small"
            >
              注册
            </Button>
          </Grid>
        </Grid>
      </Box>

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
          label="用户邮箱"
          name="email"
          rules={[{ required: true, message: "Please input your email!" }]}
        >
          <Input type="email" />
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
            Submit
          </Button>
        </Form.Item>
      </Form> */}
    </Layout>
  );
}
