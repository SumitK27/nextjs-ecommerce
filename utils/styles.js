import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
    navbar: {
        backgroundColor: "#203040",
        "& a": {
            color: "#ffffff",
            marginLeft: 10,
        },
    },
    brand: {
        fontWeight: "bold",
        fontSize: "1.5rem",
    },
    grow: {
        flexGrow: 1,
    },
    mainHeading: {
        fontSize: "1.8rem",
        fontWeight: 400,
        margin: "1rem 0",
        textAlign: "center",
    },
    text: {
        fontSize: "1.2rem",
        marginTop: "1rem",
        marginBottom: "1rem",
    },
    mt1: { marginTop: "1rem" },
    main: {
        minHeight: "80vh",
        marginBottom: 100,
    },
    section: {
        marginTop: 10,
        marginBottom: 10,
    },
    footer: {
        backgroundColor: "#203040",
        color: "#ffffff",
        textAlign: "center",
        padding: 20,
        position: "fixed",
        bottom: 0,
        width: "100%",
    },
    form: {
        maxWidth: 800,
        margin: "0 auto",
    },
    navbarButton: {
        color: "#ffffff",
        textTransform: "initial",
    },
});

export default useStyles;
