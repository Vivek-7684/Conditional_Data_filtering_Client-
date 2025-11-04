import * as z from "zod";

export const productSchemaForFilter = z
  .object({
    name: z
      .string()
      .regex(/^[A-Za-z]+$/, { message: "only Alphabets are allowed" })
      .refine(
        (val) => {
          for (let i = 0; i < val.length; i++) {
            if (
              !(val[i] >= "A" && val[i] <= "Z") ||
              (val[i] >= "a" && val[i] <= "z")
            ) {
              return true;
            }
          }
          return false;
        },
        { message: "Only Alphabets are allowed." }
      )
      .min(3, "Aleast 3 Character Alphabet is required")
      .optional(),
    maxPrice: z.coerce
      .number("Max Price must be Number")
      .refine((val) => val >= 1000, {
        message: "Max Price must be at least 1000", // error if
      })
      .optional(),
    minPrice: z.coerce
      .number("Min Price must be Number")
      .refine((val) => val >= 500, {
        message: "Min Price must be at least 500",
      })
      .optional(),
    category: z
      .enum(["Electronics", "Cloth", "Accessories", "Sports"], {
        message:
          "Category like Electronics, Cloth, Accessories and Sports are only allowed",
      })
      .optional(),
  })
  .superRefine((data, ctx) => {
    if (data.minPrice >= data.maxPrice) {
      ctx.addIssue({
        code: "custom",
        message: "Min Price will less than Max Price",
        path: ["minPrice"],
      });
    }
  });
