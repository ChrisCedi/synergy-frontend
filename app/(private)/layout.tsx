import ToastNotification from "@/components/ui/atoms/ToastNotification";
import Header from "@/components/ui/molecules/Header";
import { SidebarProvider } from "@/components/ui/molecules/sidebar";
import { SideBar } from "@/components/ui/organisms/SideBar";

export default function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <SideBar />
      <section className="min-h-screen flex flex-col w-full">
        <main>
          <Header />
          <div className="px-4 md:px-8 lg:px-14 h-16">{children}</div>
          <ToastNotification />
        </main>
      </section>
    </SidebarProvider>
  );
}
