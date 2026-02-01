import React, { useState } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Email from "@material-ui/icons/Email";
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
import { postUser } from "../services/loginService";
const useStyles = makeStyles(styles);

export default function LoginPage(props) {
  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  const classes = useStyles();
  const { ...rest } = props;
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setCardAnimation("");
    }, 700);
    return () => clearTimeout(timer);
  }, []);
  const handleChange = (prop) => (event) => {
    setFormData({ ...formData, [prop]: event.target.value });
  };

  // 3. Handle Login / Fetch
  const handlePostUser = async (e) => {
    e.preventDefault(); // Prevent page reload

    // Basic Validation
    if (!formData.email || !formData.password) {
      alert("Please fill in all fields");
      return;
    }
    try {
      console.log("Sending data:", formData);
      await postUser(formData);
      // Add logic here to handle success (e.g., redirect or save token)
      window.location.href = "/";
    } catch (err) {
      console.error("Login Error:", err);
      alert(err.message || "An error occurred during login.");
    }
  };

  return (
    <div>
      <div
        className={classes.pageHeader}
        style={{
          backgroundImage: "url('/img/ufo-gb.png')",
          backgroundSize: "cover",
          backgroundPosition: "center center",
        }}
      >
        <div className={classes.container}>
          <GridContainer justify="center">
            <GridItem xs={12} sm={6} md={4}>
              <Card className={classes[cardAnimaton]}>
                <form className={classes.form}>
                  <CardHeader color="info" className={classes.cardHeader}>
                    <h4>Cars Portal</h4>
                    <div
                      style={{
                        fontSize: "0.85rem",
                        opacity: 0.9,
                        marginTop: "4px",
                      }}
                    >
                      Cars API Access Management
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

                  <p className={classes.divider}>Provide your credentials</p>

                  <CardBody>
                    <CustomInput
                      labelText="Email"
                      id="email"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        type: "email",
                        // 4. Bind value and onChange
                        value: formData.email,
                        onChange: handleChange("email"),
                        endAdornment: (
                          <InputAdornment position="end">
                            <Email className={classes.inputIconsColor} />
                          </InputAdornment>
                        ),
                      }}
                    />

                    <CustomInput
                      labelText="Password"
                      id="pass"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        type: "password",
                        // 4. Bind value and onChange
                        value: formData.password,
                        onChange: handleChange("password"),
                        endAdornment: (
                          <InputAdornment position="end">
                            <Icon className={classes.inputIconsColor}>
                              lock_outline
                            </Icon>
                          </InputAdornment>
                        ),
                        autoComplete: "off",
                      }}
                    />
                  </CardBody>

                  <CardFooter className={classes.cardFooter}>
                    {/* 5. Attach the click handler */}
                    <Button color="info" size="lg" onClick={handlePostUser}>
                      Login
                    </Button>
                  </CardFooter>
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
