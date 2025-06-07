import ToastNotification from "@/components/ui/atoms/ToastNotification";
import Header from "@/components/ui/molecules/Header";
import { SidebarProvider } from "@/components/ui/sidebar";
import { SideBar } from "@/components/ui/organisms/SideBar";
import { GlobalAlertDialog } from "@/components/ui/molecules/GlobalAlertDialog";
import { cookies } from "next/headers";

export default async function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();

  const roleCookie = cookieStore.get("user")?.value;
  const user = roleCookie
    ? JSON.parse(roleCookie)
    : {
        id: null,
        name: "",
        role: "",
        companyCustomerId: "",
      };

  return (
    <SidebarProvider>
      <SideBar user={user} />
      <section className="min-h-screen flex flex-col w-full bg-gray-50 dark:bg-gray-900">
        <Header />
        <main>
          <GlobalAlertDialog />
          <div className="px-4 md:px-8 lg:px-14 pb-10 pt-10  h-full">
            {children}
          </div>
          <ToastNotification />
        </main>
      </section>
    </SidebarProvider>
  );
}
