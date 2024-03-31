"use client";

import { Button, Result } from "antd";
import { useRouter } from "next/navigation";

const ErrorDisplay = () => {
  const router = useRouter();
  return (
    <div className="full-page">
      <Result
        status="500"
        title="500"
        subTitle="Sorry, something went wrong."
        extra={
          <Button type="primary" onClick={() => router.push("/")}>
            Back Home
          </Button>
        }
      />
    </div>
  );
};

export default ErrorDisplay;
