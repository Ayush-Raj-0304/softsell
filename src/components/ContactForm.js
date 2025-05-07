"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { FiCheckCircle } from "react-icons/fi";
import Button from "./Button";

const licenseTypes = [
  { id: "enterprise", label: "Enterprise License" },
  { id: "volume", label: "Volume License" },
  { id: "subscription", label: "Subscription License" },
  { id: "perpetual", label: "Perpetual License" },
  { id: "saas", label: "SaaS License" },
  { id: "other", label: "Other" },
];

const ContactSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .regex(/^[a-zA-Z\s]+$/, "Name must only contain letters"),
  email: z.string().email("Invalid email address"),
  company: z.string().min(1, "Company is required"),
  licenseType: z.string().min(1, "Please select a license type"),
  message: z.string().min(1, "Message is required"),
});

const ContactForm = () => {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(ContactSchema),
  });

  const onSubmit = (data) => {
    console.log("Form submitted:", data);
    setSubmitted(true);
    reset();
  };

  return (
    <section id="contact" className="py-24 mesh-gradient-1 relative">
      <div className="absolute inset-0 backdrop-blur-[2px]" />
      <div className="absolute -top-40 right-0 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl" />
      <div className="absolute -bottom-40 left-0 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="glass inline-block px-8 py-4 rounded-full mb-6">
            <h2 className="text-3xl md:text-4xl font-extralight tracking-tight leading-tight text-[color:var(--foreground)]">
              Get a <span className="text-primary">Free Valuation</span>
            </h2>
          </div>
          <p className="max-w-3xl mx-auto text-lg text-[color:var(--foreground)]/80">
            Fill out the form below and we'll provide a free valuation of your software licenses
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          <motion.div
            className="glass backdrop-blur-md rounded-3xl border border-white/20 dark:border-white/10 shadow-xl"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            {submitted ? (
              <div className="text-center py-10">
                <FiCheckCircle className="mx-auto text-green-500 mb-4" size={60} />
                <h3 className="text-2xl font-bold text-[color:var(--foreground)] mb-2">Thank You!</h3>
                <p className="text-[color:var(--foreground)]/80 mb-6">
                  Your request has been submitted successfully. We'll get back to you with a valuation shortly.
                </p>
                <Button onClick={() => setSubmitted(false)} variant="primary">
                  Submit Another Request
                </Button>
              </div>
            ) : (
              <motion.form onSubmit={handleSubmit(onSubmit)} className="space-y-6 p-8"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
              >
                {renderInput("name", "Name", "text", register, errors)}
                {renderInput("email", "Email", "email", register, errors)}
                {renderInput("company", "Company", "text", register, errors)}

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileHover={{ y: -5,   }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7 }}
                >
                  <label htmlFor="licenseType" className="block text-sm font-medium text-[color:var(--foreground)]/80 mb-1">
                    License Type *
                  </label>
                  <select
                    id="licenseType"
                    {...register("licenseType")}
                    className={inputClass(errors.licenseType)}
                  >
                    <option  value="">Select a license type</option>
                    {licenseTypes.map((type) => (
                      <option key={type.id} value={type.id}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                  {errors.licenseType && <p className="text-sm text-red-500 mt-1">{errors.licenseType.message}</p>}
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileHover={{ y: -5,   }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7 }}
                >
                  <label htmlFor="message" className="block text-sm font-medium text-[color:var(--foreground)]/80 mb-1">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    {...register("message")}
                    rows={4}
                    className={inputClass(errors.message)}
                    placeholder="Describe the software licenses you'd like to sell"
                  ></textarea>
                  {errors.message && <p className="text-sm text-red-500 mt-1">{errors.message.message}</p>}
                </motion.div>

                <motion.div 
                  className="mt-16 text-center"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.6 }}
                >
                  <Button 
                    type="submit"
                    variant="primary"
                  >
                    Get My Valuation
                  </Button>
                </motion.div>
              </motion.form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Render input field
function renderInput(name, label, type, register, errors) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileHover={{ y: -5,   }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
    >
      <label htmlFor={name} className="block text-sm font-medium text-[color:var(--foreground)]/80 mb-1">
        {label} *
      </label>
      <input
        type={type}
        id={name}
        {...register(name)}
        className={inputClass(errors[name])}
        placeholder={`Your ${label.toLowerCase()}`}
      />
      {errors[name] && <p className="text-sm text-red-500 mt-1">{errors[name].message}</p>}
    </motion.div>
  );
}

// Dynamic input style based on errors
function inputClass(error) {
  return `
    w-full px-4 py-2 rounded-3xl border text-sm transition 
    bg-white/70 text-gray-900 placeholder-gray-500
     dark:bg-white/10 dark:text-gray-400 dark:placeholder-gray-400
    backdrop-blur-sm 
    focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
    ${error ? "border-red-500 dark:border-red-400" : "border-gray-300 dark:border-zinc-600"}
  `;
}


export default ContactForm;
