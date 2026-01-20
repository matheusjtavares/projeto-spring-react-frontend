const API_BASE_URL = process.env.NEXT_PUBLIC_CARS_API;

export async function getCars() {
  const response = await fetch(`${API_BASE_URL}/api/carros/all`);

  if (!response.ok) {
    throw new Error("Erro ao buscar carros");
  }

  return response.json();
}

export async function createCar(car) {
    console.log('creating car')
    const response = await fetch(`${API_BASE_URL}/api/carros`, {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify(car),
    });

    if (!response.ok) {
        throw new Error("Erro ao criar carro");
    }

    return response.json();
}