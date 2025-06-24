import { z } from "zod";

export const menuItemSchema = z.object({
  name: z.string().min(1, "Name is required"),
  restaurantId: z.number(),
  categoryId: z.number().min(1, "Category is required"),
  description: z.string().min(1, "Description is required"),
  ingredients: z.string().min(1, "Ingredients are required"),
  price: z.union([
    z.number().positive("Price must be positive"),
    z.string().regex(/^\d+(\.\d{1,2})?$/, "Invalid price format"),
  ]).transform((val) => (typeof val === "string" ? parseFloat(val) : val)),
  active: z.boolean().default(true),
}) 