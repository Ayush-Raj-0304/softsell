"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Button from "./Button";
import Container from "./Container";

const HeroSection = () => {
  return (
    <section className="flex items-center justify-center min-h-screen mesh-gradient-1 pt-16">
      <Container className="py-20 md:py-28">
        <motion.div
          className="glass p-8 md:p-12 rounded-3xl shadow-xl"
          whileHover={{ scale: 1.02 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex flex-col-reverse md:flex-row items-center gap-10">
            {/* Text Content */}
            <div className="md:w-1/2">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extralight tracking-tight leading-tight text-adaptive mb-4">
                Turn Unused Software Licenses Into{" "}
                <span className="text-primary">Cash</span>
              </h1>
              <p className="text-xl text-adaptive-muted mb-8">
                SoftSell makes it easy to sell your surplus software licenses. Get instant valuations and quick payments without the hassle.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button href="#contact" variant="primary" fullWidth>
                    Get a Quote
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button href="#how-it-works" variant="outline" fullWidth>
                    Learn More
                  </Button>
                </motion.div>
              </div>
            </div>

            {/* Image Inside Same Glass Panel */}
            <div className="md:w-1/2 flex justify-center">
              <div className="relative w-full max-w-md">
                <Image
                  src="/971.jpg"
                  alt="Hero Illustration"
                  width={600}
                  height={600}
                  className="rounded-3xl object-contain w-full h-auto shadow-lg"
                  priority
                />
              </div>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
};

export default HeroSection;
