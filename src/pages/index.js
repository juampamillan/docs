import React from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';

import { Hero } from '../components/DocsLanding/Hero';
import { CategoryGrid } from '../components/DocsLanding/CategoryGrid';

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title}`}
      description="Documentación técnica y mejores prácticas">
      <main className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/20">
        <Hero />
        <CategoryGrid />
      </main>
    </Layout>
  );
}
