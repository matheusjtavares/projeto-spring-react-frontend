/* eslint-disable */
import React from "react";
import Link from "next/link";
import { makeStyles } from "@material-ui/core/styles";

import DashboardIcon from "@material-ui/icons/Dashboard";
import VisibilityIcon from "@material-ui/icons/Visibility";
import PeopleIcon from "@material-ui/icons/People";
import SecurityIcon from "@material-ui/icons/Security";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

const useStyles = makeStyles(() => ({
    sidebar: {
        width: 260,
        height: "100vh",
        background: "linear-gradient(180deg, #020617, #020617 40%, #030712)",
        padding: "20px 0 24px",
        color: "#e5e7eb",
        display: "flex",
        flexDirection: "column",
    },

    // título da seção
    sectionTitle: {
        fontSize: "0.7rem",
        letterSpacing: "0.16em",
        textTransform: "uppercase",
        opacity: 0.6,
        padding: "16px 22px 6px",
    },

    item: {
        padding: "10px 22px",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        gap: "12px",
        fontSize: "0.9rem",
        textDecoration: "none",
        color: "#e5e7eb",
        transition: "0.18s",
        "&:hover": {
            background: "rgba(148,163,184,0.18)",
            color: "#fff",
        },
    },
    active: {
        background: "rgba(56,189,248,0.2)",
        color: "#fff",
    },
    icon: {
        fontSize: "1.2rem",
    },

    spacer: {
        flex: 1,
    },

    // seção inferior (logout)
    bottomGroup: {
        borderTop: "1px solid rgba(15,23,42,0.9)",
        marginTop: 10,
        paddingTop: 8,
    },
}));

export default function Sidebar({ activeKey }) {
    const classes = useStyles();

    return (
        <div className={classes.sidebar}>
            {/* VISÃO GERAL */}
            <div className={classes.sectionTitle}>Visão Geral</div>
            <Link href="/admin/dashboard">
                <a
                    className={
                        activeKey === "dashboard"
                            ? `${classes.item} ${classes.active}`
                            : classes.item
                    }
                >
                    <DashboardIcon className={classes.icon} />
                    <span>Dashboard</span>
                </a>
            </Link>

            {/* CASOS */}
            <div className={classes.sectionTitle}>Casos</div>
            <Link href="/admin/avistamentos">
                <a
                    className={
                        activeKey === "avistamentos"
                            ? `${classes.item} ${classes.active}`
                            : classes.item
                    }
                >
                    <VisibilityIcon className={classes.icon} />
                    <span>Avistamentos</span>
                </a>
            </Link>

            {/* ADMINISTRAÇÃO (mock por enquanto) */}
            <div className={classes.sectionTitle}>Administração</div>
            <Link href="/admin/usuarios">
                <a
                    className={
                        activeKey === "usuarios"
                            ? `${classes.item} ${classes.active}`
                            : classes.item
                    }
                >
                    <PeopleIcon className={classes.icon} />
                    <span>Usuários</span>
                </a>
            </Link>

            <Link href="/admin/perfis-acesso">
                <a
                    className={
                        activeKey === "perfis"
                            ? `${classes.item} ${classes.active}`
                            : classes.item
                    }
                >
                    <SecurityIcon className={classes.icon} />
                    <span>Perfis de acesso</span>
                </a>
            </Link>

            <div className={classes.spacer} />

            {/* RODAPÉ / DESLOGAR */}
            <div className={classes.bottomGroup}>
                <Link href="/logout">
                    <a className={classes.item}>
                        <ExitToAppIcon className={classes.icon} />
                        <span>Deslogar</span>
                    </a>
                </Link>
            </div>
        </div>
    );
}
