"use client";

import { Button, Result } from "antd";
import { useRouter } from "next/navigation";

const NotAuthorizedDisplay = () => {
  const router = useRouter();
  return (
    <div className="full-page">
      <Result
        status="403"
        title="403"
        subTitle="Sorry, you are not authorized to access this page."
        extra={
          <Button type="primary" onClick={() => router.push("/")}>
            Back Home
          </Button>
        }
      />
    </div>
  );
};

export default NotAuthorizedDisplay;
