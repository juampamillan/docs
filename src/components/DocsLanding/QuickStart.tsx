import React from "react";
import Link from "@docusaurus/Link";
import { Compass, Search, Zap } from "lucide-react";

const paths = [
  {
    icon: Compass,
    title: "Soy nuevo aquí",
    description: "Empieza por los principios de arquitectura para entender la visión general.",
    to: "/docs/arquitectura/intro",
    cta: "Comenzar por Arquitectura →",
  },
  {
    icon: Search,
    title: "Busco un patrón",
    description: "Tengo un problema concreto y quiero ver cómo se resuelve con buenas prácticas.",
    to: "/docs/intro",
    cta: "Ver todas las secciones →",
  },
  {
    icon: Zap,
    title: "Referencia rápida",
    description: "Quiero verificar un estándar específico: naming, HTTP codes, Git flow.",
    to: "/docs/gobernanza/intro",
    cta: "Ir a Gobernanza →",
  },
];

export function QuickStart() {
  return (
    <section className="py-12 px-6 md:px-0 border-t border-border">
      <div className="max-w-6xl mx-auto">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-6 text-center">
          ¿Por dónde empezar?
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {paths.map((path) => (
            <Link
              key={path.title}
              to={path.to}
              className="group flex flex-col gap-3 p-5 rounded-lg border border-border bg-card/50 hover:border-primary/50 hover:bg-accent/30 transition-all duration-200 no-underline"
            >
              <div className="text-muted-foreground group-hover:text-primary transition-colors">
                <path.icon size={20} />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground mb-1">{path.title}</p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {path.description}
                </p>
              </div>
              <span className="text-xs text-primary font-medium mt-auto">{path.cta}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
