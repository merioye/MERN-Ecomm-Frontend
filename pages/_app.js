import "styles/globals.css";
import { useEffect } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "theme/theme";
import { Provider } from "react-redux";
import { getUser } from "redux/authSlice";
import store from "redux/store";
import Layout from "components/shared/Layout";

function MyApp({ Component, pageProps }) {
    useEffect(() => {
        store.dispatch(getUser());
    }, []);

    if (Component.getLayout) {
        return Component.getLayout(
            <ThemeProvider theme={theme}>
                <Provider store={store}>
                    <Component {...pageProps} />
                </Provider>
            </ThemeProvider>
        );
    }

    return (
        <ThemeProvider theme={theme}>
            <Provider store={store}>
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </Provider>
        </ThemeProvider>
    );
}

export default MyApp;
