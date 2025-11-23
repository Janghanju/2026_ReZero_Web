'use client';

import { motion, Variants } from "framer-motion";
import { ReactNode } from "react";

interface MotionCardProps {
    children: ReactNode;
    className?: string;
    // Index is no longer strictly needed for staggering if used within MotionContainer,
    // but we keep it optional for backward compatibility or specific delays.
    index?: number;
}

const cardVariants: Variants = {
    hidden: {
        opacity: 0,
        y: 40,
        scale: 0.95,
        filter: "blur(10px)"
    },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        filter: "blur(0px)",
        transition: {
            type: "spring",
            stiffness: 100,
            damping: 20,
            mass: 1
        }
    }
};

export const MotionCard = ({ children, className = "" }: MotionCardProps) => {
    return (
        <motion.div
            variants={cardVariants}
            whileHover={{
                y: -10,
                scale: 1.02,
                transition: { duration: 0.2 },
                boxShadow: "0 20px 40px rgba(0,0,0,0.2)"
            }}
            className={`h-full ${className}`}
        >
            {children}
        </motion.div>
    );
};
