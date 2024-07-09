import { Suspense } from "react";
import { persistor, store } from "@/reduxStore/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { AppProps } from "next/app";
import "../styles/globals.css";
import { usePathname } from "next/navigation";
import withAuth from "@/component/auth/withAuth";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function MyApp({ Component, pageProps }: AppProps) {
  const pathname = usePathname();
  // List of public routes
  const publicRoutes = ["/sign-up", "/login", "/help"];
  const isProtectedRoute = !publicRoutes.includes(pathname);
  const AuthenticatedComponent = isProtectedRoute
    ? withAuth(Component)
    : Component;
  const PageLoader = () => <>Loading...</>;

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Suspense fallback={<PageLoader />}>
          <AuthenticatedComponent {...pageProps} />
          <ToastContainer />
        </Suspense>
      </PersistGate>
    </Provider>
  );
}

export default MyApp;
