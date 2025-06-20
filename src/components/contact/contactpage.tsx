import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Phone, Mail, MapPin, Twitter, Instagram, MessageCircle, Send } from 'lucide-react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

// Zod validation schema
const contactSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Please enter a valid email address'),
  phoneNumber: z.string().min(10, 'Please enter a valid phone number'),
  subject: z.enum(['General Inquiry', 'Health Inquiry', 'Delivery Inquiry', 'Support Inquiry'], {
    required_error: 'Please select a subject',
  }),
  message: z.string().min(10, 'Message must be at least 10 characters long'),
});

type ContactFormData = z.infer<typeof contactSchema>;

const AnimatedSection = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        visible: { opacity: 1, y: 0 },
        hidden: { opacity: 0, y: 20 },
      }}
      transition={{ duration: 0.6, delay }}
    >
      {children}
    </motion.div>
  );
};

const ContactForm: React.FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      subject: 'General Inquiry',
      message: '',
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('Form submitted:', data);
    alert('Message sent successfully!');
    reset();
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center text-black p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-6xl bg-white rounded-2xl shadow-xl overflow-hidden"
      >
        <div className="flex flex-col lg:flex-row">
          {/* Left Panel - Contact Information */}
          <div className="lg:w-2/5 bg-black text-white p-8 lg:p-12 relative overflow-hidden">
            <div className="relative z-10">
              <motion.h2 
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-3xl font-bold mb-4"
              >
                Contact Information
              </motion.h2>
              
              <motion.p 
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-gray-300 mb-12"
              >
                Let's get acquainted with food and tradition!
              </motion.p>
              
              <div className="space-y-8">
                <AnimatedSection delay={0.4}>
                  <div className="flex items-center space-x-4 group">
                    <div className="p-2 bg-yellow-400 rounded-full group-hover:rotate-6 transition-transform">
                      <Phone className="w-5 h-5 text-black" />
                    </div>
                    <span className="text-lg">+254 12 3456 789</span>
                  </div>
                </AnimatedSection>
                
                <AnimatedSection delay={0.5}>
                  <div className="flex items-center space-x-4 group">
                    <div className="p-2 bg-yellow-400 rounded-full group-hover:rotate-6 transition-transform">
                      <Mail className="w-5 h-5 text-black" />
                    </div>
                    <span className="text-lg">villagechef@gmail.com</span>
                  </div>
                </AnimatedSection>
                
                <AnimatedSection delay={0.6}>
                  <div className="flex items-start space-x-4 group">
                    <div className="p-2 bg-yellow-400 rounded-full group-hover:rotate-6 transition-transform mt-1">
                      <MapPin className="w-5 h-5 text-black" />
                    </div>
                    <div className="text-lg">
                      <div>Lumumba Street Westlands</div>
                      <div>Nairobi, Kenya</div>
                    </div>
                  </div>
                </AnimatedSection>
              </div>
              
              <AnimatedSection delay={0.7}>
                <div className="flex space-x-6 mt-16">
                  <motion.a 
                    whileHover={{ y: -3 }}
                    className="p-2 bg-gray-800 rounded-full hover:bg-yellow-400 transition-colors"
                  >
                    <Twitter className="w-5 h-5 text-white hover:text-black" />
                  </motion.a>
                  <motion.a 
                    whileHover={{ y: -3 }}
                    className="p-2 bg-gray-800 rounded-full hover:bg-yellow-400 transition-colors"
                  >
                    <Instagram className="w-5 h-5 text-white hover:text-black" />
                  </motion.a>
                  <motion.a 
                    whileHover={{ y: -3 }}
                    className="p-2 bg-gray-800 rounded-full hover:bg-yellow-400 transition-colors"
                  >
                    <MessageCircle className="w-5 h-5 text-white hover:text-black" />
                  </motion.a>
                </div>
              </AnimatedSection>
            </div>
            
            {/* Decorative elements */}
            <motion.div 
              animate={{ 
                y: [0, 10, 0],
                rotate: [0, 5, 0]
              }}
              transition={{ 
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute bottom-8 right-8 w-32 h-32 bg-yellow-400 rounded-full opacity-20"
            ></motion.div>
            <motion.div 
              animate={{ 
                y: [0, -10, 0],
                rotate: [0, -5, 0]
              }}
              transition={{ 
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1
              }}
              className="absolute bottom-16 right-16 w-16 h-16 bg-yellow-400 rounded-full opacity-10"
            ></motion.div>
          </div>
          
          {/* Right Panel - Form */}
          <div className="lg:w-3/5 p-8 lg:p-12">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-3xl font-bold mb-8 text-gray-800"
            >
              Get in Touch
            </motion.h2>
            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Name Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <AnimatedSection delay={0.3}>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      First Name
                    </label>
                    <Controller
                      name="firstName"
                      control={control}
                      render={({ field }) => (
                        <input
                          {...field}
                          type="text"
                          className={`w-full px-0 py-3 border-0 border-b-2 bg-transparent focus:ring-0 focus:border-yellow-400 transition-colors ${
                            errors.firstName ? 'border-red-500' : 'border-gray-300'
                          }`}
                        />
                      )}
                    />
                    {errors.firstName && (
                      <p className="mt-1 text-sm text-red-600">{errors.firstName.message}</p>
                    )}
                  </div>
                </AnimatedSection>
                
                <AnimatedSection delay={0.4}>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Last Name
                    </label>
                    <Controller
                      name="lastName"
                      control={control}
                      render={({ field }) => (
                        <input
                          {...field}
                          type="text"
                          className={`w-full px-0 py-3 border-0 border-b-2 bg-transparent focus:ring-0 focus:border-yellow-400 transition-colors ${
                            errors.lastName ? 'border-red-500' : 'border-gray-300'
                          }`}
                        />
                      )}
                    />
                    {errors.lastName && (
                      <p className="mt-1 text-sm text-red-600">{errors.lastName.message}</p>
                    )}
                  </div>
                </AnimatedSection>
              </div>
              
              {/* Email and Phone */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <AnimatedSection delay={0.5}>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <Controller
                      name="email"
                      control={control}
                      render={({ field }) => (
                        <input
                          {...field}
                          type="email"
                          className={`w-full px-0 py-3 border-0 border-b-2 bg-transparent focus:ring-0 focus:border-yellow-400 transition-colors ${
                            errors.email ? 'border-red-500' : 'border-gray-300'
                          }`}
                        />
                      )}
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                    )}
                  </div>
                </AnimatedSection>
                
                <AnimatedSection delay={0.6}>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <Controller
                      name="phoneNumber"
                      control={control}
                      render={({ field }) => (
                        <input
                          {...field}
                          type="tel"
                          className={`w-full px-0 py-3 border-0 border-b-2 bg-transparent focus:ring-0 focus:border-yellow-400 transition-colors ${
                            errors.phoneNumber ? 'border-red-500' : 'border-gray-300'
                          }`}
                        />
                      )}
                    />
                    {errors.phoneNumber && (
                      <p className="mt-1 text-sm text-red-600">{errors.phoneNumber.message}</p>
                    )}
                  </div>
                </AnimatedSection>
              </div>
              
              {/* Subject Selection */}
              <AnimatedSection delay={0.7}>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-4">
                    Select Subject?
                  </label>
                  <Controller
                    name="subject"
                    control={control}
                    render={({ field }) => (
                      <div className="flex flex-wrap gap-4">
                        {['General Inquiry', 'Health Inquiry', 'Delivery Inquiry', 'Support Inquiry'].map((option, index) => (
                          <label key={index} className="flex items-center cursor-pointer">
                            <input
                              type="radio"
                              {...field}
                              value={option}
                              checked={field.value === option}
                              className="sr-only"
                            />
                            <motion.div 
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className={`w-4 h-4 rounded-full border-2 mr-3 flex items-center justify-center transition-colors ${
                                field.value === option 
                                  ? 'border-yellow-400 bg-yellow-400' 
                                  : 'border-gray-300'
                              }`}
                            >
                              {field.value === option && (
                                <div className="w-2 h-2 rounded-full bg-white"></div>
                              )}
                            </motion.div>
                            <span className={`text-sm ${
                              field.value === option ? 'text-black font-medium' : 'text-gray-600'
                            }`}>
                              {option}
                            </span>
                          </label>
                        ))}
                      </div>
                    )}
                  />
                  {errors.subject && (
                    <p className="mt-1 text-sm text-red-600">{errors.subject.message}</p>
                  )}
                </div>
              </AnimatedSection>
              
              {/* Message */}
              <AnimatedSection delay={0.8}>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <Controller
                    name="message"
                    control={control}
                    render={({ field }) => (
                      <textarea
                        {...field}
                        rows={4}
                        className={`w-full px-0 py-3 border-0 border-b-2 bg-transparent resize-none focus:ring-0 focus:border-yellow-400 transition-colors ${
                          errors.message ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Write your message.."
                      />
                    )}
                  />
                  {errors.message && (
                    <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>
                  )}
                </div>
              </AnimatedSection>
              
              {/* Submit Button */}
              <AnimatedSection delay={0.9}>
                <div className="flex justify-end pt-6">
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className={`flex items-center space-x-2 px-8 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-md ${
                      !isSubmitting && 'hover:shadow-yellow-400/30'
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <span>Send Message</span>
                        <motion.div 
                          animate={{ x: [0, 4, 0] }}
                          transition={{ repeat: Infinity, duration: 1.5 }}
                        >
                          <Send className="w-4 h-4" />
                        </motion.div>
                      </>
                    )}
                  </motion.button>
                </div>
              </AnimatedSection>
            </form>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ContactForm;