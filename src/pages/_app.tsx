// pages/_app.tsx
import { AppProps } from "next/app";
import { AuthProvider } from "../contexts/AuthContext";
import "../styles/globals.css";
import withAuth from "@/component/auth/withAuth";
import { usePathname } from "next/navigation";
import "react-toastify/dist/ReactToastify.css";
import "../styles/globals.css";
const MyApp = ({ Component, pageProps }: AppProps) => {
  const pathname = usePathname();
  // List of public routes
  const publicRoutes = ["/sign-up", "/login", "/help"];
  const isProtectedRoute = !publicRoutes.includes(pathname);
  const AuthenticatedComponent = isProtectedRoute
    ? withAuth(Component)
    : Component;

  return (
    <AuthProvider>
      <AuthenticatedComponent {...pageProps} />
    </AuthProvider>
  );
};

export default MyApp;
