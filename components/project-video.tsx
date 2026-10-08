"use client";

import { useState } from "react";
import Image, { type StaticImageData } from "next/image";
import ReactPlayer from "react-player";
import { projectVideoFeedback } from "@/lib/data";

type ProjectVideoProps = {
  url: string;
  image: StaticImageData;
  title: string;
};

export default function ProjectVideo({ url, image, title }: ProjectVideoProps) {
  const [isReady, setIsReady] = useState(false);
  const [hasError, setHasError] = useState(false);

  return (
    <div className="relative aspect-video w-full">
      {(!isReady || hasError) && (
        <Image
          src={image}
          alt={`${title} screenshot`}
          fill
          className="object-cover object-top"
        />
      )}
      {!hasError && (
        <ReactPlayer
          url={url}
          playing
          loop
          height="100%"
          width="100%"
          onReady={() => setIsReady(true)}
          onError={() => setHasError(true)}
          style={{
            position: "absolute",
            inset: 0,
            visibility: isReady ? "visible" : "hidden",
          }}
        />
      )}
      {(!isReady || hasError) && (
        <p
          role="status"
          className="absolute inset-x-0 bottom-0 bg-background p-3 text-sm text-foreground"
        >
          {hasError
            ? projectVideoFeedback.failed
            : projectVideoFeedback.loading}
        </p>
      )}
    </div>
  );
}
