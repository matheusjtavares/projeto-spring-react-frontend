import styles from "./AddCarModal.module.css";

export default function AddCarModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2>Adicionar Carro</h2>

        <form className={styles.form}>
          <label>
            Modelo
            <input type="text" name="modelo" />
          </label>

          <label>
            Ano
            <input type="number" name="ano" />
          </label>

          <label>
            Cor
            <input type="text" name="cor" />
          </label>

          <label>
            Cavalos de Potência
            <input type="number" name="cavalosDePotencia" />
          </label>

          <label>
            Fabricante
            <input type="text" name="fabricante" />
          </label>

          <label>
            País
            <input type="text" name="pais" />
          </label>

          <div className={styles.actions}>
            <button type="button" onClick={onClose}>
              Cancelar
            </button>
            <button type="submit">Salvar</button>
          </div>
        </form>
      </div>
    </div>
  );
}
