import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import { getCars,createCar } from "../services/carService";
import AddCarModal from "../components/CreatedComponents/AddCarModal";

export default function Home() {
    // Initiate and get table items
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        loadCars();
    }, []);

    const loadCars = async () => {
        try {
            const data = await getCars();
            setCars(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
        }
    };
    // State for modal management
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const handleAddCar = async (car) => {
        try {
            await createCar(car);
            setIsAddModalOpen(false);
            loadCars(); // atualiza a lista
        } catch (err) {
            alert(err.message);
        }
    };
    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1>Cars Api</h1>
                <button
                className={styles.addButton}
                onClick={() => setIsAddModalOpen(true)}
                >
                    Adicionar Carro
                </button>
            </header>

            <p className={styles.description}>
                Lista de veículos cadastrados no sistema. Aqui você pode visualizar,
                editar ou remover registros de carros.
            </p>

            {loading && <p>Carregando carros...</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}

            {!loading && !error && (
                <div className={styles.tableWrapper}>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                            <th>ID</th>
                            <th>Modelo</th>
                            <th>Ano</th>
                            <th>Cor</th>
                            <th>Potência (cv)</th>
                            <th>Fabricante</th>
                            <th>País</th>
                            <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cars.map((car) => (
                            <tr key={car.id}>
                                <td>{car.id}</td>
                                <td>{car.modelo}</td>
                                <td>{car.ano}</td>
                                <td>{car.cor}</td>
                                <td>{car.cavalosDePotencia}</td>
                                <td>{car.fabricante}</td>
                                <td>{car.pais}</td>
                                <td className={styles.actions}>
                                <button className={styles.editButton}>Editar</button>
                                <button className={styles.deleteButton}>Deletar</button>
                                </td>
                            </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
            <AddCarModal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                onSave={handleAddCar}
            />
        </div>
        
    );
}
