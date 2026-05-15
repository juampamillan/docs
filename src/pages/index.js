import React from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';

import { Hero } from '../components/DocsLanding/Hero';
import { QuickStart } from '../components/DocsLanding/QuickStart';
import { CategoryGrid } from '../components/DocsLanding/CategoryGrid';

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title}`}
      description="Guías técnicas, estándares y patrones para ingeniería de software moderna.">
      <main className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/20">
        <Hero />
        <QuickStart />
        <CategoryGrid />
      </main>
    </Layout>
  );
}
