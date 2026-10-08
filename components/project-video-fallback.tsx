import Image, { type StaticImageData } from "next/image";
import { projectVideoFeedback } from "@/lib/data";

type ProjectVideoFallbackProps = {
  image: StaticImageData;
  title: string;
};

export default function ProjectVideoFallback({
  image,
  title,
}: ProjectVideoFallbackProps) {
  return (
    <div className="relative aspect-video w-full">
      <Image
        src={image}
        alt={`${title} screenshot`}
        fill
        className="object-cover object-top"
      />
      <p
        role="status"
        className="absolute inset-x-0 bottom-0 bg-background p-3 text-sm text-foreground"
      >
        {projectVideoFeedback.failed}
      </p>
    </div>
  );
}
