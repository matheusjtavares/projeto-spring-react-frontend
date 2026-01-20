import styles from "../styles/Home.module.css";

const mockCars = [
  {
    id: 1,
    modelo: "Corolla",
    ano: 2022,
    cor: "Prata",
    cavalosDePotencia: 177,
    fabricante: "Toyota",
    pais: "Japão",
  },
  {
    id: 2,
    modelo: "Civic",
    ano: 2021,
    cor: "Preto",
    cavalosDePotencia: 158,
    fabricante: "Honda",
    pais: "Japão",
  },
  {
    id: 3,
    modelo: "Mustang",
    ano: 2023,
    cor: "Vermelho",
    cavalosDePotencia: 450,
    fabricante: "Ford",
    pais: "Estados Unidos",
  },
];

export default function Home() {
  return (
    <div className={styles.container}>
      {/* Header */}
      <header className={styles.header}>
        <h1>Cars Api</h1>
        <button className={styles.addButton}>Adicionar Carro</button>
      </header>

      {/* Description */}
      <p className={styles.description}>
        Lista de veículos cadastrados no sistema. Aqui você pode visualizar,
        editar ou remover registros de carros.
      </p>

      {/* Table */}
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
          {mockCars.map((car) => (
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
  );
}
