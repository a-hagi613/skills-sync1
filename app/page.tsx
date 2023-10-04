import Hero from "@/components/Hero";
import Nav from "@/components/Nav";
import CompanySection from "@/components/CompanySection";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

import Section from "@/components/About";
import Demo from "@/components/Demo";
import Reviews from "@/components/Reviews";
import Pricing from "@/components/Pricing";
import Footer from "@/components/Footer";
import Faq from "@/components/Faq";
import About from "@/components/About";

export default function Home() {
  return (
    <>
      <div className="container mx-auto px">
        {/* <Nav /> */}
        {/* <Separator /> */}
        <Hero />
        <CompanySection />
        <About />
        <Reviews />
        <Demo />
        {/* <Pricing /> */}
        <Faq />
        {/* <Separator /> */}

        {/* <Footer /> */}
      </div>
    </>
  );
}
