// component/isAuth.tsx

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import PublicLayout from "@/component/layout/PublicLayout";
import Layout from "@/component/layout/Layout";

export default function isAuth(Component: any) {
  return function WithAuth(props: any) {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false); // Replace with your authentication logic
    const router = useRouter();

    useEffect(() => {
      // Check authentication status here and set isAuthenticated accordingly
      // For demonstration purpose, I'm setting it to true
      setIsAuthenticated(false);
    }, []);

    useEffect(() => {
      if (!isAuthenticated) {
        router.push("/login");
      }
    }, [isAuthenticated, router]);

    // if (!isAuthenticated) {
    //   return null; // You might want to render a loading spinner or message here
    // }

    // Render different layouts based on authentication status
    return isAuthenticated ? <Layout><Component {...props} /></Layout> : <PublicLayout><Component {...props} /></PublicLayout>;
  };
}
