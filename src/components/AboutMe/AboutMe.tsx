import { useState } from 'react';
import { motion } from 'framer-motion';
import clsx from 'clsx';
import styles from './AboutMe.module.scss';

export const AboutMe = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(0); // Open the first item by default for better UX

  const accordionItems = [
    {
      id: 'experience-education',
      title: 'Опыт и образование',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 10v6M2 10l10-5 10 5-10 5-10-5z" />
          <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5" />
        </svg>
      ),
      content: (
        <div className={styles.contentBlock}>
          <div className={styles.infoRow}>
            <span className={styles.label}>Опыт работы:</span>
            <span className={styles.value}>
              <strong>2,5 года</strong> в сфере репетиторства по математике и информатике.
            </span>
          </div>
          <div className={styles.infoRow}>
            <span className={styles.label}>Преподавание:</span>
            <span className={styles.value}>
              С 2024 года преподаю олимпиадную математику и информатику в <strong>ГБОУ Лицей №1514</strong> («Лицей при МГУ»).
            </span>
          </div>
          <div className={styles.divider} />
          <div className={styles.educationBlock}>
            <div className={styles.eduItem}>
              <div className={styles.eduMarker} />
              <div>
                <div className={styles.eduTitle}>МГТУ им. Н.Э. Баумана (бюджет)</div>
                <div className={styles.eduDesc}>
                  Факультет «Информатика и системы управления» (ИУ), кафедра ИУ-5 «Информатика и вычислительная техника».
                </div>
              </div>
            </div>
            <div className={styles.eduItem}>
              <div className={styles.eduMarker} />
              <div>
                <div className={styles.eduTitle}>Лицей №1537 (г. Москва)</div>
                <div className={styles.eduDesc}>
                  Углублённое изучение информационных технологий.
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'specialization',
      title: 'Специализация и направления',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="16 18 22 12 16 6" />
          <polyline points="8 6 2 12 8 18" />
          <line x1="14" y1="4" x2="10" y2="20" />
        </svg>
      ),
      content: (
        <div className={styles.contentBlock}>
          <p className={styles.paragraph}>
            Мой подход строится на выстраивании прочных логических связей и практическом программировании, без зубрёжки формул.
          </p>
          <ul className={styles.bulletsList}>
            <li>
              <strong>Углублённая (олимпиадная) математика и информатика</strong> — развитие логического и нестандартного мышления.
            </li>
            <li>
              <strong>Системная подготовка к ОГЭ</strong> по математике и информатике.
            </li>
            <li>
              <strong>Подготовка к ЕГЭ</strong> по математике (профильный уровень) и информатике.
            </li>
          </ul>
        </div>
      ),
    },
    {
      id: 'achievements',
      title: 'Достижения и результаты',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
          <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
          <path d="M4 22h16" />
          <path d="M10 14.66V17c0 .55-.45 1-1 1H4v2h16v-2h-5c-.55 0-1-.45-1-1v-2.34" />
          <path d="M12 2a5 5 0 0 1 5 5v5a5 5 0 0 1-5 5 5 5 0 0 1-5-5V7a5 5 0 0 1 5-5z" />
        </svg>
      ),
      content: (
        <div className={styles.contentBlock}>
          <div className={styles.subHeader}>Личные успехи:</div>
          <div className={styles.gridList}>
            <div className={styles.gridCard}>
              <div className={styles.cardVal}>296</div>
              <div className={styles.cardLbl}>Баллов ЕГЭ</div>
            </div>
            <div className={styles.gridCard}>
              <div className={styles.cardVal}>100</div>
              <div className={styles.cardLbl}>Математика</div>
            </div>
            <div className={styles.gridCard}>
              <div className={styles.cardVal}>98</div>
              <div className={styles.cardLbl}>Информатика</div>
            </div>
          </div>
          
          <ul className={styles.bulletsList}>
            <li>Победитель олимпиады <strong>«Росатом»</strong> по математике.</li>
            <li>Призёр Открытой московской математической олимпиады (<strong>ОММО</strong>).</li>
            <li>Призёр олимпиады <strong>«Шаг в будущее»</strong>.</li>
            <li>
              Автор и докладчик проекта <strong>«Smart Drive»</strong> (web-приложение для логистики грузоперевозок), отмеченного на конференциях и приобретённого компанией <strong>ООО «Техноресурс»</strong>.
            </li>
          </ul>

          <div className={styles.divider} />
          <div className={styles.subHeader}>Результаты учеников:</div>
          <ul className={styles.bulletsList}>
            <li>
              Подготовил <strong>2 стобалльников</strong> по ЕГЭ по математике и <strong>3 стобалльников</strong> по ЕГЭ по информатике.
            </li>
            <li>
              Минимальный результат учеников на ОГЭ — оценка <strong>«4» (хорошо)</strong>.
            </li>
          </ul>
        </div>
      ),
    },
    {
      id: 'principles',
      title: 'Профессиональный принцип',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A5 5 0 0 0 8 8c0 1 .3 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" />
          <line x1="9" y1="18" x2="15" y2="18" />
          <line x1="10" y1="22" x2="14" y2="22" />
        </svg>
      ),
      content: (
        <div className={styles.contentBlock}>
          <blockquote className={styles.quote}>
            «Никогда не откладывай на завтра то, что можно сделать послезавтра»
            <cite>— Чемерисов Фёдор, 500 лет до н.э. 😉</cite>
          </blockquote>
          
          <p className={styles.paragraph}>
            В основе моего преподавания лежит концепция <strong>«Обучение через понимание»</strong>. Мы не заучиваем сухие алгоритмы. Моя цель — показать красоту точных наук, научить ученика не бояться ошибок и видеть в багах лишь повод улучшить архитектуру решения.
          </p>
        </div>
      ),
    }
  ];

  return (
    <section id="aboutme" className={styles.aboutSection}>
      <div className={clsx('container', styles.container)}>
        <div className={styles.grid}>
          
          {/* Centered Column: Title & Accordion Content */}
          <div className={styles.textColumn}>
            <div className={styles.badge}>О преподавателе</div>
            <h2 className={styles.title}>
              Давайте знакомиться: <br /><span>Чемерисов Фёдор Алексеевич</span>
            </h2>
            
            <p className={styles.introText}>
              Привет! Я помогаю школьникам перестать бояться точных наук, 
              понять внутреннюю логику математики и информатики, 
              и успешно сдать ОГЭ/ЕГЭ на высокие баллы без зубрёжки шаблонов.
            </p>

            {/* Accordion Component */}
            <div className={styles.accordion}>
              {accordionItems.map((item, index) => {
                const isOpen = activeIndex === index;
                return (
                  <div 
                    key={item.id} 
                    className={clsx(styles.accordionItem, isOpen && styles.open)}
                  >
                    <button 
                      className={styles.accordionHeader} 
                      onClick={() => setActiveIndex(isOpen ? null : index)}
                      aria-expanded={isOpen}
                    >
                      <div className={styles.accordionHeaderLeft}>
                        <div className={styles.iconWrapper}>
                          {item.icon}
                        </div>
                        <span className={styles.accordionTitle}>{item.title}</span>
                      </div>
                      <span className={styles.arrowWrapper}>
                        <svg viewBox="0 0 10 6" className={styles.arrowIcon}>
                          <path d="M1 1l4 4 4-4" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                    </button>
                    
                    <motion.div
                      initial={false}
                      animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className={styles.accordionContentWrapper}
                    >
                      <div className={styles.accordionContent}>
                        {item.content}
                      </div>
                    </motion.div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
