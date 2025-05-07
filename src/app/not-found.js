"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import Button from "@/components/Button";

export default function NotFound() {
  return (
    <div className="min-h-screen mesh-gradient-2 with-noise flex items-center justify-center px-4">
      <motion.div
        className="glass p-10 rounded-2xl max-w-lg w-full text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-9xl font-bold text-primary">404</h1>
          <h2 className="text-2xl font-semibold text-heading mt-4">
            Page Not Found
          </h2>
          <p className="text-body mt-4">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <Link href="/">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button variant="primary" fullWidth>
                Back To Home
              </Button>
            </motion.div>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
} 