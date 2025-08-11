"use client";

import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

type FormInputProps = {
  name: string;
  label?: string;
  description?: string;
  disabled?: boolean;
  type?: string;
  onChange?: (value: string) => void;
  onFilesChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  placeholder?: string;
  required?: boolean;
  multiple?: boolean;
  accept?: string;
};

const FormInput = ({
  name,
  label,
  description,
  disabled,
  onChange,
  onFilesChange,
  className,
  ...props
}: FormInputProps) => {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <Input
              disabled={disabled}
              {...field}
              onChange={(e) => {
                if (onFilesChange) {
                  onFilesChange(e);
                } else {
                  field.onChange(e);
                  onChange?.(e.target.value);
                }
              }}
              className={className}
              {...props}
            />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export { FormInput };
