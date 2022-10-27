import "styles/globals.css";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "theme/theme";
import { Provider } from "react-redux";
import store from "redux/store";
import Layout from "components/shared/Layout";

function MyApp({ Component, pageProps }) {
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
