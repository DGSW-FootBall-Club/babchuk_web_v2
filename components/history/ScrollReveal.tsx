"use client";

import { useEffect, useRef, type ReactNode } from "react";

type ScrollRevealProps = {
    children: ReactNode;
    delay?: number;
};

export default function ScrollReveal({
    children,
    delay = 0,
}: ScrollRevealProps) {
    const elementRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const element = elementRef.current;
        if (!element) {
            return;
        }

        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            return;
        }

        element.dataset.reveal = "pending";

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    element.dataset.reveal = "visible";
                    observer.unobserve(element);
                }
            },
            { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
        );

        observer.observe(element);
        return () => observer.disconnect();
    }, []);

    return (
        <div
            ref={elementRef}
            className="scroll-reveal"
            style={{ transitionDelay: `${delay}ms` }}
        >
            {children}
        </div>
    );
}
