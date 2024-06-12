// pages/_app.tsx
import { AppProps } from 'next/app';
import { AuthProvider } from '../contexts/AuthContext';
import '../styles/globals.css';
import withAuth from '@/component/auth/withAuth';
import { usePathname } from "next/navigation";
const MyApp = ({ Component, pageProps }: AppProps) => {
  const pathname = usePathname();
  // List of public routes
  const publicRoutes = ['/login', '/public'];
  // Determine if the current route is protected
  const isProtectedRoute = !publicRoutes.includes(pathname);
  // Wrap the component with the HOC if it's a protected route
  const AuthenticatedComponent = isProtectedRoute ? withAuth(Component) : Component;

  return (
    <AuthProvider>
      <AuthenticatedComponent {...pageProps} />
    </AuthProvider>
  );
};

export default MyApp;
