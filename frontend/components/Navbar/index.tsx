"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, MenuProps, message } from "antd";
import {
  IoCompassOutline,
  IoHomeOutline,
  IoAddOutline,
  IoLogOutOutline,
} from "react-icons/io5";
import { useAuth } from "@/contexts/auth";
import styles from "./navbar.module.scss";

const Navbar = () => {
  const { token, setToken } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [current, setCurrent] = useState(pathname);

  useEffect(() => {
    setCurrent(pathname);
  }, [pathname]);

  const items: MenuProps["items"] = [
    {
      label: <Link href="/">Home</Link>,
      icon: <IoCompassOutline />,
      key: "/",
    },
    {
      label: <Link href="/listings">Listings</Link>,
      icon: <IoHomeOutline />,
      key: "/listings",
    },
  ];

  const onClick: MenuProps["onClick"] = (e) => {
    if (e.key === "sign-out") {
      setToken(null);
      localStorage.removeItem("token");
      router.push("/");
      message.info("Logged out");
    } else {
      setCurrent(e.key);
    }
  };

  if (token) {
    items.push(
      {
        label: <Link href="/add-listing">Create</Link>,
        icon: <IoAddOutline />,
        key: "/add-listing",
      },
      {
        label: "Sign Out",
        icon: <IoLogOutOutline />,
        key: "sign-out",
      }
    );
  }

  return (
    <Menu
      onClick={onClick}
      mode="horizontal"
      selectedKeys={[current]}
      items={items}
      className={styles.menu}
    />
  );
};

export default Navbar;
