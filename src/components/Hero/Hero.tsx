import React from 'react';
import { motion, useMotionValue, useTransform, useSpring, useScroll } from 'framer-motion';
import type { Variants } from 'framer-motion';
import clsx from 'clsx';
import styles from './Hero.module.scss';

export const Hero = () => {
  const { scrollY } = useScroll();
  
  // Mouse movement parallax hookup
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    // Normalize mouse coords to [-0.5, 0.5] range
    mouseX.set((clientX / innerWidth) - 0.5);
    mouseY.set((clientY / innerHeight) - 0.5);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  // Create spring-smoothed parallax values for different depths (different speeds)
  const springConfig = { damping: 60, stiffness: 150 };

  // Layer 1 (Closest, fastest)
  const moveX1 = useSpring(useTransform(mouseX, [-0.5, 0.5], [-60, 60]), springConfig);
  const moveY1 = useSpring(useTransform(mouseY, [-0.5, 0.5], [-60, 60]), springConfig);
  const scrollY1 = useTransform(scrollY, [0, 800], [0, -200]);

  // Layer 2 (Medium depth)
  const moveX2 = useSpring(useTransform(mouseX, [-0.5, 0.5], [-40, 40]), springConfig);
  const moveY2 = useSpring(useTransform(mouseY, [-0.5, 0.5], [-40, 40]), springConfig);
  const scrollY2 = useTransform(scrollY, [0, 800], [0, -120]);

  // Layer 3 (Deepest, slowest)
  const moveX3 = useSpring(useTransform(mouseX, [-0.5, 0.5], [-20, 20]), springConfig);
  const moveY3 = useSpring(useTransform(mouseY, [-0.5, 0.5], [-20, 20]), springConfig);
  const scrollY3 = useTransform(scrollY, [0, 800], [0, -60]);

  // SVG drawing animation variants
  const drawPath: Variants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { type: 'spring' as const, duration: 2.5, bounce: 0 },
        opacity: { duration: 0.5 }
      }
    }
  };

  return (
    <section 
      id="hero" 
      className={styles.heroSection}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Floating Parallax Elements */}
      <motion.div 
        className={clsx(styles.parallaxItem, styles.formula1)}
        style={{ x: moveX1, y: useTransform(scrollY1, y => y + moveY1.get()) }}
      >
        ∫ e<sup>x</sup> dx = e<sup>x</sup> + C
      </motion.div>

      <motion.div 
        className={clsx(styles.parallaxItem, styles.formula2)}
        style={{ x: moveX2, y: useTransform(scrollY2, y => y + moveY2.get()) }}
      >
        sin²x + cos²x = 1
      </motion.div>

      <motion.div 
        className={clsx(styles.parallaxItem, styles.formula3)}
        style={{ x: moveX3, y: useTransform(scrollY3, y => y + moveY3.get()) }}
      >
        x = <span style={{fontSize: '0.8em'}}>(-b ± √D)</span> / 2a
      </motion.div>

      <motion.div 
        className={clsx(styles.parallaxItem, styles.formula4)}
        style={{ x: moveX1, y: useTransform(scrollY2, y => y + moveY1.get()) }}
      >
        for i in range(N):
      </motion.div>

      <motion.div 
        className={clsx(styles.parallaxItem, styles.symbol1)}
        style={{ x: moveX3, y: useTransform(scrollY1, y => y + moveY3.get()) }}
      >
        π
      </motion.div>

      <motion.div 
        className={clsx(styles.parallaxItem, styles.symbol2)}
        style={{ x: moveX2, y: useTransform(scrollY3, y => y + moveY2.get()) }}
      >
        √
      </motion.div>

      <motion.div 
        className={clsx(styles.parallaxItem, styles.symbol3)}
        style={{ x: moveX1, y: useTransform(scrollY2, y => y + moveY1.get()) }}
      >
        O(N log N)
      </motion.div>

      <div className={clsx('container', styles.container)}>
        <div className={styles.grid}>
          {/* Left Column: Heading and description */}
          <motion.div 
            className={styles.content}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <div className={styles.badge}>
              Математика и Информатика
            </div>
            <h1 className={styles.title}>
              Сложные предметы —<br />
              <span>простыми словами</span>
            </h1>
            <p className={styles.description}>
              Индивидуальная подготовка к ЕГЭ, ОГЭ и олимпиадам по математике и информатике.
              Учимся выстраивать строгие логические цепочки, писать эффективный код на Python 
              и понимать алгоритмы, а не просто зазубривать готовые шаблоны.
            </p>

            <div className={styles.features}>
              <div className={styles.featureItem}>
                <div className={styles.featureIcon}>✓</div>
                <div className={styles.featureText}>92.4 — средний балл выпускников на ЕГЭ</div>
              </div>
              <div className={styles.featureItem}>
                <div className={styles.featureIcon}>✓</div>
                <div className={styles.featureText}>Собственная методика объяснений и интерактивный разбор кода</div>
              </div>
              <div className={styles.featureItem}>
                <div className={styles.featureIcon}>✓</div>
                <div className={styles.featureText}>Поддержка, ответы на вопросы и разборы 24/7 в Telegram</div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Premium Math SVG visual inside glassmorphism card */}
          <div className={styles.visualContainer}>
            <motion.div 
              className={styles.glassCard}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
              style={{ x: useTransform(moveX2, x => x * -0.5), y: useTransform(moveY2, y => y * -0.5) }}
              whileHover={{ rotateY: 8, rotateX: -8, scale: 1.02 }}
            >
              <svg 
                viewBox="0 0 300 300" 
                className={styles.mathGraph} 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Grid Lines */}
                <path d="M 0,50 L 300,50 M 0,100 L 300,100 M 0,150 L 300,150 M 0,200 L 300,200 M 0,250 L 300,250" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
                <path d="M 50,0 L 50,300 M 100,0 L 100,300 M 150,0 L 150,300 M 200,0 L 200,300 M 250,0 L 250,300" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
                
                {/* Coordinates Axis */}
                <motion.path 
                  d="M 20,150 L 280,150" 
                  stroke="rgba(255, 255, 255, 0.2)" 
                  strokeWidth="1.5" 
                  variants={drawPath}
                  initial="hidden"
                  animate="visible"
                />
                <motion.path 
                  d="M 150,20 L 150,280" 
                  stroke="rgba(255, 255, 255, 0.2)" 
                  strokeWidth="1.5"
                  variants={drawPath}
                  initial="hidden"
                  animate="visible"
                />
                
                {/* Arrow heads */}
                <path d="M 275,146 L 280,150 L 275,154" stroke="rgba(255, 255, 255, 0.3)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M 146,25 L 150,20 L 154,25" stroke="rgba(255, 255, 255, 0.3)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                
                {/* Trigonometric Circle */}
                <motion.circle 
                  cx="150" 
                  cy="150" 
                  r="70" 
                  stroke="rgba(255,255,255,0.08)" 
                  strokeWidth="1.5" 
                  strokeDasharray="4 4"
                />

                {/* Right Triangle inside unit circle */}
                <motion.path 
                  d="M 150,150 L 200,100 L 200,150 Z" 
                  stroke="rgba(124, 58, 237, 0.4)" 
                  strokeWidth="1.5"
                  fill="rgba(124, 58, 237, 0.05)"
                  variants={drawPath}
                  initial="hidden"
                  animate="visible"
                />

                {/* Angle Arc */}
                <path d="M 170,150 A 20,20 0 0,0 164,136" stroke="#7c3aed" strokeWidth="1.5" />
                <text x="175" y="144" fill="#7c3aed" fontSize="10" fontFamily="serif">θ</text>

                {/* Sine Curve */}
                <motion.path 
                  d="M 20,210 Q 85,90 150,150 T 280,90" 
                  stroke="url(#blueGradient)" 
                  strokeWidth="3.5" 
                  strokeLinecap="round"
                  variants={drawPath}
                  initial="hidden"
                  animate="visible"
                />

                {/* Intersect Points */}
                <motion.circle 
                  cx="200" 
                  cy="100" 
                  r="4" 
                  fill="#2563eb"
                  initial={{ scale: 0 }}
                  animate={{ scale: [0, 1.5, 1] }}
                  transition={{ delay: 1.2, duration: 0.5 }}
                />
                
                <motion.circle 
                  cx="150" 
                  cy="150" 
                  r="3" 
                  fill="#7c3aed"
                  initial={{ scale: 0 }}
                  animate={{ scale: [0, 1.5, 1] }}
                  transition={{ delay: 1.4, duration: 0.5 }}
                />

                {/* Gradients */}
                <defs>
                  <linearGradient id="blueGradient" x1="20" y1="150" x2="280" y2="150" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#2563eb" />
                    <stop offset="50%" stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="#7c3aed" />
                  </linearGradient>
                </defs>
              </svg>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
