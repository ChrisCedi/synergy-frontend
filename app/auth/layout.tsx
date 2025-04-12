import Footer from "@/components/ui/Footer";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="min-h-screen flex flex-col">
      <div className="flex-1">{children}</div>
      <Footer />
    </section>
  );
}
