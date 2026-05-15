import React from "react";
import Link from "@docusaurus/Link";
import { BookOpen, Cpu, Database, Layers, Lock, Settings, Shield, Terminal, Zap } from "lucide-react";

const categories = [
  {
    title: "Arquitectura",
    description: "Principios de diseño, patrones de comunicación, NFRs y ADRs.",
    to: "/docs/arquitectura/intro",
    icon: Layers,
  },
  {
    title: "Backend",
    description: "APIs REST, Clean Architecture, testing y manejo de errores.",
    to: "/docs/backend/intro",
    icon: Cpu,
  },
  {
    title: "Frontend",
    description: "Microfrontends, state management, performance y accesibilidad.",
    to: "/docs/frontend/intro",
    icon: Zap,
  },
  {
    title: "DevOps",
    description: "Git, CI/CD, contenedores, IaC e incident management.",
    to: "/docs/devops/intro",
    icon: Terminal,
  },
  {
    title: "Base de Datos",
    description: "Modelado, migraciones, caching con Redis y patrones NoSQL.",
    to: "/docs/database/intro",
    icon: Database,
  },
  {
    title: "Seguridad",
    description: "OWASP, autenticación, gestión de secretos y seguridad en APIs.",
    to: "/docs/seguridad/intro",
    icon: Shield,
  },
  {
    title: "Gobernanza",
    description: "Code review, onboarding, deuda técnica y feature flags.",
    to: "/docs/gobernanza/intro",
    icon: Settings,
  },
  {
    title: "Arquitectura — Decisiones",
    description: "ADRs: registro de decisiones técnicas importantes con su razonamiento.",
    to: "/docs/arquitectura/adrs",
    icon: BookOpen,
  },
];

export function CategoryGrid() {
  return (
    <section className="py-20 px-6 md:px-0">
      <div className="max-w-6xl mx-auto">
        <div className="mb-10 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-foreground">
            Explorar por sección
          </h2>
          <Link
            to="/docs/intro"
            className="text-xs text-muted-foreground hover:text-primary transition-colors no-underline"
          >
            Ver mapa completo →
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
