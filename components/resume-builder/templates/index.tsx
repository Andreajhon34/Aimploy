import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import type { ResumeBuilderSchema } from "@/schemas/resume-builder";
import { Mail, Phone } from "lucide-react";
import React from "react";
import { FaLinkedin } from "react-icons/fa";

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
        {...props}
        className="size-full bg-slate-100 py-8 px-4 sm:px-8 flex justify-center font-sans"
      >
        {/* Override the width to the screen settings */}
        <div
          ref={ref}
          className="a4-page w-full! bg-white shadow-xl ring-1 ring-slate-900/5 text-slate-800"
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
                        <ul className="list-outside list-disc pl-4 space-y-1 text-sm text-slate-700">
                          {exp.jobDescription
                            .split("\n")
                            .map((item) => item.trim())
                            .filter((item) => item.length > 0)
                            .map((poin, index) => {
                              const cleanPoin = poin.replace(/^[-•*]\s*/, "");

                              return (
                                <li key={index} className="leading-relaxed">
                                  {cleanPoin}
                                </li>
                              );
                            })}
                        </ul>
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
                    <ul className="list-outside list-disc pl-4 space-y-1 text-sm text-slate-700">
                      {edu.details
                        .split("\n")
                        .map((item) => item.trim())
                        .filter((item) => item.length > 0)
                        .map((poin, index) => {
                          const cleanPoin = poin.replace(/^[-•*]\s*/, "");

                          return (
                            <li key={index} className="leading-relaxed">
                              {cleanPoin}
                            </li>
                          );
                        })}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* -- SKILLS -- */}
          <section>
            {skillsState.categorized.length > 0 || skillsState.rawInput.length > 0 && (
              <SectionTitle title="Keahlian" />
            )}
            {skillsState?.categorized && skillsState.categorized.length > 0 ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {skillsState.categorized.map((group, idx) => (
                    <div key={idx}>
                      <h4 className="text-xs font-bold uppercase">
                        {group.category}
                      </h4>
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {group.items.map((item) => (
                          <Badge key={item}>{item}</Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="flex flex-wrap gap-1.5 mt-2">
                {skillsState?.rawInput?.split(",").map((skill, idx) => {
                  const cleanSkill = skill.trim();
                  if (!cleanSkill) return null;
                  return (
                    <Badge key={idx} variant="default">
                      {cleanSkill}
                    </Badge>
                  );
                })}
              </div>
            )}
          </section>
        </div>
      </div>
    );
  },
);

Template1.displayName = "Template1";
