import ToastNotification from "@/components/ui/atoms/ToastNotification";
import Header from "@/components/ui/molecules/Header";
import { SidebarProvider } from "@/components/ui/sidebar";
import { SideBar } from "@/components/ui/organisms/SideBar";
import { GlobalAlertDialog } from "@/components/ui/molecules/GlobalAlertDialog";

export default function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <SideBar />
      <section className="min-h-screen flex flex-col w-full bg-gray-50 dark:bg-gray-900">
        <main>
          <Header />
          <GlobalAlertDialog />
          <div className="px-4 md:px-8 lg:px-14 pb-24 pt-10  h-full">
            {children}
            <div className="pb-10" />
          </div>
          <ToastNotification />
        </main>
      </section>
    </SidebarProvider>
  );
}
