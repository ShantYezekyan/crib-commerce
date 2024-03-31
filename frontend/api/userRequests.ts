import type { UserCredentials } from "@/types";

export async function signIn({ username, password }: UserCredentials) {
  const res = await fetch("http://localhost:8000/api/v1/user/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  if (!res.ok) {
    const error = await res.json();
    throw { message: error.message, statusCode: res.status };
  }

  const token = await res.json();
  return token;
}
