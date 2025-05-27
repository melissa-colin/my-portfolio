import React from 'react';
import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const AboutSection = ({ language }) => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };
  
  // French version
  const frContent = (
    <>
      <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">À Propos de Moi</h2>
      <div className="section-bar mb-8"></div>
      
      <div className="space-y-6 text-gray-700 dark:text-gray-300">
        <p className="text-lg">
          Je m'appelle <strong>Mélissa Colin</strong>, j'ai 21 ans, et je suis actuellement élève-ingénieure en informatique et intelligence artificielle à l'<strong>ENSEIRB-MATMECA</strong> à Bordeaux, où je poursuis un <strong>parcours ingénieur-docteur</strong> avec l'ambition claire de m'engager dans la <strong>recherche en IA</strong>.
        </p>

        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Un parcours atypique, forgé par la passion</h3>
        <p>
          Ma passion pour l'informatique a commencé très tôt. À <strong>12 ans</strong>, je découvrais Scratch, à <strong>13 ans</strong>, je me formais seule en Python, et à <strong>15 ans</strong>, je choisissais un lycée avec spécialisation en Systèmes d'Information et Numérique. Très vite, je me suis rendue compte que ce qui me captivait, c'était <strong>l'algorithmique</strong>, plus que la création de sites web ou le développement de jeux. J'ai tâtonné un moment – robotique, développement, projets Arduino – avant de trouver une véritable résonance dans l'<strong>intelligence artificielle</strong>.
        </p>
        <p>
          Ce déclic, je l'ai eu lors d'un stage en IA au sein de Cali Intelligences, une start-up spécialisée dans la donnée et l'IA. Ce fut une révélation. Je me suis alors lancée corps et âme dans l'étude de l'IA, avec une volonté : <strong>contribuer activement à son évolution</strong>, en particulier à travers <strong>la conception et l'amélioration des architectures de modèles de deep learning</strong>.
        </p>

        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Une volonté de réorientation et de dépassement</h3>
        <p>
          Issue initialement d'un cursus privé orienté vers la pratique, j'ai fait le choix courageux de me <strong>réorienter vers le public</strong> afin de consolider mes bases théoriques en mathématiques et algorithmique. J'ai intégré l'ENSEIRB-MATMECA, une école réputée pour son exigence académique, malgré les nombreux obstacles et doutes exprimés autour de ma candidature. Ma détermination a payé : j'ai intégré la formation en étant classée <strong>première sur liste complémentaire</strong>, prouvant que <strong>la motivation et l'autodidaxie peuvent rivaliser avec les parcours les plus classiques</strong>.
        </p>
      </div>
      
      <div className="mt-8">
        <Link to="/research" className="btn-outline flex items-center w-fit">
          Découvrir ma recherche <FiArrowRight className="ml-2" />
        </Link>
      </div>
    </>
  );
  
  // English version (translated)
  const enContent = (
    <>
      <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">About Me</h2>
      <div className="section-bar mb-8"></div>
      
      <div className="space-y-6 text-gray-700 dark:text-gray-300">
        <p className="text-lg">
          My name is <strong>Mélissa Colin</strong>, I'm 21 years old, and I'm currently an engineering student in computer science and artificial intelligence at <strong>ENSEIRB-MATMECA</strong> in Bordeaux, where I'm pursuing an <strong>engineer-doctor track</strong> with the clear ambition to engage in <strong>AI research</strong>.
        </p>

        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">An atypical journey, forged by passion</h3>
        <p>
          My passion for computer science began very early. At <strong>12 years old</strong>, I discovered Scratch, at <strong>13</strong>, I taught myself Python, and by <strong>15</strong>, I chose a high school specializing in Information Systems and Digital Technology. Very quickly, I realized that what fascinated me was <strong>algorithmic design</strong>, more than website creation or game development. I experimented for a while – robotics, development, Arduino projects – before finding a true resonance in <strong>artificial intelligence</strong>.
        </p>
        <p>
          This realization came during an AI internship at Cali Intelligences, a startup specializing in data and AI. It was a revelation. I then threw myself wholeheartedly into the study of AI, with one goal: <strong>to actively contribute to its evolution</strong>, particularly through <strong>the design and improvement of deep learning model architectures</strong>.
        </p>

        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">A determination to reorient and excel</h3>
        <p>
          Initially coming from a private curriculum oriented toward practical applications, I made the courageous choice to <strong>transition to public education</strong> in order to strengthen my theoretical foundations in mathematics and algorithms. I entered ENSEIRB-MATMECA, a school known for its academic rigor, despite the many obstacles and doubts expressed about my application. My determination paid off: I entered the program ranked <strong>first on the waiting list</strong>, proving that <strong>motivation and self-teaching can compete with the most traditional educational paths</strong>.
        </p>
      </div>
      
      <div className="mt-8">
        <Link to="/research" className="btn-outline flex items-center w-fit">
          Discover my research <FiArrowRight className="ml-2" />
        </Link>
      </div>
    </>
  );

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <motion.div 
          className="max-w-4xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div variants={itemVariants}>
            {language === 'fr' ? frContent : enContent}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;