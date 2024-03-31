"use client";

import { Button, Form, Input, InputNumber } from "antd";
import styles from "./ListingForm.module.scss";
import type { Listing } from "@/types";
import { useRouter } from "next/navigation";

type ListingFormProps = {
  handleSubmit: (values: Listing) => Promise<void>;
  isPending: boolean;
  existingValues?: Listing;
};

const validateMessages = {
  required: "${label} is required!",
  types: {
    email: "${label} is not a valid email!",
    number: "${label} is not a valid number!",
  },
  number: {
    range: "${label} must be between ${min} and ${max}",
  },
};

const ListingForm = ({
  handleSubmit,
  isPending,
  existingValues,
}: ListingFormProps) => {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <Form
        name="nest-messages"
        layout="vertical"
        onFinish={handleSubmit}
        validateMessages={validateMessages}
        initialValues={existingValues}
      >
        <Form.Item name="title" label="Title" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <div className={styles.row}>
          <Form.Item
            name="city"
            label="City"
            rules={[{ required: true }]}
            style={{ width: "100%" }}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="zip"
            label="Zip Code"
            rules={[{ type: "number", min: 1, max: 99999, required: true }]}
          >
            <InputNumber />
          </Form.Item>
        </div>

        <Form.Item
          name="address"
          label="Address"
          rules={[{ required: true }]}
          style={{ width: "100%" }}
        >
          <Input />
        </Form.Item>

        <div className={styles.row}>
          <Form.Item
            name="price"
            label="Price $"
            rules={[{ type: "number", min: 0, required: true }]}
          >
            <InputNumber />
          </Form.Item>

          <Form.Item
            name="rooms"
            label="Rooms"
            rules={[{ type: "number", min: 0, max: 1000, required: true }]}
          >
            <InputNumber />
          </Form.Item>

          <Form.Item
            name="bathrooms"
            label="Bathrooms"
            rules={[{ type: "number", min: 0, max: 99, required: true }]}
          >
            <InputNumber />
          </Form.Item>

          <Form.Item
            name="livingSqFt"
            label="Living Sq. ft."
            rules={[{ type: "number", min: 0, max: 10000, required: true }]}
          >
            <InputNumber />
          </Form.Item>
        </div>

        <Form.Item name="otherDetails" label="Other details">
          <Input.TextArea />
        </Form.Item>

        <Form.Item name="imgUrl" label="Image URL">
          <Input />
        </Form.Item>

        <div className={styles.row}>
          <Form.Item>
            <Button type="default" onClick={() => router.push("/listings")}>
              Cancel
            </Button>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={isPending}>
              Submit
            </Button>
          </Form.Item>
        </div>
      </Form>
    </div>
  );
};

export default ListingForm;
