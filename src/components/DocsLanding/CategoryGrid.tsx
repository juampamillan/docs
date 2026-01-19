import React from "react";
import Link from "@docusaurus/Link";
import { BookOpen, Cpu, Layers, Settings, Terminal, Zap } from "lucide-react";

const categories = [
  {
    title: "Getting Started",
    description: "Learn the fundamentals and get your environment set up in minutes.",
    to: "/docs/intro",
    icon: Zap,
  },
  {
    title: "Core Concepts",
    description: "Deep dive into the mental models and core principles of the system.",
    to: "/docs/intro",
    icon: BookOpen,
  },
  {
    title: "Architecture",
    description: "Understand how the internals work and how components communicate.",
    to: "/docs/intro",
    icon: Layers,
  },
  {
    title: "Guides",
    description: "Step-by-step instructions for common tasks and real-world scenarios.",
    to: "/docs/intro",
    icon: Terminal,
  },
  {
    title: "Reference",
    description: "Detailed API specifications, CLI commands, and configuration options.",
    to: "/docs/intro",
    icon: Settings,
  },
  {
    title: "Performance",
    description: "Optimization techniques and best practices for high-scale apps.",
    to: "/docs/intro",
    icon: Cpu,
  },
];

export function CategoryGrid() {
  return (
    <section className="py-20 px-6 md:px-0">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <Link key={category.title} to={category.to} className="group relative flex flex-col p-6 rounded-lg border border-border bg-card hover:bg-accent transition-all duration-200 no-underline">
              <div className="mb-4 text-primary group-hover:text-primary transition-colors">
                <category.icon size={24} />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2 group-hover:underline">{category.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{category.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
