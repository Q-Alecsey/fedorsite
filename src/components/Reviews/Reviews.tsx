import React, { useState } from 'react';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import clsx from 'clsx';
import styles from './Reviews.module.scss';

interface Review {
  id: string;
  name: string;
  subtitle: string;
  badge: string;
  comment: string;
}

const reviewsData: Review[] = [
  {
    id: 'rev1',
    name: 'Арина Турова',
    subtitle: '',
    badge: '',
    comment: 'Федор, спасибо за доступное и понятное объяснение материала! На занятиях не было неловко, что очень обрадовало. Часто переживаешь, что будет стыдно за свое незнание или за глупые вопросы, но с вами на уроках была дружественная обстановка без осуждения или насмешек.',
  },
  {
    id: 'rev2',
    name: 'Луиза Козеева',
    subtitle: '',
    badge: '',
    comment: 'С Федором Алексеевич наш сын занимается уже 2 года. Нам повезло с Федором, нашему сыну очень интересно заниматься с ним, и это наверное самое важное в обучении. С Федором мы приобрели много знаний, обгоняем изучение школьных тем, заняли 2 место на математическом баттле в школе 2107 (2026 год), готовимся к поступлению в математический лицей',
  },
  {
    id: 'rev3',
    name: 'Александр Павлов',
    subtitle: '',
    badge: '',
    comment: 'Отличные резы за ОГЭ , Федор Алексеевич подготовил за очень короткое время , разжевал сложные задания в двух словах , и отлично напутствовал на экзамен!!!',
  },
  {
    id: 'rev4',
    name: 'Наталья Коблова',
    subtitle: '',
    badge: '',
    comment: 'Разговаривала с сестрёнкой, она такая довольная, чуть ли не боготворит вас. Говорит, что Риана написала 3 работы по математике на 5! В общем, она в шоке, говорит, что не поможет поверить, как у ребёнка за такой короткий промежуток времени могут быть такие поразительные результаты',
  },
  {
    id: 'rev5',
    name: 'Данила Звонков',
    subtitle: '',
    badge: '',
    comment: 'Фёдор, хотел сказать вам огромное спасибо! Инфу сдал на 90, а профиль на 86! Честно, я вообще не думал, что смогу так написать, особенно 27 задачу по программированию, которая мне сначала казалась космосом. Вы объясняли всё на пальцах, без занудства и кучи ненужной теории.',
  },
  {
    id: 'rev6',
    name: 'Марина Ларина',
    subtitle: '',
    badge: '',
    comment: 'Фёдор, здравствуйте! Хотела поделиться радостью, сын сдал информатику на 84!! Для нас это вообще победа, учитывая что в школе по программированию тройка была и он эту инфу видеть не мог. Пришёл после экзамена такой довольный, говорит всё что разбирали — всё попалось. Спасибо вам за терпение и что смогли найти к нему подход!',
  },
];

const ReviewCard = ({ review }: { review: Review }) => {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [mouseX, setMouseX] = useState('50%');
  const [mouseY, setMouseY] = useState('50%');

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    
    const width = rect.width;
    const height = rect.height;
    
    // Relative coordinates within the static wrapper
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Convert to rotation angles (max +/- 8 degrees)
    const rY = ((x / width) - 0.5) * 16;
    const rX = ((y / height) - 0.5) * -16;

    setRotateX(rX);
    setRotateY(rY);
    setMouseX(`${(x / width) * 100}%`);
    setMouseY(`${(y / height) * 100}%`);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <div 
      className={styles.cardPerspectiveWrapper}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        className={clsx(styles.reviewCard, isHovered && styles.hovered)}
        animate={{ rotateX, rotateY }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        style={{
          '--mouse-x': mouseX,
          '--mouse-y': mouseY,
        } as React.CSSProperties}
      >
        <div className={styles.cardHeader}>
          <div className={styles.studentInfo}>
            <span className={styles.name}>{review.name}</span>
            <span className={styles.subInfo}>{review.subtitle}</span>
          </div>
          {review.badge && <div className={styles.badge}>{review.badge}</div>}
        </div>
        
        <p className={styles.comment}>«{review.comment}»</p>
        <div className={styles.quoteIcon}>”</div>
      </motion.div>
    </div>
  );
};

export const Reviews = () => {
  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardEntranceVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut' as const,
      },
    },
  };

  return (
    <section id="reviews" className={styles.reviewsSection}>
      <div className={clsx('container', styles.container)}>
        <motion.div
          className={styles.sectionHeader}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <h2 className={styles.title}>
            Отзывы моих <span>учеников</span>
          </h2>
          <p className={styles.subtitle}>
            Реальные истории успеха ребят, которые преодолели страх перед математикой и информатикой
         
          </p>
        </motion.div>

        <motion.div
          className={styles.grid}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {reviewsData.map((review) => (
            <motion.div key={review.id} variants={cardEntranceVariants}>
              <ReviewCard review={review} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
