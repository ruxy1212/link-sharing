"use client"

import { useEffect, useRef, useState } from "react";

const GradientText = ({text, type='normal'}: {text: string; type?: 'normal' | 'special'}) => {
  const [scrollPos, setScrollPos] = useState(0);
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (textRef.current) {
        const rect = textRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        // Calculate when component enters and leaves viewport
        const start = rect.top + window.scrollY - windowHeight;
        const end = rect.top + window.scrollY + rect.height;
        const scrollY = window.scrollY;

        // Calculate scroll progress (0 to 100%) within component's viewport range
        if (scrollY >= start && scrollY <= end) {
          const progress = ((scrollY - start) / (end - start)) * 100;
          setScrollPos(Math.min(Math.max(progress, 0), 100));
        } else if (scrollY < start) {
          setScrollPos(0);
        } else if (scrollY > end) {
          setScrollPos(100);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <span
      ref={textRef}
      className={type==='normal'?"text-3xl md:text-4xl gradient-text font-bold":"gradient-text"}
      style={{ backgroundPosition: `${scrollPos}%` }}
    >
      {text}
    </span>
  );
};

export default GradientText;