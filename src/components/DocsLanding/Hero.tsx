import React from "react";
import Link from "@docusaurus/Link";

export function Hero() {
  return (
    <section className="py-24 px-6 md:px-0">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-primary mb-6 animate-in fade-in slide-in-from-bottom-4 duration-1000">Technical Documentation</h1>
        <p className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-200">
          Best practices, architecture manuals, and deep-dives for developers. Built with precision and clarity.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
          <Link
            className="inline-flex items-center justify-center rounded-md bg-primary px-8 py-3 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
            to="/docs/intro"
          >
            Get Started
          </Link>
          <Link
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-8 py-3 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
            to="https://github.com/juampamillan"
          >
            View on GitHub
          </Link>
        </div>
      </div>
    </section>
  );
}
