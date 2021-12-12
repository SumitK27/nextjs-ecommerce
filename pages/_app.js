import { SnackbarProvider } from "notistack";
import { useEffect } from "react";
import "../styles/globals.css";
import { StoreProvider } from "../utils/Store";

function MyApp({ Component, pageProps }) {
    // Fix server-side rendering of material-ui elements
    useEffect(() => {
        const jssStyles = document.querySelector("#jss-server-side");
        if (jssStyles) {
            jssStyles.parentElement.removeChild(jssStyles);
        }
    }, []);
    return (
        <SnackbarProvider
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
            <StoreProvider>
                <Component {...pageProps} />
            </StoreProvider>
        </SnackbarProvider>
    );
}

export default MyApp;
