import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Email from "@material-ui/icons/Email";
import People from "@material-ui/icons/People";
// core components
import Header from "/components/Header/Header.js";
import HeaderLinks from "/components/Header/HeaderLinks.js";
import Footer from "/components/Footer/Footer.js";
import GridContainer from "/components/Grid/GridContainer.js";
import GridItem from "/components/Grid/GridItem.js";
import Button from "/components/CustomButtons/Button.js";
import Card from "/components/Card/Card.js";
import CardBody from "/components/Card/CardBody.js";
import CardHeader from "/components/Card/CardHeader.js";
import CardFooter from "/components/Card/CardFooter.js";
import CustomInput from "/components/CustomInput/CustomInput.js";

import styles from "/styles/jss/nextjs-material-kit/pages/loginPage.js";

const useStyles = makeStyles(styles);

export default function LoginPage(props) {
    const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");

    React.useEffect(() => {
        const timer = setTimeout(() => {
            setCardAnimation("");
        }, 700);
        return () => clearTimeout(timer);
    }, []);

    const classes = useStyles();
    const { ...rest } = props;

    return (
        <div>

            <div
                className={classes.pageHeader}
                style={{
                    backgroundImage: "url('/img/ufo-gb.png')",
                    backgroundSize: "cover",
                    backgroundPosition: "center center"
                }}
            >
                <div className={classes.container}>
                    <GridContainer justify="center">
                        <GridItem xs={12} sm={6} md={4}>
                            <Card className={classes[cardAnimaton]}>
                                <form className={classes.form}>
                                    <CardHeader color="info" className={classes.cardHeader}>
                                        <h4>Portal de Agentes</h4>
                                        <div
                                            style={{
                                                fontSize: "0.85rem",
                                                opacity: 0.9,
                                                marginTop: "4px"
                                            }}
                                        >
                                            Acesso ao centro de controle de avistamentos
                                        </div>
                                        <div className={classes.socialLine}>
                                            <Button
                                                justIcon
                                                href="#"
                                                color="transparent"
                                                onClick={(e) => e.preventDefault()}
                                            >
                                                <i className={"fas fa-satellite"} />
                                            </Button>

                                            <Button
                                                justIcon
                                                href="#"
                                                color="transparent"
                                                onClick={(e) => e.preventDefault()}
                                            >
                                                <i className={"fas fa-globe-americas"} />
                                            </Button>
                                        </div>
                                    </CardHeader>

                                    <p className={classes.divider}>
                                        Use suas credenciais de agente
                                    </p>

                                    <CardBody>
                                        <CustomInput
                                            labelText="Identificação do Agente"
                                            id="agent-code"
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                            inputProps={{
                                                type: "text",
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <People className={classes.inputIconsColor} />
                                                    </InputAdornment>
                                                ),
                                                autoComplete: "off"
                                            }}
                                        />

                                        <CustomInput
                                            labelText="Canal de Contato (Email)"
                                            id="email"
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                            inputProps={{
                                                type: "email",
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <Email className={classes.inputIconsColor} />
                                                    </InputAdornment>
                                                )
                                            }}
                                        />

                                        <CustomInput
                                            labelText="Chave de Acesso"
                                            id="pass"
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                            inputProps={{
                                                type: "password",
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <Icon className={classes.inputIconsColor}>
                                                            lock_outline
                                                        </Icon>
                                                    </InputAdornment>
                                                ),
                                                autoComplete: "off"
                                            }}
                                        />
                                    </CardBody>

                                    <CardFooter className={classes.cardFooter}>
                                        <Button color="info" size="lg">
                                            Entrar no Comando
                                        </Button>
                                    </CardFooter>

                                    <div
                                        style={{
                                            textAlign: "center",
                                            fontSize: "0.8rem",
                                            marginBottom: "10px",
                                            color: "rgba(100,155,255,0.8)"
                                        }}
                                    >
                                        Tentativas suspeitas serão registradas pelos nossos
                                        sensores intergalácticos 👽
                                    </div>
                                </form>
                            </Card>
                        </GridItem>
                    </GridContainer>
                </div>
                <Footer whiteFont />
            </div>
        </div>
    );
}
