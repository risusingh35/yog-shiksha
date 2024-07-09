import { useEffect } from "react";
import { useRouter } from "next/router";
import PublicLayout from "@/component/layout/PublicLayout";
import Layout from "@/component/layout/Layout";
import { resetIsAuth } from "@/reduxStore/Slice/isAuthSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/reduxStore/store";

export default function isAuth(Component: any) {
  const dispatch = useDispatch();
  const { isAuth, token } = useSelector((state: RootState) => state.auth);
  const router = useRouter();

  useEffect(() => {
    console.log({ isAuth, token });
    if (!isAuth || !token) {
      router.push("/login");
    }
    dispatch(resetIsAuth());
  }, [isAuth, token, dispatch, router]);

  return function WithAuth(props: any) {
    return isAuth && token ? (
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
