import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";
import { ChevronDownIcon } from "lucide-react";

export type FAQItem = {
  question: string;
  answer: string;
};

type FAQCollapsibleProps = {
  FAQItems: FAQItem[];
};

export function FAQCollapsible({ FAQItems }: FAQCollapsibleProps) {
  return (
    <div className="flex flex-none w-full flex-col gap-4">
      {FAQItems.map(({ question, answer }, index) => (
        <Card className="w-full" key={index}>
          <CardContent>
            <Collapsible>
              <CollapsibleTrigger asChild>
                <Button variant="plain" size="lg" className="group w-full">
                  {question}
                  <ChevronDownIcon className="ml-auto group-data-[state=open]:rotate-180" />
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent className="px-2.5 py-3">
                {answer}
              </CollapsibleContent>
            </Collapsible>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

type FAQCollapsibleSectionProps = {
  FAQItems: FAQItem[];
} & React.ComponentProps<"section">;

export function FAQCollapsibleSection({
  FAQItems,
  className,
  ...props
}: FAQCollapsibleSectionProps) {
  return (
    <section className={cn("flex w-full flex-col gap-4", className)} {...props}>
      <h2 className="font-semibold text-4xl w-full text-center">FAQ</h2>
      <FAQCollapsible FAQItems={FAQItems} />
    </section>
  );
}
