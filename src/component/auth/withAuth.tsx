// components/withAuth.tsx
import React, { useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/router';
import Layout from '../layout/Layout';
const withAuth = (WrappedComponent: React.ComponentType) => {
    const ComponentWithAuth = (props: any) => {
      const { isLoggedIn } = useAuth();
      const router = useRouter();
  
      useEffect(() => {
        if (!isLoggedIn) {
          // Only push to the login page if we are not already on it
          if (router.pathname !== '/login') {
            router.push('/login');
          }
        }
      }, [isLoggedIn, router]);
  
      if (!isLoggedIn && router.pathname !== '/login') {
        return null; // or a loading spinner
      }
  
      return <WrappedComponent {...props} />;
    };
  
    // Return the Layout wrapping the component if the user is logged in
    return (props: any) => (
      <Layout>
        <ComponentWithAuth {...props} />
      </Layout>
    );
  };
  
  export default withAuth;