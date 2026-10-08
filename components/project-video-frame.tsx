"use client";

import dynamic from "next/dynamic";
import type { StaticImageData } from "next/image";
import ProjectVideoFallback from "@/components/project-video-fallback";
import ProjectVideoBoundary from "@/components/project-video-boundary";
import { projectVideoFeedback } from "@/lib/data";

type ProjectVideoFrameProps = {
  url: string;
  image: StaticImageData;
  title: string;
};

const DeferredVideo = dynamic(
  () =>
    import("@/components/project-video").catch(() => ({
      default: ProjectVideoFallback,
    })),
  {
    ssr: false,
    loading: () => (
      <div
        role="status"
        className="flex aspect-video w-full items-center justify-center bg-background p-3 text-sm text-foreground"
      >
        {projectVideoFeedback.loading}
      </div>
    ),
  },
);

export default function ProjectVideoFrame(props: ProjectVideoFrameProps) {
  return (
    <ProjectVideoBoundary
      key={props.url}
      fallback={
        <ProjectVideoFallback image={props.image} title={props.title} />
      }
    >
      <DeferredVideo {...props} />
    </ProjectVideoBoundary>
  );
}
