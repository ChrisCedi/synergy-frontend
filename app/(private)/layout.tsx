import ToastNotification from "@/components/ui/atoms/ToastNotification";
import Footer from "@/components/ui/molecules/Footer";
import Header from "@/components/ui/molecules/Header";

export default function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center">
        {children}
        <ToastNotification />
      </main>
    </section>
  );
}
