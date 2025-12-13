/* eslint-disable */
import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

import AdminLayout from "/components/layout/AdminLayout.js";
import Card from "/components/Card/Card.js";
import CardHeader from "/components/Card/CardHeader.js";
import CardBody from "/components/Card/CardBody.js";
import Button from "/components/CustomButtons/Button.js";
import CustomInput from "/components/CustomInput/CustomInput.js";
import { getGeoLocFromCity, getAvistamentosPorProximidade} from '../../services/AvistamentoElastic'
import dynamic from "next/dynamic";
const useStyles = makeStyles((theme) => ({
    inputWhite: {
        "& input": {
            color: "#fff !important",
        },
        "& input::placeholder": {
            color: "#cbd5e1 !important", // placeholder cinza claro
        },
        "& .MuiInput-underline:before": {
            borderBottomColor: "#64748b !important",
        },
        "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
            borderBottomColor: "#94a3b8 !important",
        },
        "& .MuiInput-underline:after": {
            borderBottomColor: "#38bdf8 !important", // azul neon futurista
        },
    },
    cardRoot: {
        background:
            "radial-gradient(circle at top left, rgba(37,99,235,0.15), rgba(15,23,42,0.95))",
        color: "#e5e7eb",
        boxShadow: "0 12px 30px rgba(0,0,0,0.55)",
    },
    cardHeader: {
        padding: "16px 24px",
        borderBottom: "1px solid rgba(148,163,184,0.2)",
    },
    cardTitle: {
        margin: 0,
        fontSize: "1.3rem",
        fontWeight: 500,
        letterSpacing: "0.08em",
        textTransform: "uppercase",
    },
    cardSubtitle: {
        margin: 0,
        fontSize: "0.8rem",
        opacity: 0.7,
    },
    formRow: {
        display: "flex",
        alignItems: "flex-end",
        gap: "12px",
        marginBottom: theme.spacing(2),
    },
    mapContainer: {
        marginTop: theme.spacing(2),
        borderRadius: 16,
        background:
            "radial-gradient(circle at top, rgba(56,189,248,0.12), rgba(15,23,42,1))",
        height: 380,
        position: "relative",
        overflow: "hidden",
        border: "1px solid rgba(148,163,184,0.4)",
    },
    mapGrid: {
        position: "absolute",
        inset: 0,
        backgroundImage:
            "linear-gradient(rgba(148,163,184,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.12) 1px, transparent 1px)",
        backgroundSize: "40px 40px",
        opacity: 0.3,
    },
    mapCenter: {
        position: "absolute",
        left: "50%",
        top: "50%",
        width: 10,
        height: 10,
        borderRadius: "50%",
        backgroundColor: "#22c55e",
        transform: "translate(-50%, -50%)",
        boxShadow: "0 0 18px rgba(34,197,94,0.9)",
    },
    marker: {
        position: "absolute",
        width: 14,
        height: 14,
        borderRadius: "50%",
        backgroundColor: "#38bdf8",
        boxShadow: "0 0 14px rgba(56,189,248,0.9)",
        cursor: "pointer",
        transform: "translate(-50%, -50%)",
    },
    markerLabel: {
        position: "absolute",
        top: -22,
        left: "50%",
        transform: "translateX(-50%)",
        fontSize: "0.7rem",
        whiteSpace: "nowrap",
        backgroundColor: "rgba(15,23,42,0.9)",
        padding: "2px 6px",
        borderRadius: 999,
        border: "1px solid rgba(148,163,184,0.5)",
    },
    listContainer: {
        marginTop: theme.spacing(2),
    },
    listItem: {
        fontSize: "0.85rem",
        padding: "4px 0",
        borderBottom: "1px solid rgba(31,41,55,0.7)",
    },
    listCidade: {
        fontWeight: 500,
    },
    listTipo: {
        opacity: 0.7,
    },
    listScore: {
        marginLeft: 8,
        fontSize: "0.75rem",
        padding: "1px 6px",
        borderRadius: 999,
        backgroundColor: "rgba(56,189,248,0.18)",
    },
    loadingOverlay: {
        position: "absolute",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background:
            "radial-gradient(circle at top, rgba(15,23,42,0.9), rgba(15,23,42,0.98))",
        zIndex: 3,
    },

    spinner: {
        width: 48,
        height: 48,
        borderRadius: "50%",
        border: "3px solid rgba(148,163,184,0.3)",
        borderTopColor: "#38bdf8",
        animation: "$spin 0.9s linear infinite",
    },

    loadingText: {
        marginTop: 12,
        fontSize: "0.85rem",
        color: "#e5e7eb",
        textAlign: "center",
        opacity: 0.9,
    },

    "@keyframes spin": {
        from: { transform: "rotate(0deg)" },
        to: { transform: "rotate(360deg)" },
    },
}));

// Mock de avistamentos com geo
const MOCK_AVISTAMENTOS = [
    {
        id: "a1",
        cidade: "Niterói",
        estado: "RJ",
        tipoObjeto: "disco",
        confiabilidade: 82,
        lat: -22.8832,
        lon: -43.1034,
        descricao: "Disco metálico sobre a baía de Guanabara.",
    },
    {
        id: "a2",
        cidade: "Niterói",
        estado: "RJ",
        tipoObjeto: "luz",
        confiabilidade: 64,
        lat: -22.89,
        lon: -43.11,
        descricao: "Luz pulsante movendo-se em zigue-zague.",
    },
    {
        id: "a3",
        cidade: "Rio de Janeiro",
        estado: "RJ",
        tipoObjeto: "triângulo",
        confiabilidade: 71,
        lat: -22.91,
        lon: -43.17,
        descricao: "Forma triangular silenciosa próxima ao Cristo.",
    },
    {
        id: "a4",
        cidade: "Recife",
        estado: "PE",
        tipoObjeto: "orbe",
        confiabilidade: 55,
        lat: -8.0476,
        lon: -34.877,
        descricao: "Orbe alaranjado sobre a orla.",
    },
];
const UfoPlainMap = dynamic(
    () => import("../../components/UfoMap/UfoPlainMap"),
    { ssr: false }
);
function MapaAvistamentosAdmin() {
    const classes = useStyles();

    const [cidadeBusca, setCidadeBusca] = useState("");
    const [center, setCenter] = useState(null); // { lat, lon }
    const [resultados, setResultados] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleLimpar = () => {
        setCidadeBusca("");
        setResultados([]);
        setCenter(null);
        setLoading(false);
    };
    function buscarAvistamentosPorCidadeMock(cidade) {
        const termo = cidade.trim().toLowerCase();

        return new Promise((resolve) => {
            setTimeout(() => {
                if (!termo) {
                    resolve({ center: null, resultados: [] });
                    return;
                }

                const filtrados = MOCK_AVISTAMENTOS.filter((a) =>
                    a.cidade.toLowerCase().includes(termo)
                );

                if (filtrados.length === 0) {
                    resolve({ center: null, resultados: [] });
                    return;
                }

                const { lat, lon } = filtrados[0];

                resolve({
                    center: { lat, lon },
                    resultados: filtrados,
                });
            }, 1200); // 1.2s de delay pra ficar com cara de requisição
        });
    }

    const handleBuscar = async (e) => {
        e.preventDefault();
        const cidade = await getGeoLocFromCity(cidadeBusca)
        const result = await getAvistamentosPorProximidade(cidade,200)
        console.log(result)
        setLoading(true);
        setResultados([]);
        setCenter(null);

        try {

            const cidade = await getGeoLocFromCity(cidadeBusca)
            const result = await getAvistamentosPorProximidade(cidade,200)
            console.log(cidade)

            setCenter({lat:cidade.lat, lon:cidade.lon});
            setResultados(result);
        } finally {
            setLoading(false);
        }
    };

    // funçãozinha pra transformar lat/lon em posição (mock total)
    const getMarkerPosition = (avistamento, index) => {
        if (!center) {
            return {
                left: "50%",
                top: "50%",
            };
        }

        const latDiff = avistamento.lat - center.lat; // ~graus
        const lonDiff = avistamento.lon - center.lon;

        // escala grosseira só pra espalhar no "mapa fake"
        const x = 50 + lonDiff * 800 + index * 3;
        const y = 50 - latDiff * 800 + index * 2;

        return {
            left: `${x}%`,
            top: `${y}%`,
        };
    };

    return (
        <AdminLayout>
            <Card className={classes.cardRoot}>


                <CardBody>
                    <form onSubmit={handleBuscar} className={classes.formRow}>
                        <CustomInput
                            labelText="Cidade"
                            id="cidade-busca"
                            formControlProps={{
                                fullWidth: true,
                                className: classes.inputWhite,   // ← AQUI
                            }}
                            inputProps={{
                                value: cidadeBusca,
                                onChange: (e) => setCidadeBusca(e.target.value),
                                placeholder: "Ex: Niterói, Recife...",
                            }}
                        />

                        <Button color="info" type="submit">
                            Buscar no mapa
                        </Button>
                        <Button
                            color="danger"
                            type="button"
                            onClick={handleLimpar}
                            style={{ marginLeft: 8 }}
                        >
                            Limpar
                        </Button>
                    </form>

                    <div className={classes.mapContainer}>
                        <UfoPlainMap center={center} resultados={resultados} />
                    </div>

                    <div className={classes.listContainer}>
                        {resultados.map((a) => (
                            <div key={a.id} className={classes.listItem}>
                <span className={classes.listCidade}>
                  {a.cidade} - {a.estado}
                </span>{" "}
                                <span className={classes.listTipo}>
                  ({a.tipoObjeto}) — {a.descricao}
                </span>
                                <span className={classes.listScore}>
                  Conf.: {a.confiabilidade}%
                </span>
                            </div>
                        ))}

                        {resultados.length === 0 && (
                            <div style={{ fontSize: "0.85rem", opacity: 0.7 }}>
                                Nenhum avistamento encontrado para essa cidade (no mock atual).
                            </div>
                        )}
                    </div>
                </CardBody>
            </Card>
        </AdminLayout>
    );
}

export default MapaAvistamentosAdmin;
