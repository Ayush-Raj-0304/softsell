import { motion } from "framer-motion";
import { FiShield, FiClock, FiDollarSign, FiUsers } from "react-icons/fi";
import Container from "./Container";
import Button from "./Button";

const benefits = [
  {
    id: 1,
    title: "Best Market Value",
    description: "We analyze market trends to ensure you get the highest possible value for your software licenses.",
    icon: <FiDollarSign size={32} className="text-primary" />,
    delay: 0,
  },
  {
    id: 2,
    title: "Fast Transactions",
    description: "Complete the entire process in under 24 hours, with immediate valuation and quick payments.",
    icon: <FiClock size={32} className="text-primary" />,
    delay: 0,
  },
  {
    id: 3,
    title: "Security Guaranteed",
    description: "Our secure process ensures your license information and personal data remain protected throughout.",
    icon: <FiShield size={32} className="text-primary" />,
    delay: 0,
  },
  {
    id: 4,
    title: "Trusted by Thousands",
    description: "Join over 10,000 businesses that have successfully sold their licenses through SoftSell.",
    icon: <FiUsers size={32} className="text-primary" />,
    delay: 0,
  },
];

const WhyChooseUs = () => {
  return (
    <section id="why-choose-us" className="py-24 mesh-gradient-1">
      <div className="relative">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-primary/20 rounded-full filter blur-3xl"></div>
        <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-secondary/20 rounded-full filter blur-3xl"></div>
      </div>
      <Container className="relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="glass inline-block px-8 py-4 rounded-full mb-6">
            <h2 className="text-3xl md:text-4xl font-extralight tracking-tight leading-tight text-adaptive">
              Why Choose <span className="text-primary">SoftSell</span>
            </h2>
          </div>
          <p className="max-w-3xl mx-auto text-lg text-adaptive-muted">
            We offer the most efficient and valuable way to monetize your unused software licenses
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit) => (
            <motion.div 
              key={benefit.id}
              className="glass p-6 rounded-3xl hover:shadow-xl transition-all duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.1, delay: benefit.delay }}
              whileHover={{ y: -10, boxShadow: "0 15px 30px rgba(0,0,0,0.1)" }}
            >
              <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-primary/20 backdrop-blur-md mb-6">
                {benefit.icon}
              </div>
              <h3 className="text-xl font-bold text-adaptive mb-3">
                {benefit.title}
              </h3>
              <p className="text-adaptive-muted">
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </div>
        
        <div 
          className="mt-16 text-center"
        >
          <Button 
            href="#contact" 
            variant="primary"
          >
            Get Started Today
          </Button>
        </div>
      </Container>
    </section>
  );
};

export default WhyChooseUs; 