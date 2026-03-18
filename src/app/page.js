"use client";
import styles from "./page.module.scss";
import ZoomParallax from "../components/ZoomParallax/index";
import FramerMotion from "../components/gsap/index";
import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";
import { imageCategories } from "@/data/imageData";

export default function Home() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: "vertical",
      gestureDirection: "vertical",
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  // Create unique image assignments - each image used only once
  const createUniqueImageSets = () => {
    const allImages = [];
    let imageIndex = 0;

    // Flatten all images with their category info
    imageCategories.forEach((category) => {
      category.images.forEach((img) => {
        allImages.push({
          src: `/${img}`,
          category: category.title,
          description: category.description,
          alt: `${category.title} - Image`,
          originalIndex: imageIndex++,
        });
      });
    });

    // Create sets for each component type
    const framerMotionSets = [];
    const zoomParallaxSets = [];

    // Distribute images alternately between component types
    allImages.forEach((image, idx) => {
      if (idx % 2 === 0) {
        // Add to FramerMotion sets (groups of 7-10 images)
        const setIndex = Math.floor(idx / 14);
        if (!framerMotionSets[setIndex]) framerMotionSets[setIndex] = [];
        framerMotionSets[setIndex].push(image);
      } else {
        // Add to ZoomParallax sets (groups of 7 images)
        const setIndex = Math.floor(idx / 14);
        if (!zoomParallaxSets[setIndex]) zoomParallaxSets[setIndex] = [];
        if (zoomParallaxSets[setIndex].length < 7) {
          zoomParallaxSets[setIndex].push(image);
        }
      }
    });

    return { framerMotionSets, zoomParallaxSets };
  };

  const { framerMotionSets, zoomParallaxSets } = createUniqueImageSets();

  return (
    <main className={styles.main}>
      {/* First section: FramerMotion */}
      {framerMotionSets[0] && (
        <FramerMotion
          images={framerMotionSets[0]}
          title="Наших үйл явдлууд"
          subtitle="Дүрслэлээр уучлаарай"
        />
      )}

      {/* Second section: ZoomParallax */}
      {zoomParallaxSets[0] && <ZoomParallax images={zoomParallaxSets[0]} />}

      {/* Third section: FramerMotion */}
      {framerMotionSets[1] && (
        <FramerMotion
          images={framerMotionSets[1]}
          title="Сургуулийн цогц"
          subtitle="Амьдрал ба сурах"
        />
      )}

      {/* Fourth section: ZoomParallax */}
      {zoomParallaxSets[1] && <ZoomParallax images={zoomParallaxSets[1]} />}

      {/* Continue with remaining sets */}
      {framerMotionSets.slice(2).map((imageSet, idx) => (
        <FramerMotion
          key={`fm-${idx + 2}`}
          images={imageSet}
          title={`Үйл явдал ${idx + 3}`}
          subtitle="Дүрслэлээр уучлаарай"
        />
      ))}

      {zoomParallaxSets.slice(2).map((imageSet, idx) => (
        <ZoomParallax key={`zp-${idx + 2}`} images={imageSet} />
      ))}
    </main>
  );
}
