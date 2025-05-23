import ToastNotification from "@/components/ui/atoms/ToastNotification";
import Footer from "@/components/ui/molecules/Footer";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="min-h-screen flex flex-col">
      <main className="flex-1 flex items-center justify-center">
        {children}
        <ToastNotification />
      </main>
      <Footer />
    </section>
  );
}
