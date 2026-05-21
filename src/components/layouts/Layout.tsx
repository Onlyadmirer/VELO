import React from "react";
import MenuBar from "./menu-bar/MenuBar";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='max-w-full bg-amber-300 m-auto'>
      <MenuBar />
      <main>{children}</main>
    </div>
  );
}

export default Layout;
