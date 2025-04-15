import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import CursorAnimation from '../components/CursorAnimation';
import Footer from '../components/Footer';
import AnimeNavBarDemo from '../components/ui/AnimeNavBarDemo';
import BentoDemo from '../components/features/BentoDemo';
import DarkModeToggle from '../components/ui/DarkModeToggle';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white dark:from-gray-900 dark:to-gray-800 relative overflow-hidden">
      <CursorAnimation />
      
      <AnimeNavBarDemo />
      <DarkModeToggle />
      
      <div className="container mx-auto px-4 pt-24 pb-12">
        <Hero />
        
        <section id="features" className="py-20 relative z-10">
          <div className="text-center mb-16">
            <motion.h2 
              className="text-3xl md:text-4xl font-bold mb-4 text-gray-800 dark:text-gray-100"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              Powerful Features
            </motion.h2>
            <motion.p 
              className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Everything you need to create amazing digital art
            </motion.p>
          </div>
          
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full max-w-6xl mx-auto"
          >
            <BentoDemo />
          </motion.div>
          
          <div className="text-center mt-16">
            <Link 
              to="/canvas"
              className="px-6 py-3 bg-indigo-600 dark:bg-indigo-700 text-white font-medium rounded-full text-lg shadow-md hover:bg-indigo-700 dark:hover:bg-indigo-600 transition-colors inline-block"
            >
              Try It Now
            </Link>
          </div>
        </section>
      </div>
      
      <Footer />
    </div>
  );
}

export default Home;