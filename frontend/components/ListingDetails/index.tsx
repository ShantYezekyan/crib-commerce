import { Listing } from "@/types";
import Image from "next/image";
import React from "react";
import { BsDoorClosed } from "react-icons/bs";
import { TfiRuler } from "react-icons/tfi";
import { IoLocationOutline, IoPricetagOutline } from "react-icons/io5";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import styles from "./ListingDetails.module.scss";
import { LuBath } from "react-icons/lu";
import { Button } from "antd";
import { useRouter } from "next/navigation";

type ListingDetailsProps = {
  info: Listing;
  showAdminTools: boolean;
  handleDeleteListing: (id: string) => Promise<void>;
};

const ListingDetails = ({
  info: {
    id,
    title,
    city,
    address,
    zip,
    price,
    rooms,
    bathrooms,
    livingSqFt,
    otherDetails,
    imgUrl,
  },
  showAdminTools,
  handleDeleteListing,
}: ListingDetailsProps) => {
  const router = useRouter();
  return (
    <div className={styles.modalBody}>
      <div className={styles.previewImage}>
        <Image
          priority
          src={imgUrl || "/default-house.jpg"}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 350px"
          style={{ objectFit: "cover" }}
        />
      </div>
      <div className={styles.detailsContainer}>
        <h2>{title}</h2>
        {showAdminTools && (
          <div className={styles.adminTools}>
            <Button
              icon={<FiEdit />}
              type="primary"
              onClick={() => router.push(`/edit-listing/${id}`)}
            >
              Edit
            </Button>
            <Button
              icon={<FiTrash2 />}
              danger
              onClick={() => handleDeleteListing(`${id}`)}
            >
              Delete
            </Button>
          </div>
        )}
        <div className={styles.info}>
          <div className={styles.location}>
            <span>
              <IoLocationOutline />
              {city}
            </span>
            <span>{address}</span>
            <span>{zip}</span>
          </div>
          <div className={styles.other}>
            <span>
              <IoPricetagOutline />${price}
            </span>
            <span>
              <BsDoorClosed />
              {rooms} rooms
            </span>
            <span>
              <LuBath />
              {bathrooms} bathrooms
            </span>
            <span>
              <TfiRuler />
              {livingSqFt} sq. ft.
            </span>
          </div>
        </div>
        <p>{otherDetails}</p>
      </div>
    </div>
  );
};

export default ListingDetails;
