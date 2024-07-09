// component/isAuth.tsx
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import PublicLayout from "@/component/layout/PublicLayout";
import Layout from "@/component/layout/Layout";
import { resetIsAuth } from "@/reduxStore/Slice/isAuthSlice";
import { useDispatch, useSelector } from "react-redux";
export default function isAuth(Component: any) {
  const dispatch = useDispatch();
  const { isAuth, token } = useSelector((state: any) => state.auth);
  return function WithAuth(props: any) {
    const router = useRouter();
    useEffect(() => {
      if (!isAuth || !token) {
        router.push("/login");
        dispatch(resetIsAuth());
      }
    }, [isAuth, token, dispatch, router]);
    return  isAuth && token  ? (
      <Layout>
        <Component {...props} />
      </Layout>
    ) : (
      <PublicLayout>
        <Component {...props} />
      </PublicLayout>
    );
  };
}
