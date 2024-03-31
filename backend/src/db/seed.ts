import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { users, listings } from "./schema";
import * as schema from "./schema";
import { hashPassword } from "../utils/password";

const sql = neon(process.env.DATABASE_URL!);

const db = drizzle(sql, {
  schema,
});

const main = async () => {
  try {
    console.log("Seeding database...");

    // Delete all data
    await db.delete(listings);
    await db.delete(users);

    const pass = await hashPassword(process.env.ADMIN_PASSWORD!);

    // Insert admin credentials
    await db.insert(users).values([
      {
        id: 1,
        username: process.env.ADMIN_USERNAME!,
        password: pass,
      },
    ]);

    // Insert house listing data
    await db.insert(listings).values([
      {
        title: "Cozy Apartment in New York",
        city: "New York",
        address: "123 Main St",
        zip: 10001,
        price: 850000,
        rooms: 3,
        bathrooms: 2,
        livingSqFt: 1500,
        otherDetails: "Close to public transportation and parks",
        authorId: 1,
        imgUrl:
          "https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      },
      {
        title: "Modern Home in San Francisco",
        city: "San Francisco",
        address: "456 Market St",
        zip: 94103,
        price: 1200000,
        rooms: 4,
        bathrooms: 3,
        livingSqFt: 1800,
        otherDetails: "Modern kitchen and spacious backyard",
        authorId: 1,
        imgUrl:
          "https://lh3.googleusercontent.com/proxy/mnQ7D4BKeyQTs9sgkmVpYYQmB7sG10x3_WhM_yUhsGuck_RGCfPjUs0P_L3jN9YkszFvioq9JYzjQFxNOkPSxNC8k76EFfIzhYH3ZGD0usfd1diss_r42W4VkaiN4RK-KV7EF-lNacM2PMQoT8xX2hexJP4zY-5ez_FsviHAKY5gYb9vuZgnj_IwJFY",
      },
      {
        title: "Luxurious Condo in Los Angeles",
        city: "Los Angeles",
        address: "789 Sunset Blvd",
        zip: 90028,
        price: 950000,
        rooms: 3,
        bathrooms: 2,
        livingSqFt: 1600,
        otherDetails: "Gated community with pool access",
        authorId: 1,
        imgUrl:
          "https://images.unsplash.com/photo-1560184897-ae75f418493e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      },
      {
        title: "Charming Townhouse in Chicago",
        city: "Chicago",
        address: "101 North Ave",
        zip: 60610,
        price: 700000,
        rooms: 2,
        bathrooms: 2,
        livingSqFt: 1200,
        otherDetails: "Recently renovated with hardwood floors",
        authorId: 1,
        imgUrl:
          "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      },
      {
        title: "Beachfront Villa in Miami",
        city: "Miami",
        address: "202 Ocean Dr",
        zip: 33139,
        price: 800000,
        rooms: 3,
        bathrooms: 2,
        livingSqFt: 1400,
        otherDetails: "Oceanfront property with stunning views",
        authorId: 1,
        imgUrl:
          "https://www.locationlincoln.com/wp-content/uploads/sites/76/2020/01/House-at-Twilight-Background-Image-1080x675.jpg",
      },
      {
        title: "Spacious Family Home in Seattle",
        city: "Seattle",
        address: "303 Pine St",
        zip: 98101,
        price: 950000,
        rooms: 4,
        bathrooms: 3,
        livingSqFt: 2000,
        otherDetails: "Large backyard and open floor plan",
        authorId: 1,
        imgUrl:
          "https://images.unsplash.com/photo-1494526585095-c41746248156?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      },
      {
        title: "Elegant Apartment in Boston",
        city: "Boston",
        address: "404 Beacon St",
        zip: 12115,
        price: 1100000,
        rooms: 3,
        bathrooms: 2,
        livingSqFt: 1700,
        otherDetails: "Historic building with modern amenities",
        authorId: 1,
        imgUrl:
          "https://cdn.apartmenttherapy.info/image/upload/v1556716470/stock/e5c056378c11dd4a0c6b7602f268037621a72cd2.jpg",
      },
      {
        title: "Contemporary Loft in Austin",
        city: "Austin",
        address: "505 Congress Ave",
        zip: 78701,
        price: 750000,
        rooms: 2,
        bathrooms: 2,
        livingSqFt: 1400,
        otherDetails: "Industrial design with rooftop terrace",
        authorId: 1,
        imgUrl:
          "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      },
      {
        title: "Luxury Penthouse in Las Vegas",
        city: "Las Vegas",
        address: "606 Vegas Blvd",
        zip: 89109,
        price: 1300000,
        rooms: 3,
        bathrooms: 3,
        livingSqFt: 2100,
        otherDetails: "Panoramic city views and high-end finishes",
        authorId: 1,
        imgUrl:
          "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      },
      {
        title: "Cozy Cottage in Denver",
        city: "Denver",
        address: "707 Mountain Rd",
        zip: 80202,
        price: 650000,
        rooms: 2,
        bathrooms: 2,
        livingSqFt: 1300,
        otherDetails: "Quiet neighborhood with easy access to nature",
        authorId: 1,
        imgUrl:
          "https://images.unsplash.com/photo-1475855581690-80accde3ae2b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      },
    ]);

    console.log("Database seeded successfully");
  } catch (error) {
    console.error(error);
    throw new Error("Failed to seed database");
  }
};

main();
