import SectionHeading from "@/components/section-heading";
import { careerQuestions, careerQuestionsLead } from "@/lib/data";

export default function Questions() {
  return (
    <section
      id="questions"
      className="mb-20 w-full scroll-mt-28 text-center sm:mb-28"
    >
      <SectionHeading>Questions</SectionHeading>
      <p className="-mt-6 mb-8 text-muted-foreground">{careerQuestionsLead}</p>
      <div className="space-y-3 text-left">
        {careerQuestions.map((question) => (
          <details
            key={question.prompt}
            className="rounded-lg border border-border bg-card px-4 py-3 text-card-foreground"
          >
            <summary className="cursor-pointer font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background">
              {question.prompt}
            </summary>
            <p className="mt-3 text-muted-foreground">{question.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
