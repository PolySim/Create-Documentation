"use server";

import { config } from "@/config/config";

export const createUser = async ({
  email,
  sub_id,
}: {
  email: string;
  sub_id: string;
}) => {
  try {
    const user = await fetch(`${config.API_URL}/users`, {
      method: "POST",
      body: JSON.stringify({ email, sub_id }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!user.ok) {
      throw new Error("Failed to create user");
    }

    return {
      success: true,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
    };
  }
};
