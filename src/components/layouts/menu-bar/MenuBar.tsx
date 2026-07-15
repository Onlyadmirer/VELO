"use client";

import { AppSidebar } from "@/components/layouts/menu-bar/components/app-sidebar";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import ThemeToggle from "./components/ThemeToggle";
import React from "react";

function MenuBar({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <div className='flex flex-row gap-2 top-0 px-4 bg-background sticky z-99 h-16 shrink-0 items-center'>
          <div className=' flex flex-row gap-2 w-full'>
            <div className='flex items-center gap-2'>
              <SidebarTrigger className='-ml-1' />
              <Separator
                orientation='vertical'
                className='mr-2 data-[orientation=vertical]:h-8'
              />
            </div>
            <Field className='sm:max-w-1/2 md:w-full ' orientation='horizontal'>
              <Input type='search' placeholder='Search...' />
              <Button>Search</Button>
            </Field>
          </div>
          <ThemeToggle />
        </div>
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}

export default MenuBar;
