"use client";

import { ListingForm, NotAuthorizedDisplay } from "@/components";
import styles from "./addListing.module.scss";
import { useMutation } from "@tanstack/react-query";
import { createListing } from "@/api/listingRequests";
import { useAuth } from "@/contexts/auth";
import { message } from "antd";
import type { Listing } from "@/types";
import { useRouter } from "next/navigation";

const AddListingPage = () => {
  const { token } = useAuth();
  const router = useRouter();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (values: Listing) => createListing(values, token),
  });

  const handleSubmit = async (values: Listing) => {
    try {
      await mutateAsync(values);
      message.success("Listing successfully created!");
      router.push("/listings");
    } catch (error) {
      const errorMessage =
        (error as { message?: string }).message ||
        "Failed to create a listing. Please try again.";
      message.error(errorMessage);
    }
  };

  if (!token) {
    return <NotAuthorizedDisplay />;
  }

  return (
    <div className={styles.container}>
      <h1>Create a listing</h1>
      <ListingForm handleSubmit={handleSubmit} isPending={isPending} />
    </div>
  );
};

export default AddListingPage;
