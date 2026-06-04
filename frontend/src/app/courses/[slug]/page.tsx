'use client'

import React, { useState, useEffect } from 'react'
import { useParams, notFound } from 'next/navigation'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import Breadcrumb from '@/app/components/Breadcrumb'
import { CourseDetail } from '@/data/courses'
import { useLivePreview } from '@payloadcms/live-preview-react'
import { resolveUploadOrURL } from '@/utils/resolveUploadOrURL'

const MotionDiv = motion.div as any;

if (typeof window !== 'undefined') {
  // Forward console logs to server
  const originalLog = console.log;
  const originalError = console.error;
  const originalWarn = console.warn;

  const sendLogToServer = (type: string, ...args: any[]) => {
    const messages = args.map(arg => {
      if (typeof arg === 'object') {
        try {
          return JSON.stringify(arg);
        } catch (e) {
          return String(arg);
        }
      }
      return String(arg);
    });
    fetch('/api/logs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type, messages }),
    }).catch(() => {});
  };

  console.log = (...args) => {
    originalLog(...args);
    sendLogToServer('log', ...args);
  };
  console.error = (...args) => {
    originalError(...args);
    sendLogToServer('error', ...args);
  };
  console.warn = (...args) => {
    originalWarn(...args);
    sendLogToServer('warn', ...args);
  };

  // Global error reporting overlay
  window.addEventListener('error', (event) => {
    const div = document.createElement('div');
    div.id = 'client-error-overlay';
    div.style.cssText = 'position:fixed;top:0;left:0;width:100%;background:red;color:white;z-index:999999;padding:20px;font-family:monospace;font-size:14px;box-shadow:0 4px 10px rgba(0,0,0,0.5);max-height:50vh;overflow:auto;';
    div.innerHTML = `<strong>Client Error:</strong> ${event.message}<br/><pre style="margin-top:10px;">${event.error?.stack || ''}</pre>`;
    document.body.appendChild(div);
  });

  window.addEventListener('unhandledrejection', (event) => {
    const div = document.createElement('div');
    div.id = 'client-rejection-overlay';
    div.style.cssText = 'position:fixed;top:0;left:0;width:100%;background:darkred;color:white;z-index:999999;padding:20px;font-family:monospace;font-size:14px;box-shadow:0 4px 10px rgba(0,0,0,0.5);max-height:50vh;overflow:auto;';
    div.innerHTML = `<strong>Unhandled Rejection:</strong> ${event.reason}<br/><pre style="margin-top:10px;">${event.reason?.stack || ''}</pre>`;
    document.body.appendChild(div);
  });
}

const serverUrlForPreview = process.env.NEXT_PUBLIC_CMS_API_URL || 'http://localhost:3005';

function formatCourse(c: any): CourseDetail | null {
  if (!c) return null
  return {
    id: c.id || c._id,
    slug: c.slug,
    name: c.name,
    duration: c.duration,
    level: c.level,
    shortDescription: c.shortDescription,
    icon: resolveUploadOrURL(c.icon, serverUrlForPreview),
    imgSrc: resolveUploadOrURL(c.imgSrc, serverUrlForPreview),
    mentor: c.mentor,
    price: c.price,
    rating: c.rating,
    bestSeller: c.bestSeller,
    classes: c.classes,
    students: c.students,
    about: c.about,
    features: [],
    skills: [],
    careers: c.careers ? c.careers.map((cr: any) => ({
      career: (!cr || typeof cr === 'string') ? (cr || '') : (cr.career || ''),
      salary: (!cr || typeof cr === 'string') ? '' : (cr.salary || ''),
    })) : [],
    projects: [],
    weeks: c.weeks ? c.weeks.map((w: any) => ({
      week: w ? (w.week || '') : '',
      topic: w ? (w.topic || '') : '',
      outcomes: (w && w.outcomes) ? w.outcomes.map((o: any) => {
        if (!o) return '';
        return typeof o === 'string' ? o : (o.outcome || '');
      }) : [],
    })) : [],
  }
}


// Inline SVG Icon components for offline-proof rendering
const TerminalIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} width="1em" height="1em" strokeWidth={2} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="4 17 10 11 4 5" />
    <line x1="12" y1="19" x2="20" y2="19" />
  </svg>
);
const BoxIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} width="1em" height="1em" strokeWidth={2} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
    <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
    <line x1="12" y1="22.08" x2="12" y2="12" />
  </svg>
);
const CloudIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} width="1em" height="1em" strokeWidth={2} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.5 19A3.5 3.5 0 0 0 21 15.5c0-2.79-2.54-4.5-5-4.5-.42-1.89-1.76-3.5-3.5-3.5a4.5 4.5 0 0 0-4.5 4.5c0 .12.01.24.02.36C5.53 12.82 4 14.5 4 16.5A2.5 2.5 0 0 0 6.5 19z" />
  </svg>
);
const ServerIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} width="1em" height="1em" strokeWidth={2} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="8" rx="2" ry="2" />
    <rect x="2" y="14" width="20" height="8" rx="2" ry="2" />
    <line x1="6" y1="6" x2="6.01" y2="6" />
    <line x1="6" y1="18" x2="6.01" y2="18" />
  </svg>
);
const DatabaseIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} width="1em" height="1em" strokeWidth={2} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
    <ellipse cx="12" cy="5" rx="9" ry="3" />
    <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
    <path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3" />
  </svg>
);
const RocketIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} width="1em" height="1em" strokeWidth={2} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4.5 16.5c-1.5 1.26-2 3.5-2 3.5s2.24-.5 3.5-2" />
    <path d="M12 15c.98 0 1.93-.3 2.76-.84L21 8l-5-5-6.16 6.24c-.54.83-.84 1.78-.84 2.76v3h3z" />
  </svg>
);
const ActivityIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} width="1em" height="1em" strokeWidth={2} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
  </svg>
);
const CodeIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} width="1em" height="1em" strokeWidth={2} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="16 18 22 12 16 6" />
    <polyline points="8 6 2 12 8 18" />
  </svg>
);
const SmartphoneIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} width="1em" height="1em" strokeWidth={2} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
    <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
    <line x1="12" y1="18" x2="12.01" y2="18" />
  </svg>
);
const ShieldIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} width="1em" height="1em" strokeWidth={2} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);
const BrainIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} width="1em" height="1em" strokeWidth={1.5} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9.5 22a2.5 2.5 0 0 1-2.5-2.5V11a5.5 5.5 0 0 1 5.5-5.5h1a5.5 5.5 0 0 1 5.5 5.5v8.5a2.5 2.5 0 0 1-2.5 2.5H9.5z" />
    <path d="M12 5.5V22" />
    <path d="M12 9h4.5M12 13h4M12 17h3" />
    <path d="M12 9H7.5M12 13H8M12 17H9" />
  </svg>
);
const SparklesIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} width="1em" height="1em" strokeWidth={2} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275Z" />
    <path d="m5 3 1 2.5L8.5 6 6 7 5 9.5 4 7 1.5 6 4 5Z" />
  </svg>
);
const MessageIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} width="1em" height="1em" strokeWidth={2} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);
const TrophyIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} width="1em" height="1em" strokeWidth={2} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
    <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
    <path d="M4 22h16" />
    <path d="M10 14.66V17c0 .55-.45 1-1 1H4v2h16v-2h-5c-.55 0-1-.45-1-1v-2.34" />
    <path d="M12 2a6 6 0 0 1 6 6v3a6 6 0 0 1-6 6 6 6 0 0 1-6-6V8a6 6 0 0 1 6-6z" />
  </svg>
);
const TuningIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} width="1em" height="1em" strokeWidth={2} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
    <line x1="4" y1="21" x2="4" y2="14" />
    <line x1="4" y1="10" x2="4" y2="3" />
    <line x1="12" y1="21" x2="12" y2="12" />
    <line x1="12" y1="8" x2="12" y2="3" />
    <line x1="20" y1="21" x2="20" y2="16" />
    <line x1="20" y1="12" x2="20" y2="3" />
    <line x1="1" y1="14" x2="7" y2="14" />
    <line x1="9" y1="8" x2="15" y2="8" />
    <line x1="17" y1="16" x2="23" y2="16" />
  </svg>
);
const TransferIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} width="1em" height="1em" strokeWidth={2} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="16 3 21 8 16 13" />
    <line x1="21" y1="8" x2="9" y2="8" />
    <polyline points="8 21 3 16 8 11" />
    <line x1="3" y1="16" x2="15" y2="16" />
  </svg>
);
const SettingsIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} width="1em" height="1em" strokeWidth={2} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </svg>
);

// Navigation & Metrics icons
const BackArrowIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} width="1em" height="1em" strokeWidth={2} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
    <line x1="19" y1="12" x2="5" y2="12" />
    <polyline points="12 19 5 12 12 5" />
  </svg>
);
const ClockIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} width="1em" height="1em" strokeWidth={2} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);
const LevelIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} width="1em" height="1em" strokeWidth={2} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);
const ArrowRightIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} width="1em" height="1em" strokeWidth={2} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);
const GraphUpIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} width="1em" height="1em" strokeWidth={2} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="20" x2="18" y2="10" />
    <line x1="12" y1="20" x2="12" y2="4" />
    <line x1="6" y1="20" x2="6" y2="14" />
  </svg>
);
const WalletIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} width="1em" height="1em" strokeWidth={2} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <line x1="12" y1="10" x2="12" y2="14" />
    <path d="M17 14h.01M7 10h.01" />
  </svg>
);

// Course Specific Pulsing Icons
const CpuBoltIcon = ({ className = "w-10 h-10" }: { className?: string }) => (
  <svg className={className} width="1em" height="1em" strokeWidth={2} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
    <rect x="4" y="4" width="16" height="16" rx="2" />
    <rect x="9" y="9" width="6" height="6" />
    <line x1="9" y1="1" x2="9" y2="4" />
    <line x1="15" y1="1" x2="15" y2="4" />
    <line x1="9" y1="20" x2="9" y2="23" />
    <line x1="15" y1="20" x2="15" y2="23" />
    <line x1="20" y1="9" x2="23" y2="9" />
    <line x1="20" y1="15" x2="23" y2="15" />
    <line x1="1" y1="9" x2="4" y2="9" />
    <line x1="1" y1="15" x2="4" y2="15" />
  </svg>
);
const CloudCourseIcon = ({ className = "w-10 h-10" }: { className?: string }) => (
  <svg className={className} width="1em" height="1em" strokeWidth={2} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.5 19A3.5 3.5 0 0 0 21 15.5c0-2.79-2.54-4.5-5-4.5-.42-1.89-1.76-3.5-3.5-3.5a4.5 4.5 0 0 0-4.5 4.5c0 .12.01.24.02.36C5.53 12.82 4 14.5 4 16.5A2.5 2.5 0 0 0 6.5 19z" />
  </svg>
);
const CodeFileIcon = ({ className = "w-10 h-10" }: { className?: string }) => (
  <svg className={className} width="1em" height="1em" strokeWidth={2} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <polyline points="8 13 6 15 8 17" />
    <polyline points="12 17 14 15 12 13" />
    <line x1="11" y1="13" x2="9" y2="17" />
  </svg>
);
const SmartphoneCourseIcon = ({ className = "w-10 h-10" }: { className?: string }) => (
  <svg className={className} width="1em" height="1em" strokeWidth={2} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
    <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
    <line x1="12" y1="18" x2="12.01" y2="18" />
  </svg>
);
const SparklesCourseIcon = ({ className = "w-10 h-10" }: { className?: string }) => (
  <svg className={className} width="1em" height="1em" strokeWidth={2} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275Z" />
    <path d="m5 3 1 2.5L8.5 6 6 7 5 9.5 4 7 1.5 6 4 5Z" />
  </svg>
);
const GlobeIcon = ({ className = "w-10 h-10" }: { className?: string }) => (
  <svg className={className} width="1em" height="1em" strokeWidth={2} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);

const renderCourseIcon = (slug: string, className?: string) => {
  switch (slug) {
    case 'core-ai':
      return <CpuBoltIcon className={className} />;
    case 'devops-cloud':
      return <CloudCourseIcon className={className} />;
    case 'fullstack-mern':
      return <CodeFileIcon className={className} />;
    case 'flutter-android':
      return <SmartphoneCourseIcon className={className} />;
    case 'genai-fullstack':
      return <SparklesCourseIcon className={className} />;
    case 'all-integrated-mega':
      return <GlobeIcon className={className} />;
    default:
      return <GlobeIcon className={className} />;
  }
};

// Coaching Pillar Icons
const VideoIcon = ({ className = "text-2xl" }: { className?: string }) => (
  <svg className={className} width="1em" height="1em" strokeWidth={2} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
    <path d="M23 7l-7 5 7 5V7z" />
    <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
  </svg>
);
const FolderIcon = ({ className = "text-2xl" }: { className?: string }) => (
  <svg className={className} width="1em" height="1em" strokeWidth={2} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
  </svg>
);
const CupIcon = ({ className = "text-2xl" }: { className?: string }) => (
  <svg className={className} width="1em" height="1em" strokeWidth={2} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
    <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
    <path d="M4 22h16" />
    <path d="M10 14.66V17c0 .55-.45 1-1 1H4v2h16v-2h-5c-.55 0-1-.45-1-1v-2.34" />
    <path d="M12 2a6 6 0 0 1 6 6v3a6 6 0 0 1-6 6 6 6 0 0 1-6-6V8a6 6 0 0 1 6-6z" />
  </svg>
);
const BriefcaseIcon = ({ className = "text-2xl" }: { className?: string }) => (
  <svg className={className} width="1em" height="1em" strokeWidth={2} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
  </svg>
);
const DocumentIcon = ({ className = "text-2xl" }: { className?: string }) => (
  <svg className={className} width="1em" height="1em" strokeWidth={2} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
    <polyline points="10 9 9 9 8 9" />
  </svg>
);
const UsersIcon = ({ className = "text-2xl" }: { className?: string }) => (
  <svg className={className} width="1em" height="1em" strokeWidth={2} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const renderPillarIcon = (title: string, className?: string) => {
  switch (title) {
    case 'Live Training':
      return <VideoIcon className={className} />;
    case 'Industry Projects':
      return <FolderIcon className={className} />;
    case 'Placement Guidance':
      return <CupIcon className={className} />;
    case 'Portfolio Building':
      return <BriefcaseIcon className={className} />;
    case 'Resume Support':
      return <DocumentIcon className={className} />;
    case 'Career Mentorship':
      return <UsersIcon className={className} />;
    default:
      return <UsersIcon className={className} />;
  }
};

const renderWeekIcon = (topic: string, index: number) => {
  const t = topic.toLowerCase();
  
  let IconComponent = SettingsIcon;
  
  if (t.includes('linux basics') || t.includes('command line & git') || t.includes('git version control')) {
    IconComponent = TerminalIcon;
  } else if (t.includes('ai fundamentals') || t.includes('machine learning basics')) {
    IconComponent = BrainIcon;
  } else if (t.includes('linux') || t.includes('terminal') || t.includes('bash') || t.includes('command line') || t.includes('git') || t.includes('version control')) {
    IconComponent = TerminalIcon;
  } else if (t.includes('docker') || t.includes('container')) {
    IconComponent = BoxIcon;
  } else if (t.includes('kubernetes') || t.includes('k8s') || t.includes('orchestrat')) {
    IconComponent = ServerIcon;
  } else if (t.includes('aws') || t.includes('cloud') || t.includes('infrastructure')) {
    IconComponent = CloudIcon;
  } else if (t.includes('terraform') || t.includes('configuration')) {
    IconComponent = TuningIcon;
  } else if (t.includes('ci/cd') || t.includes('jenkins') || t.includes('pipeline') || t.includes('make.com') || t.includes('zapier') || t.includes('productivity')) {
    IconComponent = RocketIcon;
  } else if (t.includes('monitoring') || t.includes('prometheus') || t.includes('grafana') || t.includes('metrics')) {
    IconComponent = ActivityIcon;
  } else if (t.includes('react') || t.includes('frontend') || t.includes('html') || t.includes('css')) {
    IconComponent = CodeIcon;
  } else if (t.includes('node') || t.includes('express') || t.includes('backend') || t.includes('server')) {
    IconComponent = ServerIcon;
  } else if (t.includes('mongodb') || t.includes('database') || t.includes('schema') || t.includes('db ')) {
    IconComponent = DatabaseIcon;
  } else if (t.includes('auth') || t.includes('jwt') || t.includes('security')) {
    IconComponent = ShieldIcon;
  } else if (t.includes('flutter') || t.includes('mobile') || t.includes('android')) {
    IconComponent = SmartphoneIcon;
  } else if (t.includes('dart')) {
    IconComponent = CodeIcon;
  } else if (t.includes('firebase')) {
    IconComponent = RocketIcon;
  } else if (t.includes('vector') || t.includes('embedding') || t.includes('rag') || t.includes('semantic search')) {
    IconComponent = ActivityIcon;
  } else if (t.includes('agent') || t.includes('autonomous')) {
    IconComponent = ServerIcon;
  } else if (t.includes('openai') || t.includes('claude') || t.includes('llm') || t.includes('gemini') || t.includes('chatbot') || t.includes('chatgpt') || t.includes('prompt')) {
    IconComponent = MessageIcon;
  } else if (t.includes('machine learning') || t.includes('ml ') || t.includes('artificial intelligence') || t.includes('generative ai')) {
    IconComponent = BrainIcon;
  } else if (t.includes('capstone') || t.includes('project') || t.includes('saas') || t.includes('commercial')) {
    IconComponent = TrophyIcon;
  } else if (t.includes('integration') || t.includes('api') || t.includes('rest api')) {
    IconComponent = TransferIcon;
  } else if (t.includes('ai') || t.includes('intelligent')) {
    IconComponent = SparklesIcon;
  } else {
    const fallbacks = [CodeIcon, RocketIcon, SettingsIcon, CloudIcon];
    IconComponent = fallbacks[index % fallbacks.length];
  }
  
  return <IconComponent />;
};

const getRoleSalary = (role: string) => {
  const salaries: Record<string, string> = {
    'AI Automation Specialist': '₹8 - 15 LPA',
    'Prompt Engineer': '₹6 - 12 LPA',
    'AI Consultant': '₹10 - 20 LPA',
    'Business Automation Executive': '₹5 - 10 LPA',
    'DevOps Engineer': '₹8 - 18 LPA',
    'Cloud Engineer': '₹7 - 16 LPA',
    'Site Reliability Engineer (SRE)': '₹10 - 22 LPA',
    'Platform Engineer': '₹9 - 20 LPA',
    'MERN Stack Developer': '₹6 - 15 LPA',
    'Full Stack Engineer': '₹7 - 18 LPA',
    'Frontend Web Developer': '₹5 - 12 LPA',
    'Backend Engineer': '₹6 - 16 LPA',
    'Flutter Developer': '₹5 - 14 LPA',
    'Mobile App Developer': '₹6 - 15 LPA',
    'Android Developer': '₹5 - 13 LPA',
    'AI Engineer': '₹10 - 25 LPA',
    'GenAI Developer': '₹9 - 22 LPA',
    'AI Product Engineer': '₹10 - 24 LPA',
    'AI Solutions Architect': '₹15 - 35 LPA',
    'Lead Software Engineer': '₹14 - 30 LPA',
    'Full Stack AI Solutions Architect': '₹18 - 40 LPA',
    'Senior Platform Developer': '₹12 - 26 LPA',
    'AI Technical Consultant': '₹12 - 28 LPA',
  };
  return salaries[role] || '₹6 - 15 LPA';
};

const CyberpunkBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* Soft gradient glows matching website theme palette */}
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-secondary/5 rounded-full blur-[120px] translate-x-1/2 translate-y-1/2" />
      
      {/* Subtle futuristic tech grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(99,86,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(99,86,255,0.015)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-60" />
    </div>
  );
};

const TimelineCard = ({ w, isExpanded, toggleWeek, weekIcon, align }: { 
  w: any; 
  isExpanded: boolean; 
  toggleWeek: (week: string | number) => void; 
  weekIcon: React.ReactNode;
  align: 'left' | 'right';
}) => {
  return (
    <MotionDiv
      initial={{ opacity: 0, x: align === 'right' ? -35 : 35, y: 25 }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
      className="w-full"
    >
      <div
        onClick={() => toggleWeek(w.week)}
        className="group relative bg-white border border-primary/15 p-6 rounded-[24px] shadow-[0_8px_30px_rgba(0,0,0,0.02)] cursor-pointer transition-all duration-300 active:scale-[0.99] flex flex-col gap-3 text-left"
      >
        <div className="flex items-center gap-3 justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center lg:hidden shrink-0 text-primary">
              {weekIcon}
            </div>
            <h3 className="text-lg font-bold text-midnight_text leading-tight">
              {w.topic}
            </h3>
          </div>
          <div className={`w-8 h-8 rounded-full border border-primary/10 bg-primary/5 flex items-center justify-center shrink-0 transition-transform duration-300 ${isExpanded ? 'rotate-180 bg-primary/20 text-primary' : 'text-grey'}`}>
            <span className="text-xs font-bold leading-none select-none">▼</span>
          </div>
        </div>

        <AnimatePresence initial={false}>
          {isExpanded && (
            <MotionDiv
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.25, 1, 0.5, 1] }}
              className="overflow-hidden"
            >
              <div className="pt-4 border-t border-primary/10 mt-2">
                <p className="text-xs font-bold text-primary uppercase tracking-widest mb-3">
                  What you will achieve:
                </p>
                <ul className="flex flex-col gap-2.5">
                  {w.outcomes.map((outcome: string, oIdx: number) => (
                    <li key={oIdx} className="flex items-start gap-2.5 text-sm text-grey leading-relaxed">
                      <span className="text-primary font-bold shrink-0 select-none">✦</span>
                      <span>{outcome}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </MotionDiv>
          )}
        </AnimatePresence>
      </div>
    </MotionDiv>
  );
};


export default function CourseDetailPage() {
  const params = useParams()
  const slug = params?.slug as string

  const [fetchedCourse, setFetchedCourse] = useState<CourseDetail | null>(null)
  const [loading, setLoading] = useState(true)
  const [notFoundState, setNotFoundState] = useState(false)

  useEffect(() => {
    if (!slug) return
    const fetchCourse = async () => {
      try {
        const res = await fetch(`/api/courses?slug=${slug}`)
        if (res.status === 404) {
          setNotFoundState(true)
          return
        }
        if (!res.ok) throw new Error('Failed to fetch course')
        const data = await res.json()
        setFetchedCourse(data)
      } catch (error) {
        console.error('Error fetching course:', error)
        setNotFoundState(true)
      } finally {
        setLoading(false)
      }
    }
    fetchCourse()
  }, [slug])

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white pt-24 pb-16">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          <p className="text-grey font-medium text-lg">Loading course details...</p>
        </div>
      </div>
    )
  }

  if (notFoundState || !fetchedCourse) {
    notFound()
  }

  return <CourseDetailContent fetchedCourse={fetchedCourse} />
}

function CourseDetailContent({ fetchedCourse }: { fetchedCourse: CourseDetail }) {
  const [expandedWeeks, setExpandedWeeks] = useState<Record<string | number, boolean>>(() => {
    if (fetchedCourse.weeks && fetchedCourse.weeks.length > 0) {
      return { [fetchedCourse.weeks[0].week]: true }
    }
    return {}
  })

  useEffect(() => {
    console.log("CourseDetailContent rendered with initialData:", fetchedCourse)
    const handleMsg = (event: MessageEvent) => {
      console.log("IFRAME MESSAGE RECEIVED:", event.origin, event.data)
    }
    window.addEventListener("message", handleMsg)

    // Handshake: explicitly send ready message to parent window
    if (typeof window !== 'undefined') {
      const parentWin = window.opener || window.parent;
      if (parentWin && parentWin !== window) {
        console.log("Sending manual ready message to parent window...");
        parentWin.postMessage({
          type: 'payload-live-preview',
          ready: true
        }, '*');
      }
    }

    return () => window.removeEventListener("message", handleMsg)
  }, [fetchedCourse])

  const { data: liveCourse } = useLivePreview<any>({
    initialData: fetchedCourse,
    serverURL: process.env.NEXT_PUBLIC_CMS_API_URL || 'http://localhost:3005',
    depth: 2,
  })

  useEffect(() => {
    console.log("liveCourse updated:", liveCourse)
  }, [liveCourse])

  const course = formatCourse(liveCourse || fetchedCourse)

  const toggleWeek = (weekId: string | number) => {
    setExpandedWeeks((prev) => ({
      ...prev,
      [weekId]: !prev[weekId],
    }))
  }

  // Icons mapping for HMS Coaching benefits
  const hmsPillars = [
    { title: 'Live Training', desc: 'Interact with industry professionals in real-time interactive classes.', icon: 'solar:videocamera-record-bold-duotone' },
    { title: 'Industry Projects', desc: 'Build a production-grade portfolio that displays real-world problem-solving.', icon: 'solar:folder-with-files-bold-duotone' },
    { title: 'Placement Guidance', desc: 'Exclusive access to our hiring network and structured interview preparation.', icon: 'solar:cup-first-bold-duotone' },
    { title: 'Portfolio Building', desc: 'Step-by-step guidance to display your code, repositories, and case studies.', icon: 'solar:case-minimalistic-bold-duotone' },
    { title: 'Resume Support', desc: 'Craft a high-converting ATS-friendly tech resume with feedback from recruiters.', icon: 'solar:document-text-bold-duotone' },
    { title: 'Career Mentorship', desc: '1-on-1 strategy sessions with tech leads to navigate your career growth.', icon: 'solar:users-group-two-rounded-bold-duotone' },
  ]

  if (!course) return null

  return (
    <main className='bg-white min-h-screen pt-24 pb-16'>
      {/* Breadcrumbs Container */}
      <div className='container mx-auto px-4 mt-6 flex items-center gap-4'>
        <Link
          href='/'
          className='w-10 h-10 rounded-full border border-black/5 bg-white hover:bg-slate-50 flex items-center justify-center shadow-sm hover:shadow-md transition-all duration-300 group shrink-0'
          aria-label='Back to home'
        >
          <BackArrowIcon className='text-xl text-midnight_text group-hover:-translate-x-0.5 transition-transform duration-300' />
        </Link>
        <Breadcrumb
          links={[
            { href: '/', text: 'Home' },
            { href: '/#courses', text: 'Courses' },
            { href: `/courses/${course.slug}`, text: course.name },
          ]}
        />
      </div>

      {/* 1. HERO SECTION */}
      <section className='pt-8 pb-16'>
        <div className='container mx-auto px-4'>
          <div className='grid grid-cols-1 lg:grid-cols-12 gap-12 items-center bg-slate-gray rounded-3xl p-8 lg:p-12 shadow-xl shadow-black/5 border border-black/5 relative overflow-hidden'>
            {/* Background Blob Glows */}
            <div className='absolute -top-40 -right-40 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none' />
            <div className='absolute -bottom-40 -left-40 w-96 h-96 bg-secondary/10 rounded-full blur-3xl pointer-events-none' />

            <div className='lg:col-span-7 flex flex-col gap-6 relative z-10'>
              <div className='flex flex-wrap gap-2.5 items-center'>
                <span className='inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-primary bg-primary/10 px-3 py-1.5 rounded-full'>
                  <ClockIcon className="w-3.5 h-3.5" />
                  {course.duration}
                </span>
                <span className='inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-secondary bg-secondary/10 px-3 py-1.5 rounded-full'>
                  <LevelIcon className="w-3.5 h-3.5" />
                  {course.level}
                </span>
              </div>
              <h1 className='text-4xl md:text-5xl lg:text-6xl font-bold text-midnight_text leading-tight'>
                {course.name}
              </h1>
              <p className='text-lg text-grey max-w-xl leading-relaxed'>
                {course.shortDescription}
              </p>
              <div className='pt-4 flex flex-wrap gap-4'>
                <Link
                  href='/#contact'
                  className='bg-primary text-white hover:bg-secondary active:scale-95 px-8 py-4 rounded-full text-lg font-semibold shadow-lg shadow-primary/25 transition-all duration-300 inline-flex items-center gap-2'>
                  Enroll Now
                  <ArrowRightIcon className='text-xl' />
                </Link>
                <Link
                  href='#curriculum'
                  className='bg-white hover:bg-slate-100 text-midnight_text border border-black/5 px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 inline-flex items-center gap-2'>
                  View Curriculum
                </Link>
              </div>
            </div>

            {/* Premium CSS/SVG Graphic Illustration */}
            <div className='lg:col-span-5 flex justify-center relative z-10'>
              <div className='relative w-full max-w-[400px] aspect-square rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10 p-[1px] border border-black/5 shadow-2xl overflow-hidden flex items-center justify-center group'>
                {/* Embedded Glass Dashboard Visual */}
                <div className='absolute inset-0 bg-radial-gradient from-white/10 via-transparent to-transparent opacity-80' />
                <div className='w-[85%] h-[85%] rounded-xl bg-white backdrop-blur-md border border-white/20 shadow-lg p-6 flex flex-col justify-between relative overflow-hidden group-hover:scale-105 transition-transform duration-500'>
                  {/* Floating geometric circles */}
                  <div className='absolute -top-12 -right-12 w-28 h-28 rounded-full bg-gradient-to-br from-primary to-secondary opacity-25 blur-sm' />
                  
                  {/* Mock browser header */}
                  <div className='flex items-center justify-between border-b border-black/5 pb-4 mb-4'>
                    <div className='flex gap-1.5'>
                      <span className='w-3 h-3 rounded-full bg-red-400 block' />
                      <span className='w-3 h-3 rounded-full bg-yellow-400 block' />
                      <span className='w-3 h-3 rounded-full bg-green-400 block' />
                    </div>
                    <div className='text-[10px] text-grey/60 font-mono'>hms-workspace</div>
                  </div>

                  {/* Centered Large Pulsing Icon */}
                  <div className='flex-grow flex flex-col items-center justify-center gap-4 py-4'>
                    <div className='w-20 h-20 rounded-2xl bg-gradient-to-tr from-primary to-secondary text-white flex items-center justify-center shadow-lg shadow-primary/30 relative animate-pulse'>
                      {renderCourseIcon(course.slug, 'text-4xl')}
                    </div>
                    <span className='text-xs font-mono font-semibold text-primary tracking-widest uppercase'>
                      {course.name}
                    </span>
                  </div>

                  {/* Skills pill summary */}
                  <div className='flex gap-1.5 flex-wrap justify-center border-t border-black/5 pt-4 mt-2'>
                    <span className='text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full font-semibold'>100% Practical</span>
                    <span className='text-[10px] bg-success/10 text-success px-2 py-0.5 rounded-full font-semibold'>Mentorship</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. ABOUT COURSE */}
      <section className='py-12 bg-white'>
        <div className='container mx-auto px-4'>
          <div className='max-w-4xl mx-auto text-center flex flex-col gap-6'>
            <h2 className='text-3xl md:text-4xl font-bold text-midnight_text'>
              About The Course
            </h2>
            <div className='w-20 h-1 bg-primary mx-auto rounded-full' />
            <p className='text-lg text-grey leading-relaxed pt-2'>
              {course.about}
            </p>
          </div>
        </div>
      </section>

      {/* 5. WEEKLY CURRICULUM TIMELINE (REDESIGNED ROADMAP) */}
      <section id='curriculum' className='py-20 bg-white relative overflow-hidden scroll-mt-24'>
        <CyberpunkBackground />
        
        {/* Style Tag containing Keyframe animations for pulsing nodes */}
        <style dangerouslySetInnerHTML={{ __html: `
          @keyframes pulse-glow {
            0%, 100% {
              box-shadow: 0 0 8px rgba(99, 86, 255, 0.25), 0 0 15px rgba(99, 86, 255, 0.15);
              border-color: rgba(99, 86, 255, 0.35);
            }
            50% {
              box-shadow: 0 0 20px rgba(99, 86, 255, 0.65), 0 0 35px rgba(99, 86, 255, 0.35);
              border-color: rgba(99, 86, 255, 0.85);
            }
          }
          .pulse-glow-node {
            animation: pulse-glow 3s infinite ease-in-out;
          }
        ` }} />

        <div className='container mx-auto px-4 relative z-10'>
          <div className='text-center mb-16 flex flex-col gap-3'>
            <span className='text-primary text-sm font-semibold tracking-wider uppercase'>
              Detailed Path
            </span>
            <h2 className='text-3xl md:text-4xl font-bold text-midnight_text'>
              Weekly Curriculum Timeline
            </h2>
            <div className='w-20 h-1 bg-primary mx-auto rounded-full mt-1' />
          </div>

          <div className="relative max-w-5xl mx-auto px-4 mt-16 pb-12">
            {/* Center Timeline line - subtle style */}
            <div className="absolute left-1/2 top-0 bottom-0 w-[2px] -translate-x-1/2 bg-primary/20 z-0" />

            {/* Timeline items list */}
            <div className="space-y-12 lg:space-y-8 relative z-10">
              {course.weeks.map((w, idx) => {
                const isExpanded = !!expandedWeeks[w.week]
                const isEven = idx % 2 === 0
                const weekIcon = renderWeekIcon(w.topic, idx)
                return (
                  <div key={idx} className="flex flex-col lg:grid lg:grid-cols-11 lg:gap-8 items-center relative">
                    
                    {/* Centered Node for Mobile / Tablet (hidden on desktop) */}
                    <div className="lg:hidden flex flex-col items-center z-10 mb-4">
                      <div
                        onClick={() => toggleWeek(w.week)}
                        className="w-12 h-12 rounded-full bg-white border-2 border-primary flex items-center justify-center cursor-pointer shadow-lg hover:scale-105 active:scale-95 transition-all duration-300 pulse-glow-node text-primary"
                      >
                        <div className="w-5 h-5 flex items-center justify-center">
                          {weekIcon}
                        </div>
                      </div>
                      <span className="text-[10px] font-bold text-primary mt-1.5 bg-primary/10 px-2 py-0.5 rounded-full">
                        Week {w.week}
                      </span>
                    </div>

                    {/* Even Row: Left Card / Odd Row: Hidden spacer */}
                    <div className={`w-full lg:col-span-5 ${isEven ? 'block' : 'hidden lg:block lg:invisible'}`}>
                      {isEven && (
                        <TimelineCard
                          w={w}
                          isExpanded={isExpanded}
                          toggleWeek={toggleWeek}
                          weekIcon={weekIcon}
                          align="right"
                        />
                      )}
                    </div>

                    {/* Desktop Node (Center column) */}
                    <div className="hidden lg:flex lg:col-span-1 justify-center z-10">
                      <div className="flex flex-col items-center">
                        <div
                          onClick={() => toggleWeek(w.week)}
                          className="w-14 h-14 rounded-full bg-white border-2 border-primary flex items-center justify-center cursor-pointer shadow-lg hover:scale-110 active:scale-95 transition-all duration-300 pulse-glow-node text-primary"
                        >
                          <div className="w-6 h-6 flex items-center justify-center">
                            {weekIcon}
                          </div>
                        </div>
                        <span className="text-[11px] font-bold text-primary mt-2.5 bg-primary/10 px-2.5 py-1 rounded-full whitespace-nowrap">
                          Week {w.week}
                        </span>
                      </div>
                    </div>

                    {/* Odd Row: Right Card / Even Row: Hidden spacer */}
                    <div className={`w-full lg:col-span-5 ${!isEven ? 'block' : 'hidden lg:block lg:invisible'}`}>
                      {!isEven && (
                        <TimelineCard
                          w={w}
                          isExpanded={isExpanded}
                          toggleWeek={toggleWeek}
                          weekIcon={weekIcon}
                          align="left"
                        />
                      )}
                    </div>

                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 7. CAREER OPPORTUNITIES */}
      <section className='py-16 bg-slate-gray'>
        <div className='container mx-auto px-4'>
          <div className='text-center mb-12 flex flex-col gap-3'>
            <span className='text-primary text-sm font-semibold tracking-wider uppercase'>
              Placement Roles
            </span>
            <h2 className='text-3xl md:text-4xl font-bold text-midnight_text'>
              Career Opportunities
            </h2>
            <div className='w-20 h-1 bg-primary mx-auto rounded-full mt-1' />
          </div>

          <div className={`grid grid-cols-1 ${
            course.careers.length === 1 ? 'sm:grid-cols-1 md:grid-cols-1 max-w-md' :
            course.careers.length === 2 ? 'sm:grid-cols-2 md:grid-cols-2 max-w-2xl' :
            course.careers.length === 3 ? 'sm:grid-cols-2 md:grid-cols-3 max-w-4xl' :
            'sm:grid-cols-2 md:grid-cols-4 max-w-5xl'
          } gap-6 mx-auto`}>
            {course.careers.map((career, index) => (
              <div
                key={index}
                className='bg-white border border-black/5 p-6 rounded-2xl shadow-sm text-center flex flex-col items-center justify-center gap-3 hover:-translate-y-1 transition-transform duration-300'>
                <div className='w-12 h-12 rounded-full bg-primary/15 text-primary flex items-center justify-center transition-colors duration-300 group-hover:bg-primary/25'>
                  <GraphUpIcon className='text-xl' />
                </div>
                <span className='text-base font-bold text-midnight_text leading-tight'>
                  {career.career}
                </span>
                <span className='inline-flex items-center gap-1.5 text-xs font-bold text-primary bg-primary/10 px-3 py-1.5 rounded-full mt-1.5 border border-primary/10 transition-colors duration-300 group-hover:bg-primary/20'>
                  <WalletIcon className='text-sm shrink-0' />
                  Avg. Salary: {career.salary || getRoleSalary(career.career)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. WHY CHOOSE HMS COACHING */}
      <section className='py-16 bg-white'>
        <div className='container mx-auto px-4'>
          <div className='text-center mb-12 flex flex-col gap-3'>
            <span className='text-primary text-sm font-semibold tracking-wider uppercase'>
              Our Ecosystem
            </span>
            <h2 className='text-3xl md:text-4xl font-bold text-midnight_text'>
              Why Choose HMS Coaching
            </h2>
            <div className='w-20 h-1 bg-primary mx-auto rounded-full mt-1' />
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto'>
            {hmsPillars.map((pillar, index) => (
              <div
                key={index}
                className='bg-white border border-black/5 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 flex items-start gap-4'>
                <div className='w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0'>
                  {renderPillarIcon(pillar.title, 'text-2xl')}
                </div>
                <div>
                  <h3 className='text-lg font-bold text-midnight_text mb-1.5'>
                    {pillar.title}
                  </h3>
                  <p className='text-sm text-grey leading-relaxed'>
                    {pillar.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
