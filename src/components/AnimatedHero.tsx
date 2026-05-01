'use client';

import { motion } from 'framer-motion';
import { Mail, GraduationCap, MapPin, BookOpen } from 'lucide-react';
import Image from 'next/image';

export default function AnimatedHero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const photoVariants = {
    hidden: { opacity: 0, scale: 0.8, rotate: -5 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      rotate: 0, 
      transition: { 
        duration: 0.8, 
        ease: "easeOut",
        type: "spring",
        stiffness: 100
      } 
    },
  };

  return (
    <motion.section 
      className="mb-16 bg-gradient-to-br from-primary/5 via-background to-secondary/30 rounded-3xl p-8 md:p-12 border border-border shadow-sm overflow-hidden relative"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
    >
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-accent/10 rounded-full blur-2xl translate-y-1/3 -translate-x-1/4"></div>

      <div className="flex flex-col md:flex-row gap-8 items-center md:items-start relative z-10">
        <motion.div variants={photoVariants} className="shrink-0 group">
          <div className="relative w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-background shadow-xl group-hover:shadow-primary/20 transition-all duration-500">
            <Image
              src="/profile.png"
              alt="S S Kiran"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              priority
            />
          </div>
          <div className="absolute inset-0 w-40 h-40 md:w-48 md:h-48 rounded-full border border-primary/20 scale-105 -z-10 group-hover:rotate-12 transition-transform duration-700 hidden md:block"></div>
        </motion.div>

        <div className="text-center md:text-left flex-1">
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
            <GraduationCap size={16} />
            <span>Assistant Professor</span>
          </motion.div>
          
          <motion.h1 variants={itemVariants} className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4 text-foreground">
            Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/60">S S Kiran</span>
          </motion.h1>
          
          <motion.p variants={itemVariants} className="text-lg md:text-xl text-muted-foreground mb-6 max-w-2xl leading-relaxed">
            Welcome to my digital space! I share thoughts, tutorials, and insights on Electronics and Communication Engineering. Exploring the intersection of technology and education.
          </motion.p>
          
          <motion.div variants={itemVariants} className="flex flex-wrap gap-4 justify-center md:justify-start text-sm text-muted-foreground font-medium">
            <div className="flex items-center gap-2 bg-background/50 backdrop-blur-sm px-4 py-2 rounded-lg border border-border shadow-sm hover:shadow-md transition-shadow">
              <BookOpen size={16} className="text-primary" />
              <span>Dept of ECE</span>
            </div>
            <a href="mailto:contact@example.com" className="flex items-center gap-2 bg-background/50 backdrop-blur-sm px-4 py-2 rounded-lg border border-border shadow-sm hover:text-primary hover:border-primary/30 transition-all cursor-pointer">
              <Mail size={16} className="text-primary" />
              <span>Contact Me</span>
            </a>
            <a href="https://www.youtube.com/channel/UCtzuJLOveI88Oq3hwj7iRyg" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-background/50 backdrop-blur-sm px-4 py-2 rounded-lg border border-border shadow-sm hover:text-[#FF0000] hover:border-[#FF0000]/30 transition-all cursor-pointer">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-current">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
              <span>YouTube Channel</span>
            </a>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
