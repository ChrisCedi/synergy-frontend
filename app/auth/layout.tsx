import ToastNotification from "@/components/ui/atoms/ToastNotification";
import Footer from "@/components/ui/molecules/Footer";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="min-h-screen flex flex-col">
      <div className="flex-1 h-full flex items-center justify-center">
        {children}
        <ToastNotification />
      </div>
      <Footer />
    </section>
  );
}
