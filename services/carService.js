const API_BASE_URL = process.env.NEXT_PUBLIC_CARS_API;

export async function getCars() {
  const response = await fetch(`${API_BASE_URL}/api/carros/all`);

  if (!response.ok) {
    throw new Error("Erro ao buscar carros");
  }

  return response.json();
}

export async function createCar(car) {
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
export async function deleteCar(id){
    const response = await fetch(`${API_BASE_URL}/api/carros/${id}`, {
        method: "DELETE",
    });

    if (!response.ok) {
        throw new Error("Erro ao deletar carro");
    }

    return ;
}

export async function updateCar(editingCar,car){
  const response = await fetch(`${API_BASE_URL}/api/carros/${editingCar.id}`,{
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(car),
    }
  );

  if (!response.ok) {
    throw new Error('Erro ao atualizar carro');
  }

  return response.json();

}