import type { Listing } from "@/types";

export async function getListings() {
  try {
    const res = await fetch("http://localhost:8000/api/v1/listing/all");

    if (!res.ok) {
      const error = await res.json();
      throw { message: error.message, statusCode: res.status };
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function getListingById(id: string) {
  try {
    const res = await fetch(`http://localhost:8000/api/v1/listing/${id}`);

    if (!res.ok) {
      const error = await res.json();
      throw { message: error.message, statusCode: res.status };
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function createListing(values: Listing, token: string | null) {
  const res = await fetch("http://localhost:8000/api/v1/listing/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(values),
  });

  if (!res.ok) {
    const error = await res.json();
    throw { message: error.message, statusCode: res.status };
  }

  const data = await res.json();
  return data;
}

export async function editListing(
  values: Listing,
  id: string,
  token: string | null
) {
  const res = await fetch(`http://localhost:8000/api/v1/listing/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(values),
  });

  if (!res.ok) {
    const error = await res.json();
    throw { message: error.message, statusCode: res.status };
  }

  const data = await res.json();
  return data;
}

export async function deleteListing(id: string, token: string) {
  const res = await fetch(`http://localhost:8000/api/v1/listing/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const error = await res.json();
    throw { message: error.message, statusCode: res.status };
  }

  const data = await res.json();
  return data;
}
