/*eslint-disable*/
import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

import Card from "/components/Card/Card.js";
import CardHeader from "/components/Card/CardHeader.js";
import CardBody from "/components/Card/CardBody.js";
import Button from "/components/CustomButtons/Button.js";

import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";

import VisibilityIcon from "@material-ui/icons/Visibility";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

const useStyles = makeStyles((theme) => ({
    cardRoot: {
        background:
            "radial-gradient(circle at top left, rgba(37,99,235,0.15), rgba(15,23,42,0.95))",
        color: "#e5e7eb",
        boxShadow: "0 12px 30px rgba(0,0,0,0.55)",
    },
    cardHeader: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
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
    addButton: {
        borderRadius: 999,
        padding: "8px 18px",
        fontSize: "0.85rem",
        textTransform: "none",
        boxShadow: "0 6px 18px rgba(56,189,248,0.5)",
    },
    tableWrapper: {
        overflowX: "auto",
    },
    table: {
        minWidth: 650,
    },
    headCell: {
        fontSize: "0.8rem",
        textTransform: "uppercase",
        letterSpacing: "0.12em",
        color: "#e5e7eb",
        borderBottom: "1px solid rgba(55,65,81,0.9)",
    },
    bodyRow: {
        "&:hover": {
            backgroundColor: "rgba(15,23,42,0.8)",
        },
    },
    bodyCell: {
        borderBottom: "1px solid rgba(31,41,55,0.9)",
        fontSize: "0.9rem",
        color: "#ffffff", // texto da tabela sempre branco
    },
    confiabilidadeOk: {
        color: "#22c55e",
        fontWeight: 500,
    },
    confiabilidadeLow: {
        color: "#f97316",
        fontWeight: 500,
    },
    actionsCell: {
        whiteSpace: "nowrap",
    },
    actionIcon: {
        color: "#e5e7eb",
    },

    // ==== MODAL DETALHES ====
    dialogPaper: {
        background:
            "radial-gradient(circle at top left, rgba(37,99,235,1), rgba(15,23,42,1))",
        color: "#ffffff",
        minWidth: 420,
        maxWidth: 640,
        borderRadius: 12,
        boxShadow: "0 20px 50px rgba(0,0,0,0.9)",
    },
    dialogTitleRoot: {
        paddingBottom: 4,
    },
    dialogSubtitle: {
        fontSize: "0.8rem",
        opacity: 0.75,
    },
    dialogSectionTitle: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(0.5),
        fontSize: "0.75rem",
        textTransform: "uppercase",
        letterSpacing: "0.18em",
        color: "#9ca3af",
    },
    detailRow: {
        display: "flex",
        justifyContent: "space-between",
        marginBottom: 4,
        fontSize: "0.9rem",
    },
    detailLabel: {
        opacity: 0.7,
    },
    detailValue: {
        fontWeight: 500,
    },
    descricaoBox: {
        marginTop: theme.spacing(1),
        fontSize: "0.9rem",
        lineHeight: 1.4,
    },

    // ==== MODAL EXCLUSÃO ====
    deleteDialogPaper: {
        background: "#0f172a",
        color: "#ffffff",
        minWidth: 360,
        borderRadius: 12,
        boxShadow: "0 20px 50px rgba(0,0,0,0.9)",
    },
    deleteHighlight: {
        fontWeight: 600,
        color: "#f97316",
    },
}));

// MOCK inicial
const MOCK_AVISTAMENTOS = [
    {
        id: "b1",
        dataHora: "2025-06-28 18:58",
        cidade: "Niterói",
        estado: "RJ",
        tipoObjeto: "disco",
        confiabilidade: 72,
        descricao:
            "Disco metálico realizando manobras incomuns, emitindo luz pulsante intensa sobre a baía.",
        lat: "-22.8832",
        lon: "-43.1034",
    },
    {
        id: "b2",
        dataHora: "2025-06-28 23:12",
        cidade: "Recife",
        estado: "PE",
        tipoObjeto: "luz",
        confiabilidade: 47,
        descricao:
            "Objeto luminoso realizando deslocamento abrupto no céu, sem ruído, com mudança de cor.",
        lat: "-8.0476",
        lon: "-34.8770",
    },
    {
        id: "b3",
        dataHora: "2025-06-26 05:52",
        cidade: "Salvador",
        estado: "BA",
        tipoObjeto: "triângulo",
        confiabilidade: 9,
        descricao:
            "Forma triangular observada rapidamente no horizonte. Relato considerado de baixa confiabilidade.",
        lat: "-12.9777",
        lon: "-38.5016",
    },
];

export default function AvistamentosTable() {
    const classes = useStyles();

    // lista mockada, mas mutável
    const [avistamentos, setAvistamentos] = useState(MOCK_AVISTAMENTOS);

    // modal de detalhes
    const [selected, setSelected] = useState(null);

    // modal de exclusão
    const [deleteTarget, setDeleteTarget] = useState(null);

    const handleNovo = () => {
        console.log("Novo avistamento (abrir modal/form) 🔭");
    };

    const handleVer = (item) => {
        setSelected(item);
    };

    const handleEditar = (id) => {
        console.log("Editar avistamento:", id);
    };

    const handleExcluirClick = (item) => {
        setDeleteTarget(item);
    };

    const handleConfirmDelete = () => {
        if (!deleteTarget) return;
        setAvistamentos((prev) =>
            prev.filter((a) => a.id !== deleteTarget.id)
        );
        setDeleteTarget(null);
    };

    const handleCancelarDelete = () => {
        setDeleteTarget(null);
    };

    const handleFecharModal = () => {
        setSelected(null);
    };

    return (
        <>
            <Card className={classes.cardRoot}>
                <div className={classes.cardHeader}>
                    <div>
                        <h4 className={classes.cardTitle}>Avistamentos</h4>
                        <p className={classes.cardSubtitle}>
                            Registro de ocorrências monitoradas pelo UFO Tracker.
                        </p>
                    </div>

                    <Button color="info" className={classes.addButton} onClick={handleNovo}>
                        + Novo avistamento
                    </Button>
                </div>

                <CardBody>
                    <div className={classes.tableWrapper}>
                        <Table className={classes.table} size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell className={classes.headCell}>Data / Hora</TableCell>
                                    <TableCell className={classes.headCell}>Local</TableCell>
                                    <TableCell className={classes.headCell}>Tipo</TableCell>
                                    <TableCell className={classes.headCell}>
                                        Confiabilidade
                                    </TableCell>
                                    <TableCell className={classes.headCell} align="right">
                                        Ações
                                    </TableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {avistamentos.map((item) => {
                                    const confiabClass =
                                        item.confiabilidade >= 50
                                            ? classes.confiabilidadeOk
                                            : classes.confiabilidadeLow;

                                    return (
                                        <TableRow key={item.id} className={classes.bodyRow}>
                                            <TableCell className={classes.bodyCell}>
                                                {item.dataHora}
                                            </TableCell>
                                            <TableCell className={classes.bodyCell}>
                                                {item.cidade} - {item.estado}
                                            </TableCell>
                                            <TableCell className={classes.bodyCell}>
                                                {item.tipoObjeto}
                                            </TableCell>
                                            <TableCell className={classes.bodyCell}>
                        <span className={confiabClass}>
                          {item.confiabilidade}%
                        </span>
                                            </TableCell>

                                            <TableCell
                                                className={`${classes.bodyCell} ${classes.actionsCell}`}
                                                align="right"
                                            >
                                                <Tooltip title="Ver" arrow>
                                                    <IconButton
                                                        size="small"
                                                        onClick={() => handleVer(item)}
                                                    >
                                                        <VisibilityIcon className={classes.actionIcon} />
                                                    </IconButton>
                                                </Tooltip>

                                                <Tooltip title="Editar" arrow>
                                                    <IconButton
                                                        size="small"
                                                        onClick={() => handleEditar(item.id)}
                                                    >
                                                        <EditIcon className={classes.actionIcon} />
                                                    </IconButton>
                                                </Tooltip>

                                                <Tooltip title="Excluir" arrow>
                                                    <IconButton
                                                        size="small"
                                                        onClick={() => handleExcluirClick(item)}
                                                    >
                                                        <DeleteIcon className={classes.actionIcon} />
                                                    </IconButton>
                                                </Tooltip>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </div>
                </CardBody>
            </Card>

            {/* ========== MODAL DE DETALHES ========== */}
            <Dialog
                open={Boolean(selected)}
                onClose={handleFecharModal}
                classes={{ paper: classes.dialogPaper }}
            >
                {selected && (
                    <>
                        <DialogTitle disableTypography className={classes.dialogTitleRoot}>
                            <Typography variant="h6">
                                Avistamento em {selected.cidade} - {selected.estado}
                            </Typography>
                            <Typography
                                variant="body2"
                                className={classes.dialogSubtitle}
                            >
                                Registrado em {selected.dataHora}
                            </Typography>
                        </DialogTitle>

                        <Divider />

                        <DialogContent dividers>
                            <Typography className={classes.dialogSectionTitle}>
                                Dados gerais
                            </Typography>

                            <div className={classes.detailRow}>
                                <span className={classes.detailLabel}>Tipo do objeto</span>
                                <span className={classes.detailValue}>{selected.tipoObjeto}</span>
                            </div>

                            <div className={classes.detailRow}>
                                <span className={classes.detailLabel}>Confiabilidade</span>
                                <span className={classes.detailValue}>
                  {selected.confiabilidade}%
                </span>
                            </div>

                            <Typography className={classes.dialogSectionTitle}>
                                Coordenadas
                            </Typography>

                            <div className={classes.detailRow}>
                                <span className={classes.detailLabel}>Latitude</span>
                                <span className={classes.detailValue}>
                  {selected.lat || "—"}
                </span>
                            </div>

                            <div className={classes.detailRow}>
                                <span className={classes.detailLabel}>Longitude</span>
                                <span className={classes.detailValue}>
                  {selected.lon || "—"}
                </span>
                            </div>

                            <Typography className={classes.dialogSectionTitle}>
                                Descrição
                            </Typography>

                            <div className={classes.descricaoBox}>
                                {selected.descricao || "Nenhuma descrição detalhada informada."}
                            </div>
                        </DialogContent>

                        <DialogActions>
                            <Button color="transparent" onClick={handleFecharModal}>
                                Fechar
                            </Button>
                        </DialogActions>
                    </>
                )}
            </Dialog>

            {/* ========== MODAL DE CONFIRMAÇÃO DE EXCLUSÃO ========== */}
            <Dialog
                open={Boolean(deleteTarget)}
                onClose={handleCancelarDelete}
                classes={{ paper: classes.deleteDialogPaper }}
            >
                {deleteTarget && (
                    <>
                        <DialogTitle>Confirmar exclusão</DialogTitle>
                        <DialogContent>
                            <Typography variant="body2">
                                Tem certeza de que deseja excluir o avistamento em{" "}
                                <span className={classes.deleteHighlight}>
                  {deleteTarget.cidade} - {deleteTarget.estado}
                </span>
                                ?
                            </Typography>
                            <Typography
                                variant="body2"
                                style={{ marginTop: 12, opacity: 0.7 }}
                            >
                                Esta ação é irreversível (no mundo real; aqui ainda é só mock 😄).
                            </Typography>
                        </DialogContent>
                        <DialogActions>
                            <Button color="transparent" onClick={handleCancelarDelete}>
                                Cancelar
                            </Button>
                            <Button color="danger" onClick={handleConfirmDelete}>
                                Excluir
                            </Button>
                        </DialogActions>
                    </>
                )}
            </Dialog>
        </>
    );
}
