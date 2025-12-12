/*eslint-disable*/
import React from "react";
import Link from "next/link";

// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

// core
import CustomDropdown from "/components/CustomDropdown/CustomDropdown.js";

import styles from "/styles/jss/nextjs-material-kit/components/headerLinksStyle.js";

const useStyles = makeStyles(styles);

export default function HeaderLinks() {
    const classes = useStyles();

    return (
        <List className={classes.list}>

            <ListItem className={classes.listItem}>
                <CustomDropdown
                    noLiPadding
                    navDropdown
                    buttonText="Menu"
                    buttonProps={{
                        className: classes.navLink,
                        color: "transparent",
                    }}
                    dropdownList={[
                        <Link href="/admin/perfil">
                            <a className={classes.dropdownLink}>Meu Perfil</a>
                        </Link>,

                        <a
                            href="#"
                            className={classes.dropdownLink}
                            onClick={() => {
                                console.log("Deslogando...");
                                // aqui você pode colocar router.push("/login")
                                // ou lógica de logout real
                            }}
                        >
                            Deslogar
                        </a>,
                    ]}
                />
            </ListItem>

        </List>
    );
}
