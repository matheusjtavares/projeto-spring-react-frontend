/* eslint-disable */
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import dynamic from "next/dynamic";

import AdminLayout from "/components/layout/AdminLayout.js";
import GridContainer from "/components/Grid/GridContainer.js";
import GridItem from "/components/Grid/GridItem.js";
import Card from "/components/Card/Card.js";
import CardBody from "/components/Card/CardBody.js";

// Nivo + Next.js (evita window is not defined)
const ResponsiveBar = dynamic(
    () => import("@nivo/bar").then((m) => m.ResponsiveBar),
    { ssr: false }
);
const ResponsiveLine = dynamic(
    () => import("@nivo/line").then((mnpm ) => m.ResponsiveLine),
    { ssr: false }
);
const ResponsivePie = dynamic(
    () => import("@nivo/pie").then((m) => m.ResponsivePie),
    { ssr: false }
);

const useStyles = makeStyles((theme) => ({
    title: {
        fontSize: "2.4rem",
        marginBottom: 6,
        color: "#f9fafb",
    },
    subtitle: {
        opacity: 0.8,
        marginBottom: 28,
        color: "#e5e7eb",
    },

    // Cards de métrica
    metricCard: {
        background:
            "radial-gradient(circle at top left, rgba(56,189,248,0.18), rgba(15,23,42,0.98))",
        color: "#e5e7eb",
        borderRadius: 16,
        padding: "18px 20px",
        boxShadow: "0 10px 26px rgba(0,0,0,0.6)",
        height: "100%",
    },
    metricLabel: {
        fontSize: "0.8rem",
        textTransform: "uppercase",
        letterSpacing: "0.16em",
        opacity: 0.7,
        marginBottom: 6,
    },
    metricValue: {
        fontSize: "1.8rem",
        fontWeight: 600,
    },
    metricTrend: {
        fontSize: "0.8rem",
        marginTop: 4,
        opacity: 0.9,
    },

    // Cards de gráfico
    chartCard: {
        background:
            "radial-gradient(circle at top, rgba(37,99,235,0.2), rgba(3,7,18,0.98))",
        color: "#e5e7eb",
        borderRadius: 16,
        boxShadow: "0 10px 26px rgba(0,0,0,0.6)",
        height: "100%",
    },
    chartBody: {
        padding: "18px 20px 20px",
    },
    chartTitle: {
        fontSize: "1rem",
        marginBottom: 4,
    },
    chartSubtitle: {
        fontSize: "0.8rem",
        opacity: 0.7,
        marginBottom: 12,
    },
    chartContainer: {
        width: "100%",
        height: 260,
    },

    // Pie pode ser um pouco menor
    pieContainer: {
        width: "100%",
        height: 260,
    },
}));

// Tema dark pro Nivo casar com o UFO Tracker
const nivoTheme = {
    textColor: "#e5e7eb",
    fontSize: 11,
    axis: {
        domain: {
            line: {
                stroke: "#4b5563",
                strokeWidth: 1,
            },
        },
        ticks: {
            line: {
                stroke: "#4b5563",
                strokeWidth: 1,
            },
            text: {
                fill: "#9ca3af",
            },
        },
        legend: {
            text: {
                fill: "#e5e7eb",
            },
        },
    },
    grid: {
        line: {
            stroke: "rgba(55,65,81,0.5)",
            strokeWidth: 1,
        },
    },
    legends: {
        text: {
            fill: "#e5e7eb",
        },
    },
    tooltip: {
        container: {
            background: "#020617",
            color: "#e5e7eb",
            fontSize: 12,
            borderRadius: 8,
            boxShadow: "0 10px 30px rgba(0,0,0,0.7)",
        },
    },
};

function DashboardPage() {
    const classes = useStyles();

    // MOCK DATA
    const dataPorTipo = [
        { tipo: "Luz", avistamentos: 68 },
        { tipo: "Disco", avistamentos: 44 },
        { tipo: "Triângulo", avistamentos: 23 },
        { tipo: "Esfera", avistamentos: 17 },
    ];

    const dataTimeline = [
        { x: "00h", y: 2 },
        { x: "03h", y: 4 },
        { x: "06h", y: 3 },
        { x: "09h", y: 6 },
        { x: "12h", y: 5 },
        { x: "15h", y: 9 },
        { x: "18h", y: 7 },
        { x: "21h", y: 10 },
    ];

    const dataConfiabilidade = [
        { id: "Alta", label: "Alta", value: 12 },
        { id: "Média", label: "Média", value: 21 },
        { id: "Baixa", label: "Baixa", value: 7 },
    ];

    return (
        <AdminLayout activeKey="dashboard">
            <h1 className={classes.title}>Dashboard</h1>
            <p className={classes.subtitle}>
                Visão geral dos avistamentos e da atividade recente do UFO Tracker.
            </p>

            {/* Métricas principais */}
            <GridContainer>
                <GridItem xs={12} sm={6} md={3}>
                    <Card className={classes.metricCard}>
                        <div className={classes.metricLabel}>Avistamentos hoje</div>
                        <div className={classes.metricValue}>12</div>
                        <div className={classes.metricTrend}>
                            +3 em relação à média diária
                        </div>
                    </Card>
                </GridItem>

                <GridItem xs={12} sm={6} md={3}>
                    <Card className={classes.metricCard}>
                        <div className={classes.metricLabel}>Avistamentos no mês</div>
                        <div className={classes.metricValue}>284</div>
                        <div className={classes.metricTrend}>
                            +18% vs. mês anterior
                        </div>
                    </Card>
                </GridItem>

                <GridItem xs={12} sm={6} md={3}>
                    <Card className={classes.metricCard}>
                        <div className={classes.metricLabel}>Confiabilidade média</div>
                        <div className={classes.metricValue}>63%</div>
                        <div className={classes.metricTrend}>
                            9 casos classificados como alta confiabilidade
                        </div>
                    </Card>
                </GridItem>

                <GridItem xs={12} sm={6} md={3}>
                    <Card className={classes.metricCard}>
                        <div className={classes.metricLabel}>Alertas críticos</div>
                        <div className={classes.metricValue}>4</div>
                        <div className={classes.metricTrend}>
                            Último há 17 minutos em Niterói – RJ
                        </div>
                    </Card>
                </GridItem>
            </GridContainer>

            {/* Linha de gráficos */}
            <GridContainer style={{ marginTop: 28 }}>
                {/* Avistamentos por tipo */}
                <GridItem xs={12} md={4}>
                    <Card className={classes.chartCard}>
                        <CardBody className={classes.chartBody}>
                            <div className={classes.chartTitle}>Avistamentos por tipo</div>
                            <div className={classes.chartSubtitle}>
                                Distribuição dos últimos 30 dias
                            </div>

                            <div className={classes.chartContainer}>
                                <ResponsiveBar
                                    data={dataPorTipo}
                                    keys={["avistamentos"]}
                                    indexBy="tipo"
                                    theme={nivoTheme}
                                    margin={{ top: 20, right: 20, bottom: 40, left: 40 }}
                                    padding={0.3}
                                    valueScale={{ type: "linear" }}
                                    indexScale={{ type: "band", round: true }}
                                    colors={{ scheme: "blues" }}
                                    borderRadius={4}
                                    axisTop={null}
                                    axisRight={null}
                                    axisBottom={{
                                        tickSize: 5,
                                        tickPadding: 5,
                                        tickRotation: 0,
                                        legend: "",
                                        legendOffset: 32,
                                        legendPosition: "middle",
                                    }}
                                    axisLeft={{
                                        tickSize: 5,
                                        tickPadding: 5,
                                        tickRotation: 0,
                                        legend: "avistamentos",
                                        legendOffset: -32,
                                        legendPosition: "middle",
                                    }}
                                    enableLabel={false}
                                    animate={true}
                                    motionConfig="gentle"
                                    role="application"
                                    ariaLabel="Gráfico de barras de avistamentos por tipo"
                                />
                            </div>
                        </CardBody>
                    </Card>
                </GridItem>

                {/* Linha do tempo de avistamentos */}
                <GridItem xs={12} md={4}>
                    <Card className={classes.chartCard}>
                        <CardBody className={classes.chartBody}>
                            <div className={classes.chartTitle}>
                                Linha do tempo de avistamentos
                            </div>
                            <div className={classes.chartSubtitle}>
                                Volume de casos por faixa de horário
                            </div>

                            <div className={classes.chartContainer}>
                                <ResponsiveLine
                                    data={[
                                        {
                                            id: "avistamentos",
                                            data: dataTimeline,
                                        },
                                    ]}
                                    theme={nivoTheme}
                                    margin={{ top: 20, right: 20, bottom: 40, left: 40 }}
                                    xScale={{ type: "point" }}
                                    yScale={{
                                        type: "linear",
                                        min: 0,
                                        max: "auto",
                                        stacked: false,
                                        reverse: false,
                                    }}
                                    curve="monotoneX"
                                    axisTop={null}
                                    axisRight={null}
                                    axisBottom={{
                                        tickSize: 5,
                                        tickPadding: 5,
                                        tickRotation: 0,
                                        legend: "Horário",
                                        legendOffset: 32,
                                        legendPosition: "middle",
                                    }}
                                    axisLeft={{
                                        tickSize: 5,
                                        tickPadding: 5,
                                        tickRotation: 0,
                                        legend: "Casos",
                                        legendOffset: -32,
                                        legendPosition: "middle",
                                    }}
                                    enablePoints={true}
                                    pointSize={8}
                                    pointColor="#38bdf8"
                                    pointBorderWidth={2}
                                    pointBorderColor="#020617"
                                    useMesh={true}
                                    colors={["#38bdf8"]}
                                    enableArea={true}
                                    areaOpacity={0.25}
                                    animate={true}
                                    motionConfig="gentle"
                                />
                            </div>
                        </CardBody>
                    </Card>
                </GridItem>

                {/* Confiabilidade */}
                <GridItem xs={12} md={4}>
                    <Card className={classes.chartCard}>
                        <CardBody className={classes.chartBody}>
                            <div className={classes.chartTitle}>
                                Distribuição por confiabilidade
                            </div>
                            <div className={classes.chartSubtitle}>
                                Classificação dos casos recententes
                            </div>

                            <div className={classes.pieContainer}>
                                <ResponsivePie
                                    data={dataConfiabilidade}
                                    theme={nivoTheme}
                                    margin={{ top: 10, right: 30, bottom: 10, left: 30 }}
                                    innerRadius={0.6}
                                    padAngle={1.5}
                                    cornerRadius={4}
                                    activeOuterRadiusOffset={8}
                                    colors={["#4ade80", "#fbbf24", "#f97316"]}
                                    borderWidth={1}
                                    borderColor={{ from: "color", modifiers: [["darker", 0.4]] }}
                                    enableArcLinkLabels={false}
                                    arcLabelsTextColor="#020617"
                                    arcLabelsRadiusOffset={0.55}
                                    animate={true}
                                    motionConfig="gentle"
                                />
                            </div>
                        </CardBody>
                    </Card>
                </GridItem>
            </GridContainer>
        </AdminLayout>
    );
}

export default DashboardPage;
