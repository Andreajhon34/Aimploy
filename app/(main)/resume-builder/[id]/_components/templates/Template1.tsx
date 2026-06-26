import type { ResumeBuilderSchema } from "@/app/(main)/resume-builder/_schemas/resumeBuilderForm";
import { Separator } from "@/components/ui/separator";
import DOMPurify from "dompurify";
import { Mail, Phone } from "lucide-react";
import React from "react";
import { UseFormWatch } from "react-hook-form";
import { FaLinkedin } from "react-icons/fa";
import { ResumeBuilderDbSchema } from "../../../_schemas/resumeBuilderDbForm";

const SectionTitle = ({ title }: { title: string }) => (
  <h2 className="text-sm font-bold tracking-widest text-slate-900 uppercase mt-6 mb-2">
    {title}
  </h2>
);

type Template1Props = React.ComponentProps<"div"> & {
  watch: UseFormWatch<ResumeBuilderDbSchema>;
};

{
  /* This is not pretty but it could work lol */
}
export const Template1 = ({ watch }: Template1Props) => {
  const { personalInformation, educations, experiences, skills } = watch();

  const education = educations.map(
    ({ id, degree, description, endYear, institute, startYear }) => ({
      id,

      degree,

      institution: institute,

      graduationDate: endYear,

      details: description,

      startYear,
    }),
  );

  const experience = experiences.map((field) => ({
    id: field.id,

    role: field.position,

    company: field.company,

    startDate: field.startDate,

    endDate: field.endDate,

    jobDescription: field.jobDescription,
  }));

  const summary = personalInformation.describeProfile;

  const skillsState = skills;

  return (
    <div
      /* FIX 1: Hapus h-full, biarkan mengalir alami (h-auto) */
      className="h-auto text-slate-800 font-sans print:font-sans"
    >
      {/* -- HEADER -- */}
      <header className="flex flex-col items-start text-left mb-6">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-950 mb-1">
          {personalInformation.fullName}
        </h1>
        <p className="text-lg font-medium text-slate-800">
          {personalInformation.job}
        </p>
        <p className="text-sm font-medium text-slate-600 mb-4">
          {personalInformation.location}
        </p>
        <div className="flex flex-wrap justify-center sm:justify-start gap-x-4 gap-y-2 text-xs sm:text-sm text-slate-500">
          {personalInformation.email && (
            <div className="flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5" />
              <span>{personalInformation.email}</span>
            </div>
          )}

          {personalInformation.number && (
            <div className="flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5" />
              <span>{personalInformation.number}</span>
            </div>
          )}

          {personalInformation.linkedinProfile && (
            <div className="flex items-center gap-1.5">
              <FaLinkedin className="w-3.5 h-3.5" />
              <span>{personalInformation.linkedinProfile}</span>
            </div>
          )}
        </div>
      </header>

      {/* --- SUMMARY --- */}
      {summary && (
        <section className="mb-6 print:block">
          <Separator className="bg-black/50" />
          <SectionTitle title="Professional Summary" />
          <p
            className="text-sm leading-relaxed text-slate-600 text-justify prose max-w-none"
            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(summary) }}
          />
        </section>
      )}

      {/* --- EXPERIENCE --- */}
      {experience && experience.length === 1 && (
        <section className="mb-6 print:block print:break-inside-avoid">
          <Separator className="bg-black/50" />
          <SectionTitle title="Experience" />
          <div className="space-y-6">
            <div className="print:block print:break-inside-avoid">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-1">
                <h3 className="text-sm font-bold text-slate-900">
                  {experience[0].role}
                </h3>
                <span className="text-xs font-medium text-slate-500">
                  {experience[0].startDate} - {experience[0].endDate}
                </span>
              </div>
              <div className="mb-2">
                <span className="text-sm font-medium text-slate-700">
                  {experience[0].company}
                </span>
              </div>

              {/* FIX 3: Bersihkan duplikasi SectionTitle besar di sini */}
              {experience[0].jobDescription && (
                <div
                  className="prose prose-sm max-w-none text-slate-600 leading-relaxed pl-4 border-l border-slate-200/60"
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(experience[0].jobDescription),
                  }}
                />
              )}
            </div>
          </div>
        </section>
      )}

      {experience && experience.length > 1 && (
        <div className="space-y-6">
          {experience.map((exp) => (
            <div key={exp.id} className="print:block print:break-inside-avoid">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-1">
                <h3 className="text-sm font-bold text-slate-900">{exp.role}</h3>
                <span className="text-xs font-medium text-slate-500">
                  {exp.startDate} - {exp.endDate}
                </span>
              </div>
              <div className="mb-2">
                <span className="text-sm font-medium text-slate-700">
                  {exp.company}
                </span>
              </div>

              {/* FIX 3: Bersihkan duplikasi SectionTitle besar di sini */}
              {exp.jobDescription && (
                <div
                  className="prose prose-sm max-w-none text-slate-600 leading-relaxed pl-4 border-l border-slate-200/60"
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(exp.jobDescription),
                  }}
                />
              )}
            </div>
          ))}
        </div>
      )}

      {/* --- EDUCATION --- */}
      {education && education.length === 1 && (
        <section className="mb-6 print:block print:break-inside-avoid">
          <Separator className="bg-black/50" />
          <SectionTitle title="Education" />
          <div className="space-y-5">
            <div key={education[0].id} className="print:block">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-1">
                <h3 className="text-sm font-bold text-slate-900">
                  {education[0].degree}
                </h3>
                <span className="text-xs font-medium text-slate-500">
                  {education[0].startYear} - {education[0].graduationDate}
                </span>
              </div>
              <div className="mb-1">
                <span className="text-sm font-medium text-slate-700">
                  {education[0].institution}
                </span>
              </div>
              {education[0].details && (
                <div
                  className="prose prose-sm max-w-none text-slate-600 leading-relaxed"
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(education[0].details),
                  }}
                />
              )}
            </div>
          </div>
        </section>
      )}

      {education && education.length > 1 && (
        <div className="space-y-5 print:block print:break-inside-avoid">
          {education.map((edu) => (
            /* FIX 4: Pasang anti-potong juga di item edukasi */
            <div key={edu.id} className="print:block">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-1">
                <h3 className="text-sm font-bold text-slate-900">
                  {edu.degree}
                </h3>
                <span className="text-xs font-medium text-slate-500">
                  {edu.startYear} - {edu.graduationDate}
                </span>
              </div>
              <div className="mb-1">
                <span className="text-sm font-medium text-slate-700">
                  {edu.institution}
                </span>
              </div>
              {edu.details && (
                <div
                  className="prose prose-sm max-w-none text-slate-600 leading-relaxed"
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(edu.details),
                  }}
                />
              )}
            </div>
          ))}
        </div>
      )}

      {/* -- SKILLS -- */}
      {skillsState && (
        <section className="mb-6 print:block print:break-inside-avoid">
          <Separator className="bg-black/50" />
          <SectionTitle title="Skills" />
          <p
            className="text-sm leading-relaxed text-slate-600 prose max-w-none"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(skillsState),
            }}
          />
        </section>
      )}
    </div>
  );
};
