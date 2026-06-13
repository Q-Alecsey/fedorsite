import { useState} from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Variants } from 'framer-motion';
import clsx from 'clsx';
import { useScrollLock } from '@CustomHooks/useScrollLock';
import styles from './Header.module.scss';

interface NavItem {
  label: string;
  targetId: string;
}

const navItems: NavItem[] = [
  { label: 'Главная', targetId: 'hero' },
  { label: 'Обо мне', targetId: 'aboutme' },
  { label: 'Видео', targetId: 'video' },
  { label: 'Кейсы', targetId: 'stories' },
  { label: 'Отзывы', targetId: 'reviews' },
  { label: 'Контакты', targetId: 'contacts' },
];

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { lockScroll, unlockScroll } = useScrollLock();

  const toggleMenu = () => {
    if (isOpen) {
      unlockScroll();
    } else {
      lockScroll();
    }
    setIsOpen(!isOpen);
  };

  const handleNavClick = (targetId: string) => {
    if (isOpen) {
      unlockScroll();
      setIsOpen(false);
    }
    const element = document.getElementById(targetId);
    if (element) {
      const offset = 80; // height of header
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  // Burger lines SVG morphing variants
  const path1Variants: Variants = {
    closed: { d: 'M 2 2.5 L 20 2.5' },
    open: { d: 'M 3 15.5 L 17 2.5' },
  };
  const path2Variants: Variants = {
    closed: { opacity: 1 },
    open: { opacity: 0 },
  };
  const path3Variants: Variants = {
    closed: { d: 'M 2 15.5 L 20 15.5' },
    open: { d: 'M 3 2.5 L 17 15.5' },
  };

  // Mobile Menu curtain animation
  const menuVariants: Variants = {
    closed: {
      opacity: 0,
      x: '100%',
      transition: {
        type: 'spring' as const,
        stiffness: 300,
        damping: 30,
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
    open: {
      opacity: 1,
      x: 0,
      transition: {
        type: 'spring' as const,
        stiffness: 300,
        damping: 30,
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const linkVariants: Variants = {
    closed: { opacity: 0, y: 20 },
    open: { opacity: 1, y: 0 },
  };

  return (
    <>
      <header className={clsx(styles.header)}>
        <div className={clsx('container', styles.container)}>
          <div className={styles.logo} onClick={() => handleNavClick('hero')}>
            <span className={styles.logoIcon}>∑</span>
            Fedor<span>.Math & IT</span>
          </div>

          <nav className={styles.nav}>
            {navItems.map((item) => (
              <span
                key={item.targetId}
                className={styles.navLink}
                onClick={() => handleNavClick(item.targetId)}
              >
                {item.label}
              </span>
            ))}
          </nav>

          <button
            className={styles.burgerBtn}
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <svg width="22" height="18" viewBox="0 0 22 18" className={styles.burgerSvg}>
              <motion.path
                fill="transparent"
                strokeWidth="2"
                stroke="currentColor"
                strokeLinecap="round"
                variants={path1Variants}
                animate={isOpen ? 'open' : 'closed'}
                transition={{ duration: 0.2 }}
              />
              <motion.path
                fill="transparent"
                strokeWidth="2"
                stroke="currentColor"
                strokeLinecap="round"
                d="M 2 9 L 20 9"
                variants={path2Variants}
                animate={isOpen ? 'open' : 'closed'}
                transition={{ duration: 0.2 }}
              />
              <motion.path
                fill="transparent"
                strokeWidth="2"
                stroke="currentColor"
                strokeLinecap="round"
                variants={path3Variants}
                animate={isOpen ? 'open' : 'closed'}
                transition={{ duration: 0.2 }}
              />
            </svg>
          </button>
        </div>
      </header>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={styles.mobileMenu}
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
          >
            {navItems.map((item) => (
              <motion.span
                key={item.targetId}
                className={styles.mobileLink}
                variants={linkVariants}
                onClick={() => handleNavClick(item.targetId)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                {item.label}
              </motion.span>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
