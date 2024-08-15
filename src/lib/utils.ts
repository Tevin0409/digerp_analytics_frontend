import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { z } from "zod";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const authFormSchema = () =>
  z
    .object({
      username: z
        .string({
          required_error: "Please Enter UserName.",
        })
        .min(1, {
          message: "Please enter valid username.",
        }),
      password: z.string({
        required_error: "Please Enter Password.",
      }),
    })
    .required();
