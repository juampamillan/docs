import React from "react";
import Link from "@docusaurus/Link";

export function Hero() {
  return (
    <section className="py-24 px-6 md:px-0">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-primary-deep mb-6 animate-in fade-in slide-in-from-bottom-4 duration-1000 neon-text">Documentación Técnica</h1>
        <p className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-200">
          Estándares, patrones y guías técnicas para construir sistemas modernos y mantenibles. Consulta rápida para decisiones de arquitectura, backend, frontend, DevOps y más.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
          <Link
            className="inline-flex items-center justify-center rounded-md bg-primary px-8 py-3 text-sm font-medium text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:bg-primary/90 hover:shadow-primary/50 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
            to="/docs/intro"
          >
            Comenzar
          </Link>
          <Link
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-8 py-3 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
            to="https://github.com/your-org/engineering-docs"
          >
            Ver en GitHub
          </Link>
        </div>

        <div className="flex flex-wrap justify-center gap-6 mt-12 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-500">
          {[
            { label: "Secciones", value: "8" },
            { label: "Guías técnicas", value: "40+" },
            { label: "Siempre en progreso", value: "↻" },
          ].map((stat) => (
            <div key={stat.label}
                 className="flex flex-col items-center gap-1 px-6 py-3 rounded-lg border border-border bg-card/50">
              <span className="text-2xl font-bold text-primary">{stat.value}</span>
              <span className="text-xs text-muted-foreground uppercase tracking-widest">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
