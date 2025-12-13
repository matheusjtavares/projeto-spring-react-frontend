// pages/index.js
import React, { useState } from "react";
import { useRouter } from "next/router";

import DOMPurify from "dompurify";
import CustomInput from "../components/CustomInput/CustomInput.js";
import Button from "../components/CustomButtons/Button.js";
import Card from "../components/Card/Card.js";
import CardBody from "../components/Card/CardBody.js";
import { getAvistamentoElastic } from '../services/AvistamentoElastic';

export default function HomePage() {
    const router = useRouter();

    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [expandedId, setExpandedId] = useState(null);

    const MOCK_DATA = [
        {
            cidade: "Recife",
            estado: "PE",
            tipoObjeto: "luz",
            confiabilidade: 47,
            descricao:
                "Objeto luminoso realizando deslocamento abrupto no céu, sem ruído.",
            id: "b30d8d97-e9e0-4db5-a61d-8841362df3f9"
        },
        {
            cidade: "Niteroi",
            estado: "RJ",
            tipoObjeto: "disco",
            confiabilidade: 72,
            descricao:
                "Disco metálico realizando manobras incomuns, emitindo luz pulsante intensa.",
            id: "b1e66196-05c3-40ee-96e7-07d4be6ab313"
        }
    ];
    function toggleExpand(id) {
        setExpandedId((prev) => (prev === id ? null : id));
    }
    function handleClear() {
        setQuery("");
        setResults([]);
        setExpandedId(null);
    }

    async function handleSearch(e) {
        e.preventDefault();
        const data =  await getAvistamentoElastic(query);
        console.log("data", data);
        setResults(
            [...data].sort((a, b) => a.score- b.score),
        );

        // fecha tudo ao fazer nova busca
        setExpandedId(null);
    }

    function goToAdmin() {
        router.push("/admin");
    }

    return (
        <div
            style={{
                minHeight: "100vh",
                background: "#fafafa",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                paddingTop: "80px"
            }}
        >
            {/* Botão redondo com ícone - canto superior direito */}
            <button
                onClick={goToAdmin}
                style={{
                    position: "fixed",
                    top: "20px",
                    right: "20px",
                    width: "55px",
                    height: "55px",
                    borderRadius: "50%",
                    backgroundColor: "#9c27b0",
                    border: "none",
                    color: "white",
                    cursor: "pointer",
                    boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
                    fontSize: "26px"
                }}
            >
                <span className="material-icons">person</span>
            </button>

            {/* Título */}
            <div style={{ textAlign: "center", marginBottom: "30px" }}>
                <h1 style={{ fontSize: "4rem" }}>UFO Search</h1>
                <p style={{ fontSize: "1.1rem", color: "#666" }}>
                    Buscas intergalácticas instantâneas 👽
                </p>
            </div>

            {/* CONTAINER PRINCIPAL – ocupa a largura toda */}
            <div
                style={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center"
                }}
            >
                {/* Form de busca */}
                <form
                    onSubmit={handleSearch}
                    style={{
                        width: "100%",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center"
                    }}
                >
                    {/* Barra de busca gigante */}
                    <div
                        style={{
                            width: "100%",
                            display: "flex",
                            justifyContent: "center",
                            marginBottom: "25px"
                        }}
                    >
                        <input
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Digite sua busca..."
                            style={{
                                width: "90%",          // usa 90% da tela
                                maxWidth: "800px",     // mas limita pra não ficar escandaloso em tela gigante
                                height: "65px",
                                padding: "0 25px",
                                fontSize: "1.6rem",
                                borderRadius: "50px",
                                border: "1px solid #ddd",
                                background: "white",
                                outline: "none",
                                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                                transition: "0.2s"
                            }}
                            onFocus={(e) => {
                                e.target.style.boxShadow = "0 4px 12px rgba(0,0,0,0.18)";
                            }}
                            onBlur={(e) => {
                                e.target.style.boxShadow = "0 2px 8px rgba(0,0,0,0.1)";
                            }}
                        />
                    </div>

                    {/* Botões */}
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <Button
                            type="submit"
                            color="info"
                            style={{
                                padding: "14px 40px",
                                fontSize: "1.2rem",
                                borderRadius: "8px"
                            }}
                        >
                            Buscar
                        </Button>


                    </div>

                </form>

                {/* Resultados */}

                {results.length > 0 && (
                    <Card
                        style={{
                            marginTop: "40px",
                            width: "90%",
                            maxWidth: "800px",
                            borderRadius: "12px"
                        }}
                    >
                        <CardBody>
                            <div
                                style={{
                                    marginBottom: "16px",
                                    color: "#5f6368",
                                    fontSize: "0.9rem"
                                }}
                            >
                                {results.length} resultado(s) encontrado(s)
                            </div>

                            {results.map((item, index) => {
                                const urlFake = `ufo.tracker/avistamentos/${item.id}`;
                                const isOpen = expandedId === item.id;
                                const safeHtml = DOMPurify.sanitize(item.descricaoFormatada);
                                return (
                                    <div
                                        key={item.id}
                                        style={{
                                            marginBottom: index === results.length - 1 ? "0" : "20px",
                                            paddingBottom: index === results.length - 1 ? "0" : "20px",
                                            borderBottom:
                                                index === results.length - 1
                                                    ? "none"
                                                    : "1px solid #eee"
                                        }}
                                    >
                                        {/* URL estilo Google */}
                                        <div
                                            style={{
                                                color: "#5f6368",
                                                fontSize: "0.85rem",
                                                marginBottom: "2px"
                                            }}
                                        >
                                            {urlFake}
                                        </div>

                                        {/* Título clicável */}
                                        <button
                                            type="button"
                                            onClick={() => toggleExpand(item.id)}
                                            style={{
                                                background: "transparent",
                                                border: "none",
                                                padding: 0,
                                                margin: 0,
                                                cursor: "pointer",
                                                textAlign: "left"
                                            }}
                                        >
                      <span
                          style={{
                              fontSize: "1.3rem",
                              color: "#1a0dab",
                              textDecoration: isOpen ? "underline" : "none",
                              fontWeight: 500
                          }}
                      >
                        Avistamento em {item.cidade} - {item.estado}
                      </span>
                                        </button>

                                        {/* Metadados compactos logo abaixo do título */}
                                        <div
                                            style={{
                                                marginTop: "4px",
                                                fontSize: "0.85rem",
                                                color: "#70757a"
                                            }}
                                        >
                                            Tipo: <strong>{item.tipoObjeto}</strong>{" "}
                                            <span style={{ marginLeft: "8px" }}>
                        • Confiabilidade:{" "}
                                                <span
                                                    style={{
                                                        padding: "2px 6px",
                                                        borderRadius: "12px",
                                                        background:
                                                            item.confiabilidade >= 60
                                                                ? "rgba(76, 175, 80, 0.12)"
                                                                : "rgba(255, 152, 0, 0.12)",
                                                        color:
                                                            item.confiabilidade >= 60 ? "#2e7d32" : "#e65100"
                                                    }}
                                                >
                          {item.confiabilidade}%
                        </span>
                      </span>
                                        </div>

                                        {/* Detalhes só aparecem quando clica */}
                                        {isOpen && (
                                            <div
                                                style={{
                                                    marginTop: "8px",
                                                    color: "#4d5156",
                                                    fontSize: "0.95rem",
                                                    lineHeight: 1.5
                                                }}
                                            >
                                                <p dangerouslySetInnerHTML={{ __html: safeHtml }} />
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </CardBody>
                    </Card>
                )}

                {/* Mensagem quando não há resultados */}
                {results.length === 0 && (
                    <p
                        style={{
                            marginTop: "40px",
                            textAlign: "center",
                            color: "#888",
                            fontSize: "1rem"
                        }}
                    >
                        Digite algo acima e clique em &quot;Buscar&quot; para ver
                        avistamentos.
                    </p>
                )}
            </div>
        </div>
    );
}
