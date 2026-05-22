import React from "react";
import MenuBar from "./menu-bar/MenuBar";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='w-full bg-amber-300 m-auto'>
      <MenuBar>{children}</MenuBar>
    </div>
  );
}

export default Layout;
