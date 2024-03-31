"use client";

import { useParams, useRouter } from "next/navigation";
import { useQuery, useMutation } from "@tanstack/react-query";
import { message } from "antd";
import {
  ErrorDisplay,
  ListingForm,
  NotAuthorizedDisplay,
  Spinner,
} from "@/components";
import { editListing, getListingById } from "@/api/listingRequests";
import { useAuth } from "@/contexts/auth";
import styles from "./editListing.module.scss";
import type { Listing } from "@/types";

const EditListingPage = () => {
  const { id } = useParams<{ id: string }>();
  const { token } = useAuth();
  const router = useRouter();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["listingWithId", id],
    queryFn: () => getListingById(id),
  });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (values: Listing) => editListing(values, id, token),
  });

  const handleSubmit = async (values: Listing) => {
    try {
      await mutateAsync(values);
      message.success("Listing successfully edited!");
      router.push("/listings");
    } catch (error) {
      const errorMessage =
        (error as { message?: string }).message ||
        "Failed to edit listing. Please try again.";
      message.error(errorMessage);
    }
  };

  if (!token) {
    return <NotAuthorizedDisplay />;
  }

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <ErrorDisplay />;
  }

  return (
    <div className={styles.container}>
      <h1>Edit a listing</h1>
      <ListingForm
        existingValues={data}
        handleSubmit={handleSubmit}
        isPending={isPending}
      />
    </div>
  );
};

export default EditListingPage;
