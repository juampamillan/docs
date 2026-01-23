import React from "react";
import Link from "@docusaurus/Link";
import { BookOpen, Cpu, Layers, Settings, Terminal, Zap } from "lucide-react";

const categories = [
  {
    title: "Arquitectura",
    description: "Principios de diseño, stack tecnológico y patrones de comunicación.",
    to: "/docs/arquitectura/intro",
    icon: Layers,
  },
  {
    title: "Frontend",
    description: "Microfrontends con React, Module Federation y buenas prácticas de UI.",
    to: "/docs/frontend/intro",
    icon: Zap,
  },
  {
    title: "Backend",
    description: "APIs con FastAPI, Clean Architecture y estándares de DTOs.",
    to: "/docs/backend/intro",
    icon: BookOpen,
  },
  {
    title: "Base de Datos",
    description: "PostgreSQL en Cloud SQL, permisos y convenciones de nomenclatura.",
    to: "/docs/database/intro",
    icon: Layers,
  },
  {
    title: "DevOps",
    description: "CI/CD, Gitflow, Cloud Run y despliegue automatizado.",
    to: "/docs/devops/intro",
    icon: Terminal,
  },
];

export function CategoryGrid() {
  return (
    <section className="py-20 px-6 md:px-0">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <Link key={category.title} to={category.to} className="card-transparent-dark group relative flex flex-col p-6 rounded-lg border border-border bg-card hover:bg-accent/50 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 no-underline">
              <div className="mb-4 text-primary group-hover:text-primary transition-colors group-hover:drop-shadow-[0_0_8px_rgba(0,126,249,0.5)]">
                <category.icon size={24} />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">{category.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{category.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
