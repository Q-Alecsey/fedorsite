import { motion } from 'framer-motion';
import clsx from 'clsx';
import styles from './Footer.module.scss';

export const Footer = () => {
  return (
    <footer id="contacts" className={styles.footer}>
      <div className={clsx('container', styles.container)}>
        <div className={styles.content}>
          <div className={styles.logo}>
            ∑ Fedor<span>.Math & IT</span>
          </div>
          <p className={styles.description}>
            Профессиональная подготовка к ЕГЭ, ОГЭ и олимпиадам по математике и информатике. 
            Индивидуальный подход, обучение программированию и логическому мышлению. 
            Сдавайте экзамены без стресса и с уверенностью.
          </p>
        </div>

        {/* Social Contact Area */}
        <div className={styles.ctaSection}>
          <span className={styles.ctaText}>Связаться со мной</span>
          <div className={styles.socialButtons}>
            {/* Telegram Button */}
            <motion.a
              href="https://t.me/foringate" 
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialBtn}
              data-platform="telegram"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.19-.04-.27-.02-.12.02-1.96 1.24-5.54 3.65-.52.36-.99.53-1.41.52-.46-.01-1.34-.26-2-.48-.8-.27-1.44-.42-1.39-.89.03-.25.38-.51 1.06-.78 4.14-1.8 6.9-3 8.28-3.58 3.94-1.66 4.76-1.95 5.3-.15.01-.01.01 0 0 0z" />
              </svg>
            </motion.a>

            {/* Yandex Mail Button */}
            <motion.a
              href="mailto:chemerisovfedor@yandex.ru" // Replace with actual link or placeholder
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialBtn}
              data-platform="yandex"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
            </motion.a>
          </div>
        </div>

        <div className={styles.bottomBar}>
          <span className={styles.copyright}>
            © {new Date().getFullYear()} Fedor Math. Все права защищены.
          </span>
        </div>
      </div>
    </footer>
  );
};
