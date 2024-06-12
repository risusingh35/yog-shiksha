// import Layout from "@/component/layout/Layout";

// src/pages/_app.tsx
import { AppProps } from "next/app";
import "../styles/globals.css";
import isAuth from "@/component/auth/isAuth";
function MyApp({ Component, pageProps }: AppProps) {
  return (
    // <Layout>
    // </Layout>
      <Component {...pageProps} />
  );
}

// export default MyApp;
export default isAuth(MyApp);
