"use client";

import React from "react";
import type { Control, FieldPath } from "react-hook-form";
import { type z } from "zod";
import { authFormSchema } from "@/lib/utils";
import { Input } from "../ui/input";
import { FormControl, FormField, FormLabel, FormMessage } from "../ui/form";

const formSchema = authFormSchema();

interface AuthInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  control: Control<z.infer<typeof formSchema>>;
  name: FieldPath<z.infer<typeof formSchema>>;
  label: string;
  on_blur?: (event: React.FocusEvent<HTMLInputElement>) => void;
}

export function AuthInput({
  control,
  name,
  label,
  type = "text",
  placeholder,
  required = false,
  on_blur,
}: AuthInputProps) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <div className="form-item">
          <FormLabel className="form-label">{label}</FormLabel>
          <div className="flex w-full flex-col">
            <FormControl>
              <Input
                className="input-class"
                id={name}
                placeholder={placeholder}
                type={type}
                {...field}
                required={required}
                onBlur={on_blur}
              />
            </FormControl>
            <FormMessage className="form-message mt-2" />
          </div>
        </div>
      )}
    />
  );
}
