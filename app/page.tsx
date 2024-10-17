import ProductConfigurator from "@/components/ProductConfigurator";

export default function Home() {
  return (
    <main className="container mx-auto max-w-xl p-4 sm:p-6 lg:p-8">
      {/* <header className="mb-8">
        <img src="/apple-logo.svg" alt="Apple" className="w-8 h-8" />
      </header> */}
      <ProductConfigurator />
    </main>
  );
}
