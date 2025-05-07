"use client";

import { useEffect } from "react";
import dynamic from "next/dynamic";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import HowItWorks from "../components/HowItWorks";
import WhyChooseUs from "../components/WhyChooseUs";
import Testimonials from "../components/Testimonials";
import ContactForm from "../components/ContactForm";
import Footer from "../components/Footer";

// Dynamically import the chat widget to avoid hydration issues
const ChatWidget = dynamic(() => import("../components/ChatWidget"), {
  ssr: false,
});

export default function Home() {
  // Add scroll behavior for smooth scrolling to sections
  useEffect(() => {
    const handleAnchorClick = (e) => {
      const target = e.target;
      if (target.tagName === 'A' && target.getAttribute('href')?.startsWith('#')) {
        e.preventDefault();
        const id = target.getAttribute('href').slice(1);
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({
            behavior: 'smooth'
          });
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);
    return () => document.removeEventListener('click', handleAnchorClick);
  }, []);

  return (
    <main className="min-h-screen max-w-screen overflow-hidden">
      <Navbar />
      <HeroSection />
      <HowItWorks />
      <WhyChooseUs />
      <Testimonials />
      <ContactForm />
      <Footer />
      <ChatWidget />
    </main>
  );
}
