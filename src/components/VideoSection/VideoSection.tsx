
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import clsx from 'clsx';
import styles from './VideoSection.module.scss';

import PlayableVideo from '../PlayableVideo/PlayableVideo';

interface VideoItem {
  id: string;
  title: string;
  description: string;
  duration: string;
  tags: string[];
  equation: string;
  link: string;
}

const videos: VideoItem[] = [
  {
    id: 'vid1',
    title: 'Разбор тригонометрических уравнений на ЕГЭ',
    description: 'Как быстро решать задание №13 (бывшее 12) профильного ЕГЭ по математике. Пошаговый алгоритм отбора корней по тригонометрической окружности без вычислительных ошибок.',
    duration: '14:25',
    tags: ['ЕГЭ Профиль', 'Задание 13', 'Тригонометрия'],
    equation: 'cos(2x) - 3sin(x) + 2 = 0',
    link: '/video/Online1.mp4'
  },
  {
    id: 'vid2',
    title: 'Информатика на 100: разбор программирования в ЕГЭ',
    description: 'Как решать сложные задачи по программированию (№24-27) на Python с нуля. Пошаговое построение эффективных алгоритмов обработки строк и массивов с оценкой сложности O(N).',
    duration: '16:40',
    tags: ['ЕГЭ Информатика', 'Python', 'Алгоритмы'],
    equation: 'def search(arr): O(N)',
    link: '/video/Online2.mp4'
  },
];

export const VideoSection = () => {
  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring' as const,
        stiffness: 100,
        damping: 18,
      },
    },
  };

  return (
    <section id="video" className={styles.videoSection}>
      <div className={clsx('container', styles.container)}>
        <motion.div
          className={styles.sectionHeader}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <h2 className={styles.title}>
            Посмотрите фрагменты <span>занятий</span>
          </h2>
          <p className={styles.subtitle}>
            Поймите мой стиль преподавания и методику объяснения тем за несколько минут.
            Никакой нудной теории — только суть и решение практических задач.
          </p>
        </motion.div>

        <motion.div
          className={styles.grid}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {videos.map((video) => (
            <motion.div
              key={video.id}
              className={styles.videoCard}
              variants={cardVariants}
            >
              <div className={styles.videoWrapper}>
                <PlayableVideo link={video.link} />
              </div>

              <div className={styles.info}>
                <div className={styles.tagContainer}>
                  {video.tags.map((tag, idx) => (
                    <span key={idx} className={styles.tag}>
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className={styles.videoTitle}>{video.title}</h3>
                <p className={styles.videoDesc}>{video.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
