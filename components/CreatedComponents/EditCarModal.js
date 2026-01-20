import { useEffect, useState } from "react";
import styles from "./EditCarModal.module.css";

const initialFormState = {
    modelo: "",
    ano: "",
    cor: "",
    cavalosDePotencia: "",
    fabricante: "",
    pais: "",
};

export default function EditCarModal({ isOpen, onClose, onSave,editingCar }) {
    const [formData, setFormData] = useState(initialFormState);
    const [errors, setErrors] = useState({});
    useEffect(() => {
        if (editingCar) {
            setFormData({
                modelo: editingCar.modelo,
                ano: editingCar.ano,
                cor: editingCar.cor,
                cavalosDePotencia: editingCar.cavalosDePotencia,
                fabricante: editingCar.fabricante,
                pais: editingCar.pais,
            });
        } else {
            setFormData(initialFormState);
        }
    }, [editingCar]);

    if (!isOpen) return null;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const validate = () => {
        const newErrors = {};

        if (!formData.modelo.trim()) newErrors.modelo = "Modelo é obrigatório";
        if (!formData.cor.trim()) newErrors.cor = "Cor é obrigatória";
        if (!formData.fabricante.trim())
        newErrors.fabricante = "Fabricante é obrigatório";
        if (!formData.pais.trim()) newErrors.pais = "País é obrigatório";

        if (!formData.ano || Number(formData.ano) <= 0)
        newErrors.ano = "Ano deve ser maior que zero";

        if (
            !formData.cavalosDePotencia ||
            Number(formData.cavalosDePotencia) <= 0
        )
        newErrors.cavalosDePotencia =
            "Cavalos de potência deve ser maior que zero";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validate()) return;
        console.log('validating...')
        onSave({
            ...formData,
            ano: Number(formData.ano),
            cavalosDePotencia: Number(formData.cavalosDePotencia),
        });
    };

    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <h2>Adicionar Carro</h2>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <label>
                        Modelo
                        <input
                        name="modelo"
                        value={formData.modelo}
                        onChange={handleChange}
                        />
                        {errors.modelo && (
                        <span className={styles.error}>{errors.modelo}</span>
                        )}
                    </label>

                    <label>
                        Ano
                        <input
                        type="number"
                        name="ano"
                        value={formData.ano}
                        onChange={handleChange}
                        />
                        {errors.ano && (
                        <span className={styles.error}>{errors.ano}</span>
                        )}
                    </label>

                    <label>
                        Cor
                        <input
                        name="cor"
                        value={formData.cor}
                        onChange={handleChange}
                        />
                        {errors.cor && (
                        <span className={styles.error}>{errors.cor}</span>
                        )}
                    </label>

                    <label>
                        Cavalos de Potência
                        <input
                        type="number"
                        name="cavalosDePotencia"
                        value={formData.cavalosDePotencia}
                        onChange={handleChange}
                        />
                        {errors.cavalosDePotencia && (
                        <span className={styles.error}>
                            {errors.cavalosDePotencia}
                        </span>
                        )}
                    </label>

                    <label>
                        Fabricante
                        <input
                        name="fabricante"
                        value={formData.fabricante}
                        onChange={handleChange}
                        />
                        {errors.fabricante && (
                        <span className={styles.error}>{errors.fabricante}</span>
                        )}
                    </label>

                    <label>
                        País
                        <input
                        name="pais"
                        value={formData.pais}
                        onChange={handleChange}
                        />
                        {errors.pais && (
                        <span className={styles.error}>{errors.pais}</span>
                        )}
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
