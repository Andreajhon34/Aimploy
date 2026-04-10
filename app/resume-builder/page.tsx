"use client"

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group"
import { 
    Briefcase, 
    Plus, 
    SendHorizonal,
    GraduationCap, 
    Trash, 
    User,
    Wrench,
    Sparkle,
    Printer
} from "lucide-react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useRef, useState } from "react";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { 
    useForm, 
    Controller, 
    type Control, 
    FormProvider, 
    useFormContext,
    useFieldArray 
} from 'react-hook-form';

import { z } from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "@/components/ui/textarea";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Template1 } from "@/components/resume-builder/templates";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import { Skeleton } from "@/components/ui/skeleton";


const personalInformationSchema = z.object({
    fullName: z.string(),
    job: z.string(),
    email: z.string(),
    number: z.string(),
    describeProfile: z.string(),
    linkedinProfile: z.string()
});

const experienceSchema = z.object({
    id: z.string(),
    company: z.string(),
    position: z.string(),
    startDate: z.string(),
    endDate: z.string(),
    jobDescription: z.string()
});

const eduationSchema = z.object({
    id: z.string(),
    institute: z.string(),
    degree: z.string(),
    startYear: z.string(),
    endYear: z.string(),
    description: z.string()
});

type PersonalInformationSchema = z.infer<typeof personalInformationSchema>;
type ExperienceSchema = z.infer<typeof experienceSchema>;
type EducationSchema = z.infer<typeof eduationSchema>;

const resumeBuilderSchema = z.object({
    personalInformation: personalInformationSchema,
    experiences: z.array(experienceSchema),
    educations: z.array(eduationSchema),
    skills: z.string()
});

type ResumeBuilderSchema = z.infer<typeof resumeBuilderSchema>;

import type { HTMLAttributes, ReactNode } from "react";
import { useMediaQuery } from "react-responsive";
import { useReactToPrint } from "react-to-print";

type CardBaseProps = {
    children: ReactNode;
    title: ReactNode
};

const CardBase = ({ children, title }: CardBaseProps) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex flex-row gap-x-3 justify-center">
                    {title}
                </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-y-4">
                {children} 
            </CardContent>
        </Card>       
    );
}

const PersonalInformationCard = () => {
    const context = useFormContext<ResumeBuilderSchema>();

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex flex-row gap-x-3 justify-center">
                    <User />
                    Informasi Pribadi
                </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-y-4">
                <Controller
                    name="personalInformation.fullName"
                    control={context.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="fullName">
                                Nama Lengkap
                            </FieldLabel>
                            <Input
                                {...field}
                                id="fullName"
                                aria-invalid={fieldState.invalid}
                                placeholder="Dill doe"
                                autoComplete="off"
                            />
                            {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                        </Field>
                    )}
                />
                <Controller
                    name="personalInformation.job"
                    control={context.control}
                    render={({ field, fieldState }) => (
                       <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="jobInput">
                                Posisi Pekerjaan
                            </FieldLabel>
                            <Input
                                {...field}
                                id="jobInput"
                                aria-invalid={fieldState.invalid}
                                placeholder="data analyst"
                                autoComplete="off"
                            />
                            {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                        </Field>
                    )}
                />
                <div className="grid grid-cols-2 gap-4">
                    <Controller
                    name="personalInformation.email"
                    control={context.control}
                    render={({ field, fieldState }) => (
                       <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="EmailInput">
                                Email
                            </FieldLabel>
                            <Input
                                {...field}
                                id="EmailInput"
                                aria-invalid={fieldState.invalid}
                                placeholder="dill.doe@email.com"
                                autoComplete="off"
                            />
                            {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                        </Field>
                        )}
                    />
                    <Controller
                        name="personalInformation.number"
                        control={context.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="numberInput">
                                        Nomor Telepon
                                    </FieldLabel>
                                    <Input
                                        {...field}
                                        id="numberInput"
                                        aria-invalid={fieldState.invalid}
                                        placeholder="+62 123-4567-8910"
                                        autoComplete="off"
                                    />
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                            </Field>
                        )}
                    />
                    
                </div>
                <Controller
                    name="personalInformation.linkedinProfile"
                    control={context.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="linkedinInput">
                                Profil LinkedIn
                            </FieldLabel>
                            <Input
                                {...field}
                                id="linkedinInput"
                                aria-invalid={fieldState.invalid}
                                autoComplete="off"
                                placeholder="linkedin.com/in/dill-doe"
                            />
                            {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                        </Field>
                    )}
                />
                <Controller
                    name="personalInformation.describeProfile"
                    control={context.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor="describeInput">
                                    Ringkasan Profil
                                </FieldLabel>
                                <Textarea
                                    {...field}
                                    id="describeInput"
                                    aria-invalid={fieldState.invalid}
                                    placeholder="Seorang data analyst yang teliti dengan keahlian dalam pemodelan statistik, visualisasi data dan query berbasis SQL"
                                    autoComplete="off"
                                />
                                {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]} />
                                )}
                        </Field>
                    )}
                />
                
            </CardContent>
        </Card>
    );
}

const ExperienceCard = () => {
    const { control } = useFormContext<ResumeBuilderSchema>();
    const { append, remove, fields } = useFieldArray({ 
        control,
        name: "experiences"
    });

    type InputProperties = {
        readonly htmlFor: string;
        readonly label: string;
        readonly name: keyof ExperienceSchema;
        readonly placeholder?: string;
        readonly className?: HTMLAttributes<HTMLDivElement>['className'];
    };

    const inputProperties: ReadonlyArray<InputProperties> = [
        { htmlFor: "companyInput", label: "Perusahaan", name: "company", className:"col-span-1", placeholder: "PT Teknologi Inovasi Nusantara" },
        { htmlFor: "positionInput", label: "Posisi", name: "position", className: "col-span-1", placeholder: "Senior data analyst" },
        { htmlFor: "startDateInput", label: "Tanggal Mulai", name: "startDate", className: "col-span-1", placeholder: "Jan 2021" },
        { htmlFor: "endDateInput", label: "Tanggal Selesai", name: "endDate", className: "col-span-1", placeholder: "hari ini" }
    ];

    return (
        <CardBase 
            title={
                <>
                    <Briefcase />
                    Pengalaman kerja
                </>
            }
        >
            {fields.map((field, index) => (
                <Card key={field.id}>
                    <CardHeader>
                        <CardAction>
                            <Button
                                type="button"
                                variant="destructive"
                                onClick={() => remove(index)}
                            >
                                <Trash />
                            </Button>
                        </CardAction>
                    </CardHeader>
                    <CardContent className="grid grid-cols-2 gap-3">
                        {inputProperties.map(({ 
                            htmlFor, 
                            label, 
                            name, 
                            placeholder,
                            className 
                        }) => (
                            <Controller
                                key={htmlFor}
                                name={`experiences.${index}.${name}`}
                                control={control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid} className={className}>
                                        <FieldLabel htmlFor={htmlFor}>
                                            {label}
                                        </FieldLabel>
                                        <Input
                                            {...field}
                                            id={htmlFor}
                                            aria-invalid={fieldState.invalid}
                                            placeholder={placeholder}
                                            autoComplete="off"
                                        />
                                        {fieldState.invalid && (
                                            <FieldError errors={[fieldState.error]} />
                                        )}
                                    </Field>
                                )}
                            />
                        ))}
                        <Controller
                            name={`experiences.${index}.jobDescription`}
                            control={control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid} className="col-span-2">
                                    <FieldLabel htmlFor="jobDescriptionInput">
                                        Deskripsi pekerjaan
                                    </FieldLabel>
                                    <Textarea
                                        {...field}
                                        id="jobDescriptionInput"
                                        aria-invalid={fieldState.invalid}
                                        autoComplete="off"
                                        placeholder="Pengalaman lebih dari 7 tahun dalam analitik lanjutan, business intelegence dan strategi data"
                                    />
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />
                    </CardContent>
                </Card>
            ))}

            <Button
                onClick={() => append({
                    id: Date.now().toString(),
                    company: "",
                    endDate: "",
                    startDate: "",
                    jobDescription: "",
                    position: ""
                })}
            >
                <Plus />
                Tambah
            </Button>
        </CardBase>
    );
}

const EducationCard = () => {
    const { control } = useFormContext<ResumeBuilderSchema>();
    const { fields, remove, append } = useFieldArray({ 
        control,
        name: "educations"
    });


    type InputProperties = {
        readonly htmlFor: string;
        readonly label: string;
        readonly name: keyof EducationSchema;
        readonly placeholder?: string;
        readonly className: HTMLAttributes<HTMLDivElement>['className'];
    };

    const inputProperties: ReadonlyArray<InputProperties> = [
        { htmlFor: "instituteInput", label: "Instusi / Sekolah", name: "institute", className:"col-span-1", placeholder: "Institut Teknologi Bandung" },
        { htmlFor: "degreeInput", label: "Gelar / Sarjana", name: "degree", className: "col-span-1", placeholder: "Teknik Informatika" },
        { htmlFor: "endYearInput", label: "Tanggal Selesai", name: "endYear", className: "col-span-1", placeholder: "May 2023" },
        { htmlFor: "startYearInput", label: "Tanggal Mulai", name: "startYear", className: "col-span-1", placeholder: "Sept 2019" }
    ];

    return (
        <CardBase
            title={
                <>
                    <GraduationCap />
                    Pendidikan       
                </>
            }
        >
            {fields.map((field, index) => (
                <Card key={field.id}>
                    <CardHeader>
                        <CardAction>
                            <Button
                                type="button"
                                variant="destructive"
                                onClick={() => remove(index)}
                            >
                                <Trash />
                            </Button>
                        </CardAction>
                    </CardHeader>
                    <CardContent className="grid grid-cols-2 gap-3">
                        {inputProperties.map((property) => (
                            <Controller
                                key={property.htmlFor}
                                name={`educations.${index}.${property.name}`}
                                control={control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid} className={property.className}>
                                        <FieldLabel htmlFor={property.htmlFor}>
                                            {property.label}
                                        </FieldLabel>
                                        <Input
                                            {...field}
                                            id={property.htmlFor}
                                            aria-invalid={fieldState.invalid}
                                            placeholder={property.placeholder}
                                            autoComplete="off"
                                        />
                                        {fieldState.invalid && (
                                            <FieldError errors={[fieldState.error]} />
                                        )}
                                    </Field>
                                )}
                            />
                        ))}
                        <Controller
                            name={`educations.${index}.description`}
                            control={control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid} className="col-span-2">
                                    <FieldLabel htmlFor="descriptionInput">
                                        Deskripsi / Catatan Tambahan
                                    </FieldLabel>
                                    <Textarea
                                        {...field}
                                        id="decriptionInput"
                                        aria-invalid={fieldState.invalid}
                                        autoComplete="off"
                                        placeholder="IPK: 3.85. Aktif dalam himpunan mahasiswa dan memenangkan kompetisi hackathon nasional"
                                    />
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />
                    </CardContent>
                </Card>
            ))}

             <Button
                onClick={() => append({
                    id: Date.now().toString(),
                    degree: "",
                    startYear: "",
                    endYear: "",
                    institute: "",
                    description: ""
                })}
            >
                <Plus />
                Tambah
            </Button>
        </CardBase>
    );
}

const SkillCard = () => {
    const { control } = useFormContext<ResumeBuilderSchema>();

    return (
        <CardBase
            title={
                <>
                    <Wrench />
                    Keahlian
                </>
            }
        >
            <Controller
                name="skills"
                control={control}
                render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="skillsInput">
                            Tuliskan keahlian kamu di sini
                        </FieldLabel>
                        <Textarea
                            {...field}
                            id="skillsInput"
                            aria-invalid={fieldState.invalid}
                            autoComplete="off"
                            placeholder="JavaScript, TypeScript, React, Next.js, Node.js, Tailwind CSS, Git, PostgreSQL"
                        />
                        {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                        )}
                    </Field>
                )}
            />
        </CardBase>
    );
}


const PERSONAL_INFORMATION_DEFAULTS: PersonalInformationSchema  = {
    fullName: "",
    email: "",
    job: "",
    number: "",
    describeProfile: "",
    linkedinProfile: ""
}

const EXPERIENCE_DEFAULTS: ExperienceSchema = {
    id: "1",
    company: "",
    endDate: "",
    jobDescription: "",
    position: "",
    startDate: ""
};

const EDUCATION_DEFAULT: EducationSchema = {
    id: "1",
    degree: "",
    endYear: "",
    institute: "",
    startYear: "",
    description: ""
};

export default function ResumeBuilderPage() {
    const methods = useForm<ResumeBuilderSchema>({
        resolver: zodResolver(resumeBuilderSchema),
        defaultValues: {
            personalInformation: PERSONAL_INFORMATION_DEFAULTS,
            experiences: [],
            educations: [],
            skills: "" 
        },
        mode: "onBlur"
    });

    const isLoading = methods.formState.isSubmitting || !methods.formState.isValid;

    const isMd = useMediaQuery({ minWidth: "768px"});

    const [isMounted, setIsMounted] = useState(false);

    const contentRef = useRef<HTMLDivElement | null>(null);

    const handlePrint = useReactToPrint({
        contentRef
    });

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if(!isMounted) {
        return (
            <div className="flex w-full h-dvh p-4 gap-4">
                <Skeleton className="w-[40%] h-full rounded-xl" />
                <Skeleton className="w-[60%] h-full rounded-xl" />
            </div>
        );
    }

    const onSubmit = async (data: ResumeBuilderSchema) => {
        try {
            await new Promise((resolve) => setTimeout(resolve, 1500));
        } catch (error) {
            console.error(error);
            alert("Terjadi kesalahan saat menghubungi AI");
        } finally {};
    };


    return (
        <div className="flex h-dvh w-full relative">
            <ResizablePanelGroup orientation={isMd ? "horizontal" : "vertical"}>              
                <ResizablePanel defaultSize="40%" minSize="35%" maxSize="60%">
                    <div className="px-4 h-full overflow-y-auto no-scrollbar">
                        <h1 className="text-xl font-bold my-3">Resume builder</h1>
                        <form className="flex flex-col gap-4" onSubmit={methods.handleSubmit(onSubmit)}>
                            <FormProvider {...methods}>
                                <PersonalInformationCard />
                                <ExperienceCard />
                                <EducationCard />
                                <SkillCard />
                            </FormProvider>
                            <Button type="submit" size="lg" className="my-4" disabled={isLoading}>
                                <Sparkle />
                                Generate with Aimploy
                            </Button>
                        </form>
                        {/* <ScrollBar className="invisible no-scrollbar" /> */}
                    </div>
                </ResizablePanel>
                <ResizableHandle withHandle/>
                <ResizablePanel defaultSize="60">
                    <div className="absolute bottom-12 right-8 z-50">
                        <Button onClick={handlePrint} className="shadow-lg h-16 w-42" variant="secondary">
                            <Printer className="w-4 h-4 mr-2" />
                            Export to PDF
                        </Button>
                    </div>
                    <div className="h-full overflow-auto no-scrollbar">
                        <Template1 ref={contentRef} />
                    </div>
                </ResizablePanel>
            </ResizablePanelGroup>  
        </div>
    );
} 