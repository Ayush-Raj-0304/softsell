"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { FiSun, FiMoon, FiMenu, FiX } from "react-icons/fi";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import Button from "./Button";
import Container from "./Container";

const Navbar = () => {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // After mounting, we can access the theme
  useEffect(() => {
    setMounted(true);
    
    const handleScroll = () => {
      // Update scroll state for styling
      setIsScrolled(window.scrollY > 20);
      
      // Find active section by checking which section is currently in viewport
      const sections = ['how-it-works', 'why-choose-us', 'testimonials', 'contact'];
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          // If element is in viewport (with some buffer)
          if (rect.top <= 150 && rect.bottom >= 150) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  // Navbar links configuration
  const navLinks = [
    { href: "#how-it-works", label: "How It Works", id: "how-it-works" },
    { href: "#why-choose-us", label: "Why Choose Us", id: "why-choose-us" },
    { href: "#testimonials", label: "Testimonials", id: "testimonials" },
    { href: "#contact", label: "Contact", id: "contact" }
  ];

  // Fix for hydration - only render when mounted
  if (!mounted) {
    return <nav className="fixed w-full z-50 h-16"></nav>;
  }

  return (
    <motion.nav 
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? "py-2 backdrop-blur-xl bg-white/80 dark:bg-[rgba(10,9,26,0.8)] shadow-lg dark:shadow-purple-900/10" 
          : "py-4 backdrop-blur-md bg-white/50 dark:bg-[rgba(10,9,26,0.6)]"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Container padding="x">
        <div className="flex justify-between items-center">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative z-10"
          >
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-extralight tracking-tight leading-tight px-4 py-2">
                <span className="text-primary">Soft</span>
                <span className="text-accent">Sell</span>
              </span>
              {/* Subtle glow effect behind logo */}
              <div className="absolute -z-10 inset-0 bg-primary/20 dark:bg-primary/10 blur-xl rounded-full w-12 h-8"></div>
            </Link>
          </motion.div>
          
          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant="ghost"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                icon={mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
                size="sm"
                className="text-gray-900 dark:text-white hover:bg-white/10 rounded-full w-10 h-10 p-0 flex items-center justify-center"
                aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              />
            </motion.div>
          </div>
          
          {/* Desktop navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <motion.div
                key={link.id}
                className="px-1"
                whileHover={{ 
                  scale: 1.05,
                  filter: "brightness(1.1)"
                }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href={link.href}
                  className={`relative px-4 py-2 rounded-full text-sm transition-all duration-300 ${
                    activeSection === link.id
                      ? "text-primary bg-primary/10 font-medium"
                      : "text-gray-700 dark:text-gray-300"
                  }`}
                > 
                  {link.label}
                  {activeSection === link.id && (
                    <motion.div
                      layoutId="activeSection"
                      className="absolute inset-0 -z-10 bg-gradient-to-r from-primary/10 to-accent/10 rounded-full"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </Link>
              </motion.div>
            ))}
            
            <Button
              variant="circle"
              size="sm"
              onClick={toggleTheme}
              icon={resolvedTheme === "dark" ? <FiSun size={18} /> : <FiMoon size={18} />}
              className=" w-10 h-10 text-gray-900 dark:text-white hover:bg-white/10"
              aria-label={resolvedTheme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            />


          </div>
        </div>
      </Container>
      
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="md:hidden absolute top-full left-0 right-0 p-4 glass backdrop-blur-lg border-t border-white/10"
        >
          <nav className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.id}
                href={link.href}
                className={`px-4 py-2 rounded-full text-sm transition-all duration-300 ${
                  activeSection === link.id
                    ? "text-primary bg-primary/10 font-medium"
                    : "text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary hover:bg-white/5"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar; 