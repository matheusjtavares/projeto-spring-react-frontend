/* eslint-disable */
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Sidebar from "./Sidebar";


const useStyles = makeStyles(() => ({
    layout: {
        display: "flex",
        height: "100vh",
        background: "#020617",
        color: "#f9fafb",
    },

    // coluna principal (topo + conteúdo)
    main: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
    },

    // HEADER / TOP BAR
    topBar: {
        height: 70,
        padding: "0 32px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background:
            "linear-gradient(90deg, #020617 0%, #1d2b64 40%, #283593 70%, #020617 100%)",
        borderBottom: "1px solid rgba(15,23,42,0.9)",
        boxShadow: "0 8px 24px rgba(0,0,0,0.6)",
        zIndex: 2,
    },
    brandBlock: {
        display: "flex",
        flexDirection: "column",
    },
    brandTitle: {
        fontSize: "1.2rem",
        letterSpacing: "0.16em",
        textTransform: "uppercase",
        fontWeight: 600,
    },
    brandSubtitle: {
        fontSize: "0.75rem",
        opacity: 0.8,
    },

    menuButton: {
        border: "none",
        borderRadius: 999,
        padding: "8px 20px",
        fontSize: "0.8rem",
        letterSpacing: "0.12em",
        textTransform: "uppercase",
        background: "rgba(30,64,175,0.95)",
        color: "#e5e7eb",
        cursor: "pointer",
        boxShadow: "0 8px 18px rgba(15,23,42,0.8)",
        transition: "0.18s",
    },
    menuButtonHover: {
        // se quiser usar com clsx depois
    },

    // CONTEÚDO
    content: {
        flex: 1,
        padding: "24px 32px 32px",
        overflowY: "auto",
        background:
            "radial-gradient(circle at top, #081234 0%, #020617 40%, #020617 100%)",
    },
}));

export default function AdminLayout({ children, activeKey }) {
    const classes = useStyles();

    return (
        <div className={classes.layout}>
            {/* Sidebar com os Links clicáveis */}
            <Sidebar activeKey={activeKey} />

            {/* Coluna principal: topo + conteúdo */}
            <div className={classes.main}>
                <header className={classes.topBar}>
                    <div className={classes.brandBlock}>
                        <span className={classes.brandTitle}>UFO Tracker Command</span>
                        <span className={classes.brandSubtitle}>
              Centro de Monitoramento Intergaláctico
            </span>
                    </div>

                    {/* Botão de menu (por enquanto só visual; depois podemos plugar dropdown) */}
                </header>

                <main className={classes.content}>{children}</main>
            </div>
        </div>
    );
}
