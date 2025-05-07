import { motion } from "framer-motion";
import { FiStar } from "react-icons/fi";

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "IT Director",
    company: "TechGiant Inc.",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
    content: "SoftSell made it incredibly easy to recoup costs from our unused enterprise licenses. Their valuation was fair and the payment was processed within hours. I highly recommend their service to any IT department looking to optimize their software budget.",
    stars: 5,
    delay: 0,
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Finance Manager",
    company: "Global Solutions Ltd.",
    image: "https://randomuser.me/api/portraits/men/22.jpg",
    content: "As a finance manager, I'm always looking for ways to recover costs. SoftSell helped us monetize over 50 unused software licenses that were just sitting idle. The process was straightforward and their customer service was excellent.",
    stars: 5,
    delay: 0,
  },
];

const Testimonials = () => {
  return (
    <section id="testimonials" className="py-24 mesh-gradient-2 relative">
      <div className="absolute inset-0 bg-gradient-to-t from-transparent to-gray-50/50 dark:to-zinc-900/50"></div>
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
              What Our <span className="text-primary">Customers Say</span>
            </h2>
          </div>
          <p className="max-w-3xl mx-auto text-lg text-adaptive-muted">
            Don't just take our word for it — hear from businesses that have successfully sold their licenses with us
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial) => (
            <motion.div 
              key={testimonial.id}
              className="card backdrop-blur-md p-8"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.1, delay: testimonial.delay }}
              whileHover={{ y: -10, boxShadow: "0 15px 30px rgba(0,0,0,0.1)" }}
            >
              <div className="flex mb-6">
                {[...Array(testimonial.stars)].map((_, i) => (
                  <FiStar key={i} className="text-yellow-400 fill-current" size={20} />
                ))}
              </div>
              <p className="dark:text-black mb-6 italic">
                "{testimonial.content}"
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full overflow-hidden mr-4 ring-4 ring-primary/30">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-bold dark:text-black">
                    {testimonial.name}
                  </h4>
                  <p className="text-sm dark:text-black">
                    {testimonial.role}, {testimonial.company}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials; 