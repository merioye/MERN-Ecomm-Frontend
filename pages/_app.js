import 'styles/globals.css';
import { ThemeProvider } from '@mui/material/styles';
import { lightTheme } from 'theme/theme';
import { Provider } from 'react-redux';
import store from 'redux/store';
import Layout from 'components/shared/Layout';
import AdminLayout from 'components/shared/AdminLayout';



function MyApp({ Component, pageProps }) {


    if(Component.getLayout){
        return Component.getLayout(
            <ThemeProvider theme={lightTheme}>
                <Provider store={store}>
                    <Component {...pageProps} />
                </Provider>
            </ThemeProvider>
        );
    }

    return(
        <ThemeProvider theme={lightTheme}>
            <Provider store={store}>
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </Provider>
        </ThemeProvider>
    )
    
}

export default MyApp
