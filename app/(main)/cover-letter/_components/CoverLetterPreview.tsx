import React from "react";
import DOMPurify from "dompurify";

type CoverLetterPreviewProps = {
  content: string;
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
  };
};

export const CoverLetterPreview = React.forwardRef<
  HTMLDivElement,
  CoverLetterPreviewProps
>(({ content, personalInfo }: CoverLetterPreviewProps, ref) => {
  const today = new Date().toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div
      className="
        w-[210mm] min-h-[297mm] bg-white p-[25mm] shadow-2xl border text-slate-900 font-sans
        print:shadow-none print:border-none print:w-full print:h-auto
      "
      ref={ref}
    >
      <div className="mb-6 border-b pb-4 border-slate-200">
        <h1 className="text-xl font-bold uppercase tracking-tight">
          {personalInfo.fullName}
        </h1>
        <p className="text-sm text-slate-600">
          {personalInfo.email} | {personalInfo.phone}
        </p>
      </div>

      <div className="text-sm mb-6">{today}</div>

      <div
        className="
          prose max-w-none text-slate-800 
          space-y-4 text-justify leading-relaxed
          /* Memastikan spasi paragraf hasil AI rapi */
          [&>p]:text-sm [&>p]:leading-relaxed
        "
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(content),
        }}
      />

      <div className="mt-12 text-sm space-y-12">
        <p>Hormat Saya,</p>
        <p className="font-semibold">{personalInfo.fullName}</p>
      </div>
    </div>
  );
});

CoverLetterPreview.displayName = "CoverLetterPreview";
