/*eslint-disable*/
import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

// material-ui
import { List, ListItem } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Favorite from "@material-ui/icons/Favorite";

import styles from "/styles/jss/nextjs-material-kit/components/footerStyle.js";

const useStyles = makeStyles(styles);

export default function Footer(props) {
  const classes = useStyles();
  const { whiteFont } = props;

  const footerClasses = classNames({
    [classes.footer]: true,
    [classes.footerWhiteFont]: whiteFont,
  });

  const aClasses = classNames({
    [classes.a]: true,
    [classes.footerWhiteFont]: whiteFont,
  });

  return (
      <footer className={footerClasses}>
        <div className={classes.container}>

          {/* ================= LEFT SIDE ================= */}
          <div className={classes.left}>
            <List className={classes.list}>




              <ListItem className={classes.inlineBlock}>
                <a
                    href="/"
                    className={classes.block}
                >
                  🌍 Mapa Global
                </a>
              </ListItem>

              <ListItem className={classes.inlineBlock}>
                <a
                    href="/"
                    className={classes.block}
                >
                  🔐 Sobre o Projeto
                </a>
              </ListItem>

            </List>
          </div>

          {/* ================= RIGHT SIDE ================= */}
          <div className={classes.right}>
            © {1900 + new Date().getYear()} • Desenvolvido com{" "}
            <Favorite className={classes.icon} style={{ color: "#e57373" }} /> por{" "}
            <span className={aClasses} style={{ cursor: "default" }}>
            UFO Tracker Command
          </span>{" "}
            • Sistema oficial de monitoramento intergaláctico 👽
          </div>

        </div>
      </footer>
  );
}

Footer.propTypes = {
  whiteFont: PropTypes.bool,
};
