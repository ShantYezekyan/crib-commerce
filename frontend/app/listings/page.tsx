"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteListing, getListings } from "@/api/listingRequests";
import { useAuth } from "@/contexts/auth";
import { useState } from "react";
import { Modal, message } from "antd";
import {
  ErrorDisplay,
  ListingCard,
  ListingDetails,
  Spinner,
} from "@/components";
import styles from "./Listings.module.scss";
import type { Listing } from "@/types";

const Listings = () => {
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedListing, setSelectedListing] = useState<Listing | null>(null);
  const { token } = useAuth();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["listings"],
    queryFn: getListings,
    staleTime: 10000,
  });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (id: string) => {
      if (!token) {
        throw new Error("Not authorized to delete listing.");
      }
      return deleteListing(id, token);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["listings"] });
    },
  });

  const handleDeleteListing = async (id: string) => {
    try {
      await mutateAsync(id);
      message.success("Listing successfully deleted!");
      setIsModalOpen(false);
    } catch (error) {
      const errorMessage =
        (error as { message?: string }).message ||
        "Failed to delete the listing. Please try again.";
      message.error(errorMessage);
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <ErrorDisplay />;
  }

  const showModal = (listing: Listing) => {
    setSelectedListing(listing);
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setSelectedListing(null);
  };

  return (
    <div className={styles.listingsPage}>
      <h1>Listings</h1>
      <h2>Check out what we have...</h2>
      <div className={styles.listingsGrid}>
        <Modal
          open={isModalOpen}
          onCancel={handleCancel}
          width="80%"
          footer={null}
        >
          {selectedListing && (
            <ListingDetails
              info={selectedListing}
              showAdminTools={!!token}
              handleDeleteListing={handleDeleteListing}
            />
          )}
        </Modal>
        {data &&
          data.map((listing: Listing) => {
            return (
              <ListingCard
                key={listing.id}
                showModal={showModal}
                details={listing}
              />
            );
          })}
      </div>
    </div>
  );
};

export default Listings;
