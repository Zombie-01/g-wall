"use client";
import { useRef, useMemo } from "react";
import styles from "./gsap.module.scss";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

const word = "with framer-motion";

export default function FramerMotion({
  images = [],
  title = "Parallax",
  subtitle = "Scroll",
}) {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end start"],
  });

  const sm = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const md = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const lg = useTransform(scrollYProgress, [0, 1], [0, -250]);

  // Create dynamic transform values for all images - NO LIMIT
  const imageTransforms = useMemo(() => {
    const transforms = [0, lg, md];
    return images.map((_, idx) => {
      const transformIdx = idx % transforms.length;
      return transforms[transformIdx];
    });
  }, [images, lg, md]);

  const letterTransforms = useMemo(() => {
    return word
      .split("")
      .map(() =>
        useTransform(
          scrollYProgress,
          [0, 1],
          [0, Math.floor(Math.random() * -75) - 25],
        ),
      );
  }, [scrollYProgress]);

  const imageData = images.map((img, idx) => ({
    src: typeof img === "string" ? img : img.src,
    y: imageTransforms[idx],
    alt: typeof img === "string" ? `Image ${idx}` : img.alt || `Image ${idx}`,
  }));

  return (
    <div ref={container} className={styles.container}>
      <div className={styles.body}>
        <motion.h1 style={{ y: sm }}>{title}</motion.h1>
        <h1>{subtitle}</h1>
        <div className={styles.word}>
          <p>
            {word.split("").map((letter, i) => {
              return (
                <motion.span
                  style={{ top: letterTransforms[i] }}
                  key={`l_${i}`}>
                  {letter}
                </motion.span>
              );
            })}
          </p>
        </div>
      </div>
      <div className={styles.images}>
        {imageData.length > 0 ? (
          imageData.map(({ src, y, alt }, i) => {
            return (
              <motion.div
                style={{ y }}
                key={`i_${i}`}
                className={styles.imageContainer}>
                <Image src={src} alt={alt} fill priority={i < 3} />
              </motion.div>
            );
          })
        ) : (
          <div
            className={styles.imageContainer}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}>
            <p style={{ color: "#999" }}>No images provided</p>
          </div>
        )}
      </div>
    </div>
  );
}
