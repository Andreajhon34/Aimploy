"use client";

/**
 * @author: @kokonutui
 * @description: Apple Activity Card
 * @version: 1.0.0
 * @date: 2025-06-26
 * @license: MIT
 * @website: https://kokonutui.com
 * @github: https://github.com/kokonut-labs/kokonutui
 */

import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface ActivityData {
  label: string;
  value: number;
  color: string;
  size: number;
  current: number;
  target: number;
  unit: string;
}

interface CircleProgressProps {
  data: ActivityData;
  index: number;
}

const CircleProgress = ({ data, index }: CircleProgressProps) => {
  const strokeWidth = 8;
  const radius = (data.size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const progress = ((100 - data.value) / 100) * circumference;

  const gradientId = `gradient-${data.label.toLowerCase()}`;
  const gradientUrl = `url(#${gradientId})`;

  return (
    <motion.div
      animate={{ opacity: 1, scale: 1 }}
      className="absolute size-full inset-0 flex items-center justify-center"
      initial={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.8, delay: index * 0.2, ease: "easeOut" }}
    >
      <div className="relative">
        <svg
          aria-label={`${data.label} Activity Progress - ${data.value}%`}
          className="-rotate-90 transform size-full flex-1"
          viewBox={`0 0 ${data.size} ${data.size}`}
        >
          {/* <title>{`${data.label} Activity Progress - ${data.value}%`}</title> */}

          <defs>
            <linearGradient id={gradientId} x1="0%" x2="100%" y1="0%" y2="100%">
              <stop
                offset="0%"
                style={{
                  stopColor: data.color,
                  stopOpacity: 1,
                }}
              />
              <stop
                offset="100%"
                style={{
                  stopColor:
                    data.color === "#10b981"
                      ? "#a7f3d0"
                      : data.color === "#f59e0b"
                        ? "#fde68a"
                        : "#fecdd3",
                  stopOpacity: 1,
                }}
              />
            </linearGradient>
          </defs>

          <circle
            className="text-zinc-200/50 dark:text-zinc-800/50"
            cx={data.size / 2}
            cy={data.size / 2}
            fill="none"
            r={radius}
            stroke="currentColor"
            strokeWidth={strokeWidth}
          />

          <motion.circle
            animate={{ strokeDashoffset: progress }}
            cx={data.size / 2}
            cy={data.size / 2}
            fill="none"
            initial={{ strokeDashoffset: circumference }}
            r={radius}
            stroke={gradientUrl}
            strokeDasharray={circumference}
            strokeLinecap="round"
            strokeWidth={strokeWidth}
            style={{
              filter: "drop-shadow(0 0 6px rgba(0,0,0,0.15))",
            }}
            transition={{
              duration: 1.8,
              delay: index * 0.2,
              ease: "easeInOut",
            }}
          />
        </svg>
        <span
          className="absolute top-1/2 left-1/2 -translate-1/2"
          style={{
            color: data.color,
            fontSize: `${data.size * 0.5}px`,
          }}
        >
          {data.value}
        </span>
      </div>
    </motion.div>
  );
};

export default function AtsScoreCard({
  title,
  className,
  atsScore,
}: {
  title?: string;
  className?: string;
  atsScore: number;
}) {
  const color =
    atsScore >= 75 ? "#10b981" : atsScore > 50 ? "#f59e0b" : "#f43f5e";
  return (
    <div
      className={cn(
        "relative rounded-3xl",
        "text-zinc-900 dark:text-white flex flex-col",
        className,
      )}
    >
      <div className="flex flex-1 flex-col items-center gap-8">
        {title && (
          <motion.h2
            animate={{ opacity: 1, y: 0 }}
            className="font-medium text-2xl text-zinc-900 dark:text-white"
            initial={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            {title}
          </motion.h2>
        )}

        <div className="size-full">
          <div className="size-full relative">
            <CircleProgress
              data={{
                label: "MOVE",
                value: atsScore,
                color,
                size: 70,
                current: 479,
                target: 800,
                unit: "CAL",
              }}
              index={0}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
