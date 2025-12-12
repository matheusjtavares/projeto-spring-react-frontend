/*eslint-disable*/
import React from "react";
import AdminLayout from "/components/layout/AdminLayout.js";
import AvistamentosTable from "./AvistamentosTable";

export default function AvistamentosPage() {
    return (
        <AdminLayout activeKey="avistamentos">
            <h1 style={{ fontSize: "2.6rem", marginBottom: "8px" }}>
                Avistamentos
            </h1>


            <AvistamentosTable />
        </AdminLayout>
    );
}
