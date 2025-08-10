import z from "zod";

export const registerUserValidation = (data) => {
  const schema = z.object({
    name: z.string().min(3, "Name must be at least 3 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
  });

  return schema.safeParse(data);
};

export const loginUserValidation = (data) => {
  const schema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
  });

  return schema.safeParse(data);
};
