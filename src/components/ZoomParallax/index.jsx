import styles from "./styles.module.scss";

import Image from "next/image";
import { useScroll, useTransform, motion } from "framer-motion";
import { useRef } from "react";

export default function Index({ images = [] }) {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  const scale4 = useTransform(scrollYProgress, [0, 1], [1, 4]);
  const scale5 = useTransform(scrollYProgress, [0, 1], [1, 5]);
  const scale6 = useTransform(scrollYProgress, [0, 1], [1, 6]);
  const scale8 = useTransform(scrollYProgress, [0, 1], [1, 8]);
  const scale9 = useTransform(scrollYProgress, [0, 1], [1, 9]);

  // Extract src paths and metadata from images array
  const processedImages = images.slice(0, 7).map((img, index) => ({
    src: typeof img === "string" ? img : img.src,
    category: typeof img === "object" ? img.category : null,
    description: typeof img === "object" ? img.description : null,
    alt: typeof img === "object" ? img.alt : `Image ${index}`,
  }));

  const pictures = [
    {
      src: processedImages[0]?.src,
      category: processedImages[0]?.category,
      description: processedImages[0]?.description,
      alt: processedImages[0]?.alt,
      scale: scale4,
    },
    {
      src: processedImages[1]?.src,
      category: processedImages[1]?.category,
      description: processedImages[1]?.description,
      alt: processedImages[1]?.alt,
      scale: scale5,
    },
    {
      src: processedImages[2]?.src,
      category: processedImages[2]?.category,
      description: processedImages[2]?.description,
      alt: processedImages[2]?.alt,
      scale: scale6,
    },
    {
      src: processedImages[3]?.src,
      category: processedImages[3]?.category,
      description: processedImages[3]?.description,
      alt: processedImages[3]?.alt,
      scale: scale5,
    },
    {
      src: processedImages[4]?.src,
      category: processedImages[4]?.category,
      description: processedImages[4]?.description,
      alt: processedImages[4]?.alt,
      scale: scale6,
    },
    {
      src: processedImages[5]?.src,
      category: processedImages[5]?.category,
      description: processedImages[5]?.description,
      alt: processedImages[5]?.alt,
      scale: scale8,
    },
    {
      src: processedImages[6]?.src,
      category: processedImages[6]?.category,
      description: processedImages[6]?.description,
      alt: processedImages[6]?.alt,
      scale: scale9,
    },
  ];

  return (
    <div
      ref={container}
      className={styles.container}
      style={{ paddingTop: 400 }}>
      <div className={styles.sticky}>
        {pictures.map(({ src, scale, category, description, alt }, index) => {
          if (!src) return null; // Skip if no image
          return (
            <motion.div key={index} style={{ scale }} className={styles.el}>
              <div className={styles.imageContainer}>
                <Image src={src} fill alt={alt || "image"} />
                {category && (
                  <div className={styles.label}>
                    <h3>{category}</h3>
                    {description && <p>{description}</p>}
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
