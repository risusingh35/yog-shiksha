// src/pages/_app.tsx
import { AppProps } from 'next/app';
import Layout from '@/component/layout/Layout';
import '../styles/globals.css';
import { usePathname } from "next/navigation";
import withAuth from '@/component/auth/withAuth';
function MyApp({ Component, pageProps }: AppProps) {
  const pathname = usePathname();
  // List of public routes
  const publicRoutes = ["/sign-up", "/login", "/help"];
  const isProtectedRoute = !publicRoutes.includes(pathname);
  const AuthenticatedComponent = isProtectedRoute
    ? withAuth(Component)
    : Component;
  return (
    <AuthenticatedComponent/>
    // <Layout>
    //   <Component {...pageProps} />
    // </Layout>
  );
}

export default MyApp;