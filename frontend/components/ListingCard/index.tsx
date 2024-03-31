"use client";

import Link from "next/link";
import Image from "next/image";
import { Card } from "antd";
import { BsDoorClosed } from "react-icons/bs";
import { LuBath } from "react-icons/lu";
import { TfiRuler } from "react-icons/tfi";
import { IoPricetagOutline } from "react-icons/io5";
import styles from "./ListingCard.module.scss";
import type { Listing } from "@/types";


type ListingCardProps = {
  details: Listing;
  showModal: (listing: Listing) => void;
};

const ListingCard = ({ details, showModal }: ListingCardProps) => {
  const { title, rooms, bathrooms, livingSqFt, price, imgUrl } = details;

  return (
    <Card
      hoverable
      onClick={() => showModal(details)}
      cover={
        <div className={styles.cardImage}>
          <Image
            priority
            src={imgUrl || "/default-house.jpg"}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 350px"
            style={{ objectFit: "cover" }}
          />
        </div>
      }
    >
      <Card.Meta title={title} />
      <div className={styles.cardInfo}>
        <div>
          <BsDoorClosed />
          <span>{rooms}</span>
        </div>
        <div>
          <LuBath />
          <span>{bathrooms}</span>
        </div>
        <div>
          <TfiRuler />
          <span>{livingSqFt + "sq. ft."}</span>
        </div>
        <div>
          <IoPricetagOutline />
          <span>{"$" + price}</span>
        </div>
      </div>
    </Card>
  );
};

export default ListingCard;
