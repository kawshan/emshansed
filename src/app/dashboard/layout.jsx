import React from 'react';
import {SidebarInset, SidebarProvider, SidebarTrigger} from "@/components/ui/sidebar";
import {AppSidebar} from "@/components/app-sidebar";
import {Separator} from "@/components/ui/separator";

function Layout({children}) {
    return (
        <div>
            (<SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <header
                    className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
                    <div className="flex items-center gap-2 px-4">
                        <SidebarTrigger className="-ml-1" />
                        <Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-4" />
                    </div>

                    <div>

                    </div>


                </header>
                <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                    <div>{children}</div>
                </div>
            </SidebarInset>
        </SidebarProvider>)
        </div>
    );
}

export default Layout;