"use client"

import React from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Globe 
} from 'lucide-react';
import { Separator } from '@/components/ui/separator';

const resumeData = {
  personalInfo: {
    name: "Budi Santoso",
    title: "Frontend Web Developer",
    email: "budi.santoso@email.com",
    phone: "+62 812 3456 7890",
    linkedin: "jshjhsjjhsjshsj"
  },
  summary: "Frontend Developer yang berorientasi pada detail dengan pengalaman 3+ tahun dalam membangun aplikasi web yang responsif dan berkinerja tinggi. Mahir menggunakan React, Next.js, dan ekosistem modern JavaScript. Terbukti mampu meningkatkan kecepatan load halaman sebesar 40% dan selalu antusias dalam menerapkan best practices UI/UX.",
  experience: [
    {
      id: 1,
      role: "Frontend Web Developer",
      company: "PT Teknologi Nusantara (TechNusa)",
      location: "Jakarta, Indonesia",
      startDate: "Jan 2022",
      endDate: "Sekarang",
      achievements: [
        "Memimpin migrasi arsitektur frontend dari React (CRA) ke Next.js, meningkatkan skor SEO dan Core Web Vitals secara keseluruhan.",
        "Berkolaborasi dengan tim desain menggunakan Figma untuk mengimplementasikan sistem desain (Design System) internal menggunakan Tailwind CSS dan Shadcn UI.",
        "Mengurangi technical debt dan memperbaiki memory leak, yang menghasilkan penurunan crash rate pada sisi klien sebesar 15%."
      ]
    },
    {
      id: 2,
      role: "Junior Web Developer",
      company: "Kreatif Digital Agency",
      location: "Bandung, Indonesia",
      startDate: "Agu 2020",
      endDate: "Des 2021",
      achievements: [
        "Membangun dan memelihara 10+ website klien menggunakan React, Vue.js, dan WordPress headless.",
        "Mengintegrasikan RESTful API dan GraphQL untuk manajemen state yang dinamis menggunakan Redux dan React Query.",
        "Melakukan optimasi aset gambar dan lazy loading yang meningkatkan kecepatan awal render hingga 3 detik."
      ]
    }
  ],
  education: [
    {
      id: 1,
      degree: "Sarjana Ilmu Komputer",
      institution: "Universitas Teknologi Indonesia",
      location: "Bandung, Indonesia",
      graduationDate: "Agt 2020",
      details: "IPK: 3.85/4.00 | Lulusan Terbaik Fakultas Ilmu Komputer"
    }
  ],
  skills: {
    programming: ["JavaScript (ES6+)", "TypeScript", "HTML5", "CSS3/SASS"],
    frameworks: ["React.js", "Next.js", "Vue.js", "Tailwind CSS", "Redux"],
    tools: ["Git/GitHub", "Webpack", "Vite", "Figma", "Jest"]
  },
  // projects: [
  //   {
  //     id: 1,
  //     name: "Aimployee.ai - AI Resume Builder",
  //     techStack: "React, Tailwind, OpenAI API",
  //     description: "Membangun platform pembuat CV cerdas yang membantu pengguna merangkai pengalaman kerja mereka menjadi lebih profesional menggunakan bantuan AI."
  //   }
  // ]
};


const Badge = ({ children }: { children: React.ReactNode }) => (
  <span className="inline-flex items-center rounded-md border border-slate-200 bg-slate-50 px-2.5 py-0.5 text-xs font-semibold text-slate-900 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2">
    {children}
  </span>
);

const SectionTitle = ({ title }: { title: string }) => (
  <h2 className="text-sm font-bold tracking-widest text-slate-900 uppercase mt-6 mb-2">
    {title}
  </h2>
);


{/* This is not pretty but it could work lol */}
export const Template1 = React.forwardRef<HTMLDivElement, React.ComponentProps<"div">>((props, ref) => {
    const { personalInfo, summary, experience, education, skills } = resumeData;

    return (
        <div ref={ref} {...props} className="bg-slate-100 py-8 px-4 sm:px-8 flex justify-center font-sans">
        {/* Kontainer Kertas A4 (rasio aspek standar kertas, dengan bayangan) */}
        <div className="w-full max-w-[210mm] h-full bg-white shadow-xl ring-1 ring-slate-900/5 px-10 py-12 sm:px-14 sm:py-16 text-slate-800"> 
          {/* --- HEADER (INFO PRIBADI) --- */}
          <header className="flex flex-col items-center sm:items-start text-center sm:text-left mb-6">
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-950 mb-1">
              {personalInfo.name}
            </h1>
            <p className="text-lg font-medium text-slate-600 mb-4">
              {personalInfo.title}
            </p>

            <div className="flex flex-wrap justify-center sm:justify-start gap-x-4 gap-y-2 text-xs sm:text-sm text-slate-500">
              {personalInfo.email && (
                <div className="flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5" />
                  <span>{personalInfo.email}</span>
                </div>
              )}
              {personalInfo.phone && (
                <div className="flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5" />
                  <span>{personalInfo.phone}</span>
                </div>
              )}
              {/* {personalInfo.location && (
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{personalInfo.location}</span>
                </div>
              )} */}
              {personalInfo.linkedin && (
                <div className="flex items-center gap-1.5">
                  {/* <Linkedin className="w-3.5 h-3.5" /> */}
                  <span>{personalInfo.linkedin}</span>
                </div>
              )}
              {/* {personalInfo.github && (
                <div className="flex items-center gap-1.5">
                  <Github className="w-3.5 h-3.5" />
                  <span>{personalInfo.github}</span>
                </div>
              )} */}
              {/* {personalInfo.portfolio && (
                <div className="flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5" />
                  <span>{personalInfo.portfolio}</span>
                </div>
              )} */}
            </div>
          </header>

          {/* --- SUMMARY --- */}
          {summary && (
            <section>
              <Separator />
              <SectionTitle title="Professional Summary" />
              <p className="text-sm leading-relaxed text-slate-600 text-justify">
                {summary}
              </p>
            </section>
          )}

          {/* --- EXPERIENCE --- */}
          {experience && experience.length > 0 && (
            <section>
              <Separator />
              <SectionTitle title="Experience" />
              <div className="space-y-5">
                {experience.map((exp) => (
                  <div key={exp.id}>
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-1">
                      <h3 className="text-sm font-bold text-slate-900">{exp.role}</h3>
                      <span className="text-xs font-medium text-slate-500">
                        {exp.startDate} - {exp.endDate}
                      </span>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-2">
                      <span className="text-sm font-medium text-slate-700">{exp.company}</span>
                      <span className="text-xs text-slate-400 italic">{exp.location}</span>
                    </div>
                    <ul className="list-outside list-disc pl-4 space-y-1">
                      {exp.achievements.map((achievement, idx) => (
                        <li key={idx} className="text-sm text-slate-600 leading-relaxed">
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* --- PROJECTS (Opsional) --- */}
          {/* {projects && projects.length > 0 && (
            <section>
              <Separator />
              <SectionTitle title="Selected Projects" />
              <div className="space-y-4">
                {projects.map((proj) => (
                  <div key={proj.id}>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-sm font-bold text-slate-900">{proj.name}</h3>
                      <span className="text-slate-300">|</span>
                      <span className="text-xs font-medium text-slate-500 italic">{proj.techStack}</span>
                    </div>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      {proj.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )} */}

          {/* --- EDUCATION --- */}
          {education && education.length > 0 && (
            <section>
              <Separator />
              <SectionTitle title="Education" />
              <div className="space-y-4">
                {education.map((edu) => (
                  <div key={edu.id}>
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-1">
                      <h3 className="text-sm font-bold text-slate-900">{edu.degree}</h3>
                      <span className="text-xs font-medium text-slate-500">{edu.graduationDate}</span>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-1">
                      <span className="text-sm font-medium text-slate-700">{edu.institution}</span>
                      <span className="text-xs text-slate-400 italic">{edu.location}</span>
                    </div>
                    {edu.details && (
                      <p className="text-sm text-slate-600">{edu.details}</p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* --- SKILLS --- */}
          {skills && (
            <section>
              <Separator />
              <SectionTitle title="Skills" />
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {skills.programming && (
                  <div>
                    <h4 className="text-xs font-bold text-slate-800 mb-2">Languages</h4>
                    <div className="flex flex-wrap gap-1.5">
                      {skills.programming.map(skill => <Badge key={skill}>{skill}</Badge>)}
                    </div>
                  </div>
                )}
                {skills.frameworks && (
                  <div>
                    <h4 className="text-xs font-bold text-slate-800 mb-2">Frameworks/Libs</h4>
                    <div className="flex flex-wrap gap-1.5">
                      {skills.frameworks.map(skill => <Badge key={skill}>{skill}</Badge>)}
                    </div>
                  </div>
                )}
                {skills.tools && (
                  <div>
                    <h4 className="text-xs font-bold text-slate-800 mb-2">Tools</h4>
                    <div className="flex flex-wrap gap-1.5">
                      {skills.tools.map(skill => <Badge key={skill}>{skill}</Badge>)}
                    </div>
                  </div>
                )}
              </div>
            </section>
          )}
        </div>
      </div>
    );
});

Template1.displayName = "Template1";