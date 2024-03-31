import { Request, Response, Router } from "express";
import { db } from "../db";
import { listings } from "../db/schema";
import auth from "../middlewares/auth";
import { eq } from "drizzle-orm";
import { isValidListingDTO } from "../utils/validateData";

const router = Router();

router.get("/all", async (req: Request, res: Response) => {
  try {
    const listingData = await db.select().from(listings);
    res.status(200).send(listingData);
  } catch (error) {
    res.status(500);
  }
});

router.get("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const [listingData] = await db
      .select()
      .from(listings)
      .where(eq(listings.id, +id));
    res.status(200).send(listingData);
  } catch (error) {
    res.status(500);
  }
});

router.post("/", auth, async (req: Request, res: Response) => {
  try {
    if (!isValidListingDTO(req.body)) {
      return res.status(400).send({ message: "Invalid or missing fields" });
    }

    const newListing = await db
      .insert(listings)
      .values({
        ...req.body,
        authorId: req.user?.id,
      })
      .returning();

    res.status(201).send(newListing[0]);
  } catch (error) {
    res.status(500);
  }
});

router.put("/:id", auth, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const [listingData] = await db
      .select()
      .from(listings)
      .where(eq(listings.id, +id));

    if (!listingData) {
      return res.status(404).json({ message: `Listing id:${id} not found` });
    }

    const updatedListing = await db
      .update(listings)
      .set(req.body)
      .where(eq(listings.id, +id))
      .returning();

    res.status(201).send(updatedListing[0]);
  } catch (error) {
    res.status(500);
  }
});

router.delete("/:id", auth, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const [listingData] = await db
      .select()
      .from(listings)
      .where(eq(listings.id, +id));

    if (!listingData) {
      return res.status(404).json({ message: `Listing id:${id} not found` });
    }

    await db.delete(listings).where(eq(listings.id, +id));
    res.status(201).json({ message: "Listing deleted successfully" });
  } catch (error) {
    res.status(500);
  }
});

export default router;
