import { InferInsertModel } from "drizzle-orm";
import { listings } from "../db/schema";

export const isValidListingDTO = (data: InferInsertModel<typeof listings>) => {
  const { title, city, address, zip, price, rooms, bathrooms } = data;

  if (!title || !city || !address || !zip || !price || !rooms) {
    return false;
  }

  if (
    typeof zip !== "number" ||
    typeof price !== "number" ||
    typeof rooms !== "number" ||
    (bathrooms && typeof bathrooms !== "number")
  ) {
    return false;
  }

  return true;
};
