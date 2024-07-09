// component/withAuth.tsx
import React from "react";
import isAuth from "./isAuth";

const withAuth = (WrappedComponent: React.ComponentType) => {
  return (props: any) => {
    const ComponentWithAuth = isAuth(WrappedComponent);
    return <ComponentWithAuth {...props} />;
  };
};

export default withAuth;

