const API_BASE_URL = process.env.NEXT_PUBLIC_CARS_API;

export async function getCars() {
  const response = await fetch(`${API_BASE_URL}/api/carros`);

  if (!response.ok) {
    throw new Error("Erro ao buscar carros");
  }

  return response.json();
}