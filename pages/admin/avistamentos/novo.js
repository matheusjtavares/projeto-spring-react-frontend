/* eslint-disable */
import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useRouter } from "next/router";

import AdminLayout from "/components/layout/AdminLayout.js";
import GridContainer from "/components/Grid/GridContainer.js";
import GridItem from "/components/Grid/GridItem.js";
import Card from "/components/Card/Card.js";
import CardBody from "/components/Card/CardBody.js";
import CardHeader from "/components/Card/CardHeader.js";
import CardFooter from "/components/Card/CardFooter.js";
import CustomInput from "/components/CustomInput/CustomInput.js";
import Button from "/components/CustomButtons/Button.js";

const UF_LIST = [
    "AC", "AL", "AP", "AM", "BA",
    "CE", "DF", "ES", "GO", "MA",
    "MT", "MS", "MG", "PA", "PB",
    "PR", "PE", "PI", "RJ", "RN",
    "RS", "RO", "RR", "SC", "SP",
    "SE", "TO"
];

const useStyles = makeStyles(() => ({
    pageTitle: {
        fontSize: "2rem",
        marginBottom: 4,
        color: "#e5e7eb",
    },
    pageSubtitle: {
        opacity: 0.8,
        marginBottom: 24,
        color: "#e5e7eb",
    },

    cardRoot: {
        background:
            "radial-gradient(circle at top left, rgba(37,99,235,0.15), rgba(15,23,42,0.95))",
        color: "#e5e7eb",
        boxShadow: "0 16px 40px rgba(0,0,0,0.65)",
        borderRadius: 18,
        width: "100%",
    },
    cardHeader: {
        borderBottom: "1px solid rgba(148,163,184,0.2)",
    },
    cardTitle: {
        margin: 0,
        fontSize: "1.2rem",
    },
    cardSubtitle: {
        margin: "4px 0 0 0",
        fontSize: "0.85rem",
        opacity: 0.8,
    },
    formRow: {
        marginBottom: 12,
    },
    smallLabel: {
        fontSize: "0.8rem",
        opacity: 0.75,
        marginBottom: 4,
    },
    select: {
        width: "100%",
        background: "rgba(15,23,42,0.9)",
        borderRadius: 8,
        border: "1px solid rgba(55,65,81,0.9)",
        padding: "10px 12px",
        color: "#e5e7eb",
        outline: "none",
        fontSize: "0.9rem",
    },
    textArea: {
        width: "100%",
        minHeight: 120,
        background: "rgba(15,23,42,0.9)",
        borderRadius: 8,
        border: "1px solid rgba(55,65,81,0.9)",
        padding: "10px 12px",
        color: "#e5e7eb",
        outline: "none",
        fontSize: "0.9rem",
        resize: "vertical",
    },
    footer: {
        display: "flex",
        justifyContent: "flex-end",
        gap: 12,
    },
}));

export default function NovoAvistamentoPage() {
    const classes = useStyles();
    const router = useRouter();

    const [form, setForm] = useState({
        dataHora: "",
        cidade: "",
        estado: "",
        tipoObjeto: "luz",
        confiabilidade: 50,
        descricao: "",
        lat: "",
        lon: "",
    });

    function updateField(field, value) {
        setForm((prev) => ({ ...prev, [field]: value }));
    }

    function handleSubmit(e) {
        e.preventDefault();

        // MOCK
        console.log("Novo avistamento MOCK cadastrado:", form);
        alert("Mock: avistamento cadastrado com sucesso 🚀");

        router.push("/admin/avistamentos");
    }

    function handleCancelar() {
        router.push("/admin/avistamentos");
    }

    return (
        <AdminLayout activeKey="avistamentos">
            <h1 className={classes.pageTitle}>Novo Avistamento</h1>
            <p className={classes.pageSubtitle}>
                Cadastre um novo registro de ocorrência observado pelo UFO Tracker.
            </p>

            {/* AGORA CENTRALIZADO E MAIS LARGO */}
            <GridContainer justify="center">
                <GridItem xs={12} md={10} lg={9}>
                    <Card className={classes.cardRoot}>
                        <CardHeader color="primary" className={classes.cardHeader}>
                            <h4 className={classes.cardTitle}>Dados do avistamento</h4>
                            <p className={classes.cardSubtitle}>
                                Preencha os campos abaixo. Por enquanto o envio é apenas
                                mockado.
                            </p>
                        </CardHeader>

                        <form onSubmit={handleSubmit}>
                            <CardBody>
                                <GridContainer>
                                    {/* DATA / HORA – agora usando datetime-local */}
                                    <GridItem xs={12} sm={6} className={classes.formRow}>
                                        <CustomInput
                                            labelText="Data / Hora"
                                            id="dataHora"
                                            formControlProps={{ fullWidth: true }}
                                            inputProps={{
                                                type: "datetime-local",
                                                value: form.dataHora,
                                                onChange: (e) =>
                                                    updateField("dataHora", e.target.value),
                                                style: { color: "#e5e7eb" },
                                            }}
                                        />
                                    </GridItem>

                                    <GridItem xs={8} sm={4} className={classes.formRow}>
                                        <CustomInput
                                            labelText="Cidade"
                                            id="cidade"
                                            formControlProps={{ fullWidth: true }}
                                            inputProps={{
                                                value: form.cidade,
                                                onChange: (e) =>
                                                    updateField("cidade", e.target.value),
                                            }}
                                        />
                                    </GridItem>

                                    {/* UF – agora select com todas as UFs */}
                                    <GridItem xs={4} sm={2} className={classes.formRow}>
                                        <div className={classes.smallLabel}>UF</div>
                                        <select
                                            className={classes.select}
                                            value={form.estado}
                                            onChange={(e) =>
                                                updateField("estado", e.target.value)
                                            }
                                        >
                                            <option value="">Selecione</option>
                                            {UF_LIST.map((uf) => (
                                                <option key={uf} value={uf}>
                                                    {uf}
                                                </option>
                                            ))}
                                        </select>
                                    </GridItem>

                                    <GridItem xs={12} sm={4} className={classes.formRow}>
                                        <div className={classes.smallLabel}>Tipo de objeto</div>
                                        <select
                                            className={classes.select}
                                            value={form.tipoObjeto}
                                            onChange={(e) =>
                                                updateField("tipoObjeto", e.target.value)
                                            }
                                        >
                                            <option value="luz">Luz</option>
                                            <option value="disco">Disco</option>
                                            <option value="triangulo">Triângulo</option>
                                            <option value="esfera">Esfera</option>
                                            <option value="outro">Outro</option>
                                        </select>
                                    </GridItem>

                                    <GridItem xs={12} sm={4} className={classes.formRow}>
                                        <CustomInput
                                            labelText="Confiabilidade (%)"
                                            id="confiabilidade"
                                            formControlProps={{ fullWidth: true }}
                                            inputProps={{
                                                type: "number",
                                                min: 0,
                                                max: 100,
                                                value: form.confiabilidade,
                                                onChange: (e) =>
                                                    updateField(
                                                        "confiabilidade",
                                                        Number(e.target.value)
                                                    ),
                                            }}
                                        />
                                    </GridItem>

                                    <GridItem xs={12} sm={4} className={classes.formRow}>
                                        <div className={classes.smallLabel}>Coordenadas</div>
                                        <GridContainer>
                                            <GridItem xs={6}>
                                                <CustomInput
                                                    labelText="Latitude"
                                                    id="lat"
                                                    formControlProps={{ fullWidth: true }}
                                                    inputProps={{
                                                        value: form.lat,
                                                        onChange: (e) =>
                                                            updateField("lat", e.target.value),
                                                    }}
                                                />
                                            </GridItem>
                                            <GridItem xs={6}>
                                                <CustomInput
                                                    labelText="Longitude"
                                                    id="lon"
                                                    formControlProps={{ fullWidth: true }}
                                                    inputProps={{
                                                        value: form.lon,
                                                        onChange: (e) =>
                                                            updateField("lon", e.target.value),
                                                    }}
                                                />
                                            </GridItem>
                                        </GridContainer>
                                    </GridItem>

                                    <GridItem xs={12} className={classes.formRow}>
                                        <div className={classes.smallLabel}>Descrição</div>
                                        <textarea
                                            className={classes.textArea}
                                            placeholder="Descreva o que foi observado: padrão de movimento, cor, sons, duração, testemunhas, etc."
                                            value={form.descricao}
                                            onChange={(e) =>
                                                updateField("descricao", e.target.value)
                                            }
                                        />
                                    </GridItem>
                                </GridContainer>
                            </CardBody>

                            <CardFooter className={classes.footer}>
                                <Button color="transparent" onClick={handleCancelar}>
                                    Cancelar
                                </Button>
                                <Button color="info" type="submit">
                                    Salvar avistamento (mock)
                                </Button>
                            </CardFooter>
                        </form>
                    </Card>
                </GridItem>
            </GridContainer>
        </AdminLayout>
    );
}
