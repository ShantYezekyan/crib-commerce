"use client";

import { Button, Form, type FormProps, Input, message } from "antd";
import styles from "./admin.module.scss";
import { signIn } from "@/api/userRequests";
import type { UserCredentials } from "@/types";
import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/auth";
import { useRouter } from "next/navigation";

const AdminLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { token, setToken } = useAuth();
  const router = useRouter();

  const onFinish: FormProps<UserCredentials>["onFinish"] = async (
    credentials
  ) => {
    setIsLoading(true);
    try {
      const { token } = await signIn(credentials);
      localStorage.setItem("token", token);
      setToken(token);
      message.success("Successfully logged in.");
      router.push("/");
    } catch (error) {
      const errorMessage =
        (error as { message?: string }).message ||
        "Login failed. Please try again.";
      message.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      router.push("/listings");
    }
  }, [token, router]);

  return (
    <div className={styles.container}>
      <h1>Login as Admin</h1>
      <Form
        name="admin-login"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
        layout="vertical"
      >
        <Form.Item<string>
          label="Username"
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input autoComplete="username" />
        </Form.Item>

        <Form.Item<string>
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password autoComplete="current-password" />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit" loading={isLoading}>
            Log in
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AdminLogin;
