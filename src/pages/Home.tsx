import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import CursorAnimation from '../components/CursorAnimation';
import Footer from '../components/Footer';
import { FeaturesSectionWithHoverEffects } from '../components/features/FeaturesSectionWithHoverEffects';
import Navbar from '../components/ui/Navbar';
import { GetStartedButton } from '../components/ui/get-started-button';

// Removed unused Button import in favor of GetStartedButton

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white dark:from-gray-900 dark:to-gray-800 relative overflow-hidden">
      <CursorAnimation />
      
      {/* Standard navbar instead of AnimeNavBarDemo */}
      <Navbar />
      
      <div className="container mx-auto px-4 pt-24 pb-12">
        <Hero />
        
        <section id="features" className="py-20 relative z-10">
          <div className="text-center mb-16">
            <motion.h2 
              className="text-3xl md:text-5xl font-semibold mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              Create. Transform. Inspire.
            </motion.h2>
            <motion.p 
              className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Unleash your artistic vision with powerful tools designed for the future of digital creation
            </motion.p>
          </div>
          
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full max-w-6xl mx-auto"
          >
            <FeaturesSectionWithHoverEffects />
          </motion.div>
          
          <div className="text-center mt-16">
            <Link to="/canvas">
              <GetStartedButton>
                Try It Now
              </GetStartedButton>
            </Link>
          </div>
        </section>
      </div>
      
      <Footer />
    </div>
  );
}

export default Home;