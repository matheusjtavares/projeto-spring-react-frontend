const API_BASE_URL = process.env.NEXT_PUBLIC_CARS_API;

export async function postUser(user) {
  const response = await fetch(`${API_BASE_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

  if (!response.ok) {
    throw new Error("Unable to access with provided credentials");
  }

  return response;
}
