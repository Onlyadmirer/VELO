import Layout from "@/components/layouts/Layout";
import React from "react";

function layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Layout>{children}</Layout>
    </>
  );
}

export default layout;
