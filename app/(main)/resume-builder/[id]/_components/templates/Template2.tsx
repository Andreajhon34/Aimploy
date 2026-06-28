import React from "react";
import { Mail, Phone } from "lucide-react";
import { FaLinkedin } from "react-icons/fa";
import DOMPurify from "dompurify";
import { Separator } from "@/components/ui/separator"; // Sesuaikan path komponenmu
// import { SectionTitle } from "./SectionTitle"; // Sesuaikan path komponenmu
import { UseFormWatch } from "react-hook-form";
import { ResumeBuilderDbSchema } from "../../../_schemas/resumeBuilderDbForm";

const SectionTitle = ({ title }: { title: string }) => (
  <h2 className="text-sm font-bold tracking-widest text-slate-900 uppercase mt-6 mb-2">
    {title}
  </h2>
);

type Template2Props = {
  watch: UseFormWatch<ResumeBuilderDbSchema>; // Sesuaikan dengan tipe utility React Hook Form kamu jika ada
};

export const Template2 = ({ watch }: Template2Props) => {
  const { personalInformation, educations, experiences, skills } = watch();

  // Standardisasi data (Sama persis dengan Template1 kamu)
  const education = (educations || []).map(
    ({ id, degree, description, endYear, institute, startYear }: any) => ({
      id,
      degree,
      institution: institute,
      graduationDate: endYear,
      details: description,
      startYear,
    }),
  );

  const experience = (experiences || []).map((field: any) => ({
    id: field.id,
    role: field.position,
    company: field.company,
    startDate: field.startDate,
    endDate: field.endDate,
    jobDescription: field.jobDescription,
  }));

  const summary = personalInformation?.describeProfile;
  const skillsState = skills;

  return (
    <div className="h-auto text-zinc-800 font-sans print:font-sans p-1 max-w-4xl mx-auto">
      {/* -- MODERN HEADER (Asymmetric Grid Layout) -- */}
      <header className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start border-b-2 border-zinc-900 pb-6 mb-6">
        <div className="md:col-span-2 space-y-1">
          <h1 className="text-4xl font-black tracking-tight text-zinc-900 uppercase">
            {personalInformation?.fullName}
          </h1>
          <p className="text-lg font-bold tracking-wide text-indigo-600 uppercase">
            {personalInformation?.job}
          </p>
          <p className="text-sm font-medium text-zinc-500">
            {personalInformation?.location}
          </p>
        </div>

        {/* Contact Info (Stacked Right Aligned on Desktop) */}
        <div className="flex flex-col gap-2 text-xs sm:text-sm text-zinc-600 md:items-end md:text-right md:justify-self-end">
          {personalInformation?.email && (
            <div className="flex items-center gap-2 md:flex-row-reverse">
              <Mail className="w-4 h-4 text-indigo-500 shrink-0" />
              <span>{personalInformation.email}</span>
            </div>
          )}
          {personalInformation?.number && (
            <div className="flex items-center gap-2 md:flex-row-reverse">
              <Phone className="w-4 h-4 text-indigo-500 shrink-0" />
              <span>{personalInformation.number}</span>
            </div>
          )}
          {personalInformation?.linkedinProfile && (
            <div className="flex items-center gap-2 md:flex-row-reverse">
              <FaLinkedin className="w-4 h-4 text-indigo-500 shrink-0" />
              <span>{personalInformation.linkedinProfile}</span>
            </div>
          )}
        </div>
      </header>

      {/* --- PROFESSIONAL SUMMARY --- */}
      {summary && (
        <section className="mb-6 print:block">
          <SectionTitle title="Profile Summary" />
          <p
            className="text-sm leading-relaxed text-zinc-600 text-justify prose max-w-none mt-2"
            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(summary) }}
          />
        </section>
      )}

      {/* --- WORK EXPERIENCE --- */}
      {experience && experience.length > 0 && (
        <section className="mb-6 print:block">
          <SectionTitle title="Professional Experience" />
          <div className="space-y-5 mt-3">
            {experience.map((exp) => (
              <div
                key={exp.id}
                className="print:block print:break-inside-avoid relative pl-4 border-l-2 border-zinc-200 hover:border-indigo-500 transition-colors"
              >
                {/* Bullet node decorator for modern look */}
                <div className="absolute -left-[6px] top-1.5 w-[10px] h-[10px] rounded-full bg-zinc-300 border border-white" />

                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-1">
                  <h3 className="text-sm font-bold text-zinc-900 uppercase tracking-wide">
                    {exp.role}
                  </h3>
                  <span className="text-xs font-semibold bg-zinc-100 text-zinc-700 px-2 py-0.5 rounded print:bg-transparent print:p-0 print:font-medium print:text-zinc-500">
                    {exp.startDate} — {exp.endDate}
                  </span>
                </div>
                <div className="mb-2">
                  <span className="text-sm font-semibold text-indigo-600">
                    {exp.company}
                  </span>
                </div>
                {exp.jobDescription && (
                  <div
                    className="prose prose-sm max-w-none text-zinc-600 leading-relaxed text-sm mt-1"
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(exp.jobDescription),
                    }}
                  />
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* --- EDUCATION --- */}
      {education && education.length > 0 && (
        <section className="mb-6 print:block print:break-inside-avoid">
          <SectionTitle title="Education" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-3">
            {education.map((edu) => (
              <div
                key={edu.id}
                className="print:block p-3 rounded-lg border border-zinc-100 bg-zinc-50/50 print:border-none print:p-0 print:bg-transparent"
              >
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="text-sm font-bold text-zinc-900">
                    {edu.degree}
                  </h3>
                  <span className="text-xs font-medium text-zinc-500 shrink-0">
                    {edu.startYear} - {edu.graduationDate}
                  </span>
                </div>
                <div className="mb-1">
                  <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">
                    {edu.institution}
                  </span>
                </div>
                {edu.details && (
                  <div
                    className="prose prose-sm max-w-none text-zinc-600 text-xs leading-relaxed mt-1"
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(edu.details),
                    }}
                  />
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* --- SKILLS --- */}
      {skillsState && (
        <section className="mb-6 print:block print:break-inside-avoid">
          <SectionTitle title="Core Expertise" />
          <div className="mt-2">
            <p
              className="text-sm leading-relaxed text-zinc-600 prose max-w-none architecture-skills"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(skillsState),
              }}
            />
          </div>
        </section>
      )}
    </div>
  );
};
