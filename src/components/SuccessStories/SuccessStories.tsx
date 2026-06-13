
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';
import styles from './SuccessStories.module.scss';
import studentsRaw from './studentsData.json';

interface Student {
  id: number;
  name: string;
  course: string;
  before: string;
  after: string;
  year: string;
  subject: string;
  level: string;
}

const studentsData = studentsRaw as Student[];

export const SuccessStories = () => {
  const [activeSubject, setActiveSubject] = useState<string>('all');
  const [activeLevel, setActiveLevel] = useState<string>('all');
  const [activeYear, setActiveYear] = useState<string>('all');
  const [visibleCount, setVisibleCount] = useState<number>(6);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  const filteredStudents = studentsData.filter((student) => {
    const matchSubject = activeSubject === 'all' || student.subject === activeSubject;
    const matchLevel = activeLevel === 'all' || student.level === activeLevel;
    const matchYear = activeYear === 'all' || student.year === activeYear;
    return matchSubject && matchLevel && matchYear;
  });

  // Adjust count on mount and when filters change
  useEffect(() => {

    const getCount = () => (window.innerWidth < 676 ? 3 : 6);
    setVisibleCount(getCount());

    let lastWidth = window.innerWidth;
    const handleResize = () => {
      const currentWidth = window.innerWidth;
      const wasMobile = lastWidth < 676;
      const isMobile = currentWidth < 676;
      
      if (wasMobile !== isMobile) {
        setVisibleCount(isMobile ? 3 : 6);
      }
      lastWidth = currentWidth;
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [activeSubject, activeLevel, activeYear]);

  useEffect(() => {
    if (selectedStudent) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedStudent]);

  const handleLoadMore = () => {
    const increment = window.innerWidth < 676 ? 3 : 6;
    setVisibleCount((prev) => prev + increment);
  };

  // Extract unique academic years dynamically from data
  const uniqueYears = Array.from(new Set(studentsData.map((s) => s.year))).sort().reverse();

  return (
    <section id="stories" className={styles.section}>
      <div className="container">
        
        {/* Section Header */}
        <div className={styles.header}>
          <div className={styles.badge}>Истории успеха</div>
          <h2 className={styles.title}>
            Как учатся и побеждают мои <span>ученики</span>
          </h2>
          <p className={styles.subtitle}>
            Реальные кейсы ребят: от преодоления кризисов и ликвидации двоек до поступления на бюджет в лучшие вузы и побед на олимпиадах.
          </p>
        </div>

        {/* Filters Panel */}
        <div className={styles.filtersContainer}>
          {/* Subject Filter */}
          <div className={styles.filterGroup}>
            <span className={styles.filterLabel}>Предмет:</span>
            <div className={styles.tabs}>
              <button 
                className={clsx(styles.tabBtn, activeSubject === 'all' && styles.active)}
                onClick={() => setActiveSubject('all')}
              >
                Все
              </button>
              <button 
                className={clsx(styles.tabBtn, activeSubject === 'math' && styles.active)}
                onClick={() => setActiveSubject('math')}
              >
                Математика
              </button>
              <button 
                className={clsx(styles.tabBtn, activeSubject === 'it' && styles.active)}
                onClick={() => setActiveSubject('it')}
              >
                Информатика
              </button>
            </div>
          </div>

          {/* Level Filter */}
          <div className={styles.filterGroup}>
            <span className={styles.filterLabel}>Уровень:</span>
            <div className={styles.tabs}>
              <button 
                className={clsx(styles.tabBtn, activeLevel === 'all' && styles.active)}
                onClick={() => setActiveLevel('all')}
              >
                Все
              </button>
              <button 
                className={clsx(styles.tabBtn, activeLevel === 'ege' && styles.active)}
                onClick={() => setActiveLevel('ege')}
              >
                ЕГЭ
              </button>
              <button 
                className={clsx(styles.tabBtn, activeLevel === 'oge' && styles.active)}
                onClick={() => setActiveLevel('oge')}
              >
                ОГЭ
              </button>
              <button 
                className={clsx(styles.tabBtn, activeLevel === 'junior' && styles.active)}
                onClick={() => setActiveLevel('junior')}
              >
                4-6 класс / Олимпиады
              </button>
            </div>
          </div>

          {/* Year Filter */}
          <div className={styles.filterGroup}>
            <span className={styles.filterLabel}>Учебный год:</span>
            <div className={styles.tabs}>
              <button 
                className={clsx(styles.tabBtn, activeYear === 'all' && styles.active)}
                onClick={() => setActiveYear('all')}
              >
                Все годы
              </button>
              {uniqueYears.map((year) => (
                <button
                  key={year}
                  className={clsx(styles.tabBtn, activeYear === year && styles.active)}
                  onClick={() => setActiveYear(year)}
                >
                  {year}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Stories Grid */}
        <motion.div 
          layout 
          className={styles.grid}
        >
          <AnimatePresence mode="popLayout">
            {filteredStudents.slice(0, visibleCount).map((student) => (
              <motion.div
                key={student.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className={styles.card}
                onClick={() => setSelectedStudent(student)}
              >
                <div className={styles.cardHeader}>
                  <h3 className={styles.studentName}>{student.name}</h3>
                  <div className={styles.cardBadges}>
                    <span className={styles.courseBadge}>{student.course}</span>
                    <span className={styles.yearBadge}>{student.year}</span>
                  </div>
                </div>
                
                <div className={styles.cardBody}>
                  <div className={styles.teaserItem}>
                    <span className={styles.teaserLabel}>Точка А:</span>
                    <p className={styles.teaserText}>{student.before}</p>
                  </div>
                  <div className={styles.teaserItem}>
                    <span className={styles.teaserLabel}>Точка Б:</span>
                    <p className={styles.teaserText}>{student.after}</p>
                  </div>
                </div>

                <div className={styles.cardFooter}>
                  <span className={styles.readMoreLink}>
                    Читать кейс полностью 
                    <svg viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1 5h12m0 0L9 1m4 4L9 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        {filteredStudents.length === 0 && (
          <div className={styles.emptyState}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            <p>Учеников с выбранными фильтрами не найдено. Попробуйте сбросить фильтры.</p>
          </div>
        )}

        {/* Load More Button */}
        {filteredStudents.length > visibleCount && (
          <div className={styles.actions}>
            <button className={styles.loadMoreBtn} onClick={handleLoadMore}>
              Показать ещё кейсы
              <span className={styles.countInfo}>({visibleCount} из {filteredStudents.length})</span>
            </button>
          </div>
        )}

      </div>

      {/* Modal Popup Detail Case */}
      <AnimatePresence>
        {selectedStudent && (
          <div className={styles.modalBackdrop} onClick={() => setSelectedStudent(null)}>
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 350 }}
              className={styles.modalContent}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button className={styles.modalCloseBtn} onClick={() => setSelectedStudent(null)}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>

              <div className={styles.modalHeader}>
                <span className={styles.modalBadge}>Подробный разбор кейса</span>
                <h3 className={styles.modalStudentName}>{selectedStudent.name}</h3>
                <div className={styles.modalMeta}>
                  <span className={styles.modalMetaItem}>
                    <strong>Курс:</strong> {selectedStudent.course}
                  </span>
                  <span className={styles.modalMetaItem}>
                    <strong>Учебный год:</strong> {selectedStudent.year}
                  </span>
                  <span className={styles.modalMetaItem}>
                    <strong>Предмет:</strong> {selectedStudent.subject === 'math' ? 'Математика' : 'Информатика'}
                  </span>
                </div>
              </div>

              <div className={styles.modalBody}>
                {/* Point A */}
                <div className={styles.modalSection} data-type="before">
                  <div className={styles.sectionHeader}>
                    <div className={styles.sectionIndicator} />
                    <h4>Точка А (Старт / Проблема)</h4>
                  </div>
                  <div className={styles.sectionBody}>
                    <p>{selectedStudent.before}</p>
                  </div>
                </div>

                {/* Point B */}
                <div className={styles.modalSection} data-type="after">
                  <div className={styles.sectionHeader}>
                    <div className={styles.sectionIndicator} />
                    <h4>Точка Б (Результат / Финиш)</h4>
                  </div>
                  <div className={styles.sectionBody}>
                    <p>{selectedStudent.after}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
