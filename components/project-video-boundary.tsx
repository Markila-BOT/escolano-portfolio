"use client";

import { Component, type ReactNode } from "react";

type ProjectVideoBoundaryProps = {
  children: ReactNode;
  fallback: ReactNode;
};

export default class ProjectVideoBoundary extends Component<
  ProjectVideoBoundaryProps,
  { hasError: boolean }
> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    return this.state.hasError ? this.props.fallback : this.props.children;
  }
}
