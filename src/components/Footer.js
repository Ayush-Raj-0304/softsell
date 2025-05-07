import Link from "next/link";
import { FiGithub, FiTwitter, FiLinkedin, FiArrowRight } from "react-icons/fi";
import { SiLeetcode } from "react-icons/si";
import { motion } from "framer-motion";
import Button from "./Button";
import Container from "./Container";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      icon: <FiTwitter size={20} />,
      href: "https://x.com/AyushRaj0304",
      label: "Twitter",
    },
    {
      icon: <FiLinkedin size={20} />,
      href: "https://www.linkedin.com/in/ayush-raj-50779024a/",
      label: "LinkedIn",
    },
    {
      icon: <FiGithub size={20} />,
      href: "https://github.com/Ayush-Raj-0304",
      label: "GitHub",
    },
    {
      icon: <SiLeetcode size={20} />,
      href: "https://leetcode.com/ayushraj0304/",
      label: "LeetCode",
    },
  ];

  const quickLinks = [
    { label: "How It Works", href: "#how-it-works" },
    { label: "Why Choose Us", href: "#why-choose-us" },
    { label: "Testimonials", href: "#testimonials" },
    { label: "Contact Us", href: "#contact" },
  ];

  const legalLinks = [
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms of Service", href: "/terms-of-service" },
    { label: "Cookie Policy", href: "/cookie-policy" },
    { label: "Licenses", href: "/licenses" },
  ];

  return (
    <footer className="relative bg-white/5 backdrop-blur-2xl border-t border-white/10 text-foreground overflow-hidden">
      {/* Background mesh and noise */}
      <div className="absolute inset-0 -z-10 opacity-30">
        <div className="absolute top-0 left-0 w-full h-full mesh-gradient-2" />
        <div className="absolute inset-0 bg-noise opacity-[0.04] mix-blend-soft-light" />
      </div>

      {/* Decorative blobs */}
      <div className="absolute -top-32 -left-32 w-64 h-64 bg-primary/20 rounded-full blur-3xl animate-blob" />
      <div className="absolute -bottom-32 -right-32 w-64 h-64 bg-accent/20 rounded-full blur-3xl animate-blob animation-delay-2000" />

      <Container className="relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Column */}
          <div className="col-span-1 md:col-span-2">
            <motion.div className="inline-block" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link href="/" className="text-2xl font-extralight tracking-tight leading-tight mb-4 px-4 py-2 inline-block">
                <span className="text-primary">Soft</span>
                <span className="text-accent">Sell</span>
              </Link>
            </motion.div>
            <p className="text-foreground/80 mb-6 max-w-md p-4">
              The leading marketplace for buying and selling software licenses.
              Turn your unused licenses into cash quickly and securely.
            </p>
            <div className="flex space-x-5 p-2">
              {socialLinks.map((social, index) => (
                <Button
                  key={index}
                  href={social.href}
                  variant="circle"
                  size="sm"
                  icon={social.icon}
                  className="w-10 h-10 rounded-full p-0 flex items-center justify-center"
                  aria-label={`Visit our ${social.label} page`}
                />
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-foreground font-semibold text-lg mb-5 pb-2 border-b border-white/20">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Button
                    href={link.href}
                    variant="link"
                    icon={<FiArrowRight size={14} className="opacity-50" />}
                    className="text-foreground/80 hover:text-primary hover:bg-white/10 rounded-full px-4 -ml-4 justify-start"
                  >
                    {link.label}
                  </Button>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div className="space-y-4">
            <h3 className="text-foreground font-semibold text-lg mb-5 pb-2 border-b border-white/20">
              Legal
            </h3>
            <ul className="space-y-3">
              {legalLinks.map((link, index) => (
                <li key={index}>
                  <Button
                    href={link.href}
                    variant="link"
                    icon={<FiArrowRight size={14} className="opacity-50" />}
                    className="text-foreground/80 hover:text-primary hover:bg-white/10 rounded-full px-4 -ml-4 justify-start"
                  >
                    {link.label}
                  </Button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/10 text-center">
          <p className="text-foreground/60 text-sm">
            © {currentYear} SoftSell. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
