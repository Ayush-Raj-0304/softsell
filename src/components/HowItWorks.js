import { motion } from "framer-motion";
import { FiUpload, FiDollarSign, FiCreditCard } from "react-icons/fi";

const steps = [
  {
    id: 1,
    title: "Upload License",
    description: "Submit your software license details through our secure portal. We support all major software vendors.",
    icon: <FiUpload size={48} className="text-blue-600" />,
    delay: 0,
  },
  {
    id: 2,
    title: "Get Valuation",
    description: "Our AI-powered system analyzes your license and provides an instant market valuation based on current demand.",
    icon: <FiDollarSign size={48} className="text-green-500" />,
    delay: 0,
  },
  {
    id: 3,
    title: "Get Paid",
    description: "Accept our offer and receive payment within 24 hours. Choose from multiple payout methods including bank transfer or PayPal.",
    icon: <FiCreditCard size={48} className="text-purple-500" />,
    delay: 0,
  },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-24 mesh-gradient-2 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-50/50 dark:to-zinc-900/50"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="glass inline-block px-8 py-4 rounded-full mb-6">
            <h2 className="text-3xl md:text-4xl font-extralight tracking-tight leading-tight text-adaptive">
              How It <span className="text-primary">Works</span>
            </h2>
          </div>
          <p className="max-w-3xl mx-auto text-lg  text-adaptive-muted">
            Three simple steps to turn your unused software licenses into cash
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step) => (
            <motion.div 
              key={step.id}
              className="card flex flex-col items-center text-center p-8 hover:shadow-lg"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.1, delay: step.delay }}
              whileHover={{ y: -10, boxShadow: "0 15px 30px rgba(0,0,0,0.1)" }}
            >
              <div className="w-16 h-16 flex items-center justify-center rounded-full glass mb-6">
                {step.icon}
              </div>
              <h3 className="text-xl font-bold dark:text-black mb-3">
                {step.title}
              </h3>
              <p className="dark:text-black">
                {step.description}
              </p>
              <div className="mt-6">
                <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white font-bold">
                  {step.id}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks; 