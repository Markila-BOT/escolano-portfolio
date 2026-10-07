import React from "react";

type SectionHeadingProps = {
  children: React.ReactNode;
  id?: string;
};

export default function SectionHeading({ children, id }: SectionHeadingProps) {
  return (
    <h2 id={id} className="mb-8 text-center text-3xl font-medium capitalize">
      {children}
    </h2>
  );
}
