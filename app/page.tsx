import Nav from "@/components/nav/Nav";
import Hero from "@/components/hero/Hero";
import ProductShowcase from "@/components/homepage/ProductShowcase";
import BrandStatement from "@/components/homepage/BrandStatement";
import TshirtDrop from "@/components/homepage/TshirtDrop";
import Footer from "@/components/footer/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <Hero />
      <ProductShowcase />
      <BrandStatement />
      <TshirtDrop />
      <Footer />
    </>
  );
}
