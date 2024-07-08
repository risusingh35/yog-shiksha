import Layout from "../layout/Layout";
const withAuth = (WrappedComponent: React.ComponentType) => {
  const ComponentWithAuth = (props: any) => {
    return <WrappedComponent {...props} />;
  };

  return (props: any) => (
    <Layout>
      <ComponentWithAuth {...props} />
    </Layout>
  );
};

export default withAuth;
