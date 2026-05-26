import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import type { ResumeBuilderSchema } from "@/app/(main)/resume-builder/_schemas/resumeBuilderForm";
import { Mail, Phone } from "lucide-react";
import React from "react";
import { FaLinkedin } from "react-icons/fa";
import DOMPurify from "dompurify";

const SectionTitle = ({ title }: { title: string }) => (
  <h2 className="text-sm font-bold tracking-widest text-slate-900 uppercase mt-6 mb-2">
    {title}
  </h2>
);

type Template1Props = React.ComponentProps<"div"> & {
  watch: () => ResumeBuilderSchema;
};

{
  /* This is not pretty but it could work lol */
}
export const Template1 = React.forwardRef<HTMLDivElement, Template1Props>(
  ({ watch, ...props }, ref) => {
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

    const personalInfo = {
      name: personalInformation.fullName,
      title: personalInformation.job,
      email: personalInformation.email,
      phone: personalInformation.number,
      linkedin: personalInformation.linkedinProfile,
    };
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
        ref={ref}
        {...props}
        className="resume-conf shadow-md ring-1 ring-slate-900/5 text-slate-800 font-sans print:font-sans"
      >
        {/* -- HEADER -- */}
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
            {personalInfo.linkedin && (
              <div className="flex items-center gap-1.5">
                {/* <Linkedin className="w-3.5 h-3.5" /> */}
                <FaLinkedin className="w-3.5 h-3.5" />
                <span>{personalInfo.linkedin}</span>
              </div>
            )}
          </div>
        </header>

        {/* --- SUMMARY --- */}
        {summary && (
          <section>
            <Separator />
            <SectionTitle title="Professional Summary" />
            <p
              className="text-sm leading-relaxed text-slate-600 text-justify prose max-w-none"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(summary),
              }}
            />
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
                    <h3 className="text-sm font-bold text-slate-900">
                      {exp.role}
                    </h3>
                    <span className="text-xs font-medium text-slate-500">
                      {exp.startDate} - {exp.endDate}
                    </span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-2">
                    <span className="text-sm font-medium text-slate-700">
                      {exp.company}
                    </span>
                  </div>
                  {exp.jobDescription && (
                    <section>
                      <Separator />
                      <SectionTitle title="JOB DESCRIPTION" />
                      <div
                        className="prose prose-sm leading-relaxed"
                        dangerouslySetInnerHTML={{
                          __html: DOMPurify.sanitize(exp.jobDescription),
                        }}
                      />
                    </section>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* --- EDUCATION --- */}
        {education && education.length > 0 && (
          <section>
            <Separator />
            <SectionTitle title="Education" />
            <div className="space-y-4">
              {education.map((edu) => (
                <div key={edu.id}>
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-1">
                    <h3 className="text-sm font-bold text-slate-900">
                      {edu.degree}
                    </h3>
                    <span className="text-xs font-medium text-slate-500">
                      {edu.startYear} - {edu.graduationDate}
                    </span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-1">
                    <span className="text-sm font-medium text-slate-700">
                      {edu.institution}
                    </span>
                    {/* <span className="text-xs text-slate-400 italic">{edu.location}</span> */}
                  </div>
                  <div
                    className="prose prose-sm leading-relaxed"
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(edu.details),
                    }}
                  />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* -- SKILLS -- */}
        <section>
          <p
            className="text-sm leading-relaxed text-slate-600 text-justify prose max-w-none"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(skillsState),
            }}
          />
        </section>
      </div>
    );
  },
);

Template1.displayName = "Template1";
