// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/vsDark");

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "juampamillan.docs",
  tagline: "Technical documentation & Engineering manuals.",
  url: "https://docs.juampamillan.com",
  baseUrl: "/",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  favicon: "img/favicon.png",

  // GitHub pages deployment config.
  organizationName: "juampamillan",
  projectName: "docs",

  i18n: {
    defaultLocale: "es",
    locales: ["es"],
  },

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          editUrl: "https://github.com/juampamillan/docs/tree/main/",
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      }),
    ],
  ],

  plugins: [
    async function myPlugin(context, options) {
      return {
        name: "docusaurus-tailwindcss",
        configurePostCss(postcssOptions) {
          // Appends TailwindCSS and AutoPrefixer.
          postcssOptions.plugins.push(require("tailwindcss"));
          postcssOptions.plugins.push(require("autoprefixer"));
          return postcssOptions;
        },
        configureWebpack(config, isServer) {
          return {
            resolve: {
              alias: {
                '@': require('path').resolve(__dirname, './src'),
              },
            },
          };
        },
      };
    },
    [
      require.resolve("@easyops-cn/docusaurus-search-local"),
      {
        hashed: true,
        language: ["es"],
        indexDocs: true,
        indexBlog: false,
        indexPages: false,
        docsRouteBasePath: "/docs",
        highlightSearchTermsOnTargetPage: true,
        explicitSearchResultPath: true,
        searchBarShortcut: true,
        searchBarShortcutHint: true,
      },
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      colorMode: {
        defaultMode: 'dark',
        disableSwitch: false,
        respectPrefersColorScheme: true,
      },
      navbar: {
        title: "juampamillan.docs",
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'arquitecturaSidebar',
            position: 'right',
            label: 'Arquitectura',
          },
          {
            type: 'docSidebar',
            sidebarId: 'frontendSidebar',
            position: 'right',
            label: 'Frontend',
          },
          {
            type: 'docSidebar',
            sidebarId: 'backendSidebar',
            position: 'right',
            label: 'Backend',
          },
          {
            type: 'docSidebar',
            sidebarId: 'devopsSidebar',
            position: 'right',
            label: 'DevOps',
          },
          {
            type: 'docSidebar',
            sidebarId: 'databaseSidebar',
            position: 'right',
            label: 'Database',
          },
          {
            type: 'docSidebar',
            sidebarId: 'seguridadSidebar',
            position: 'right',
            label: 'Seguridad',
          },
          {
            type: 'docSidebar',
            sidebarId: 'gobernanzaSidebar',
            position: 'right',
            label: 'Gobernanza',
          },
          {
            type: "html",
            position: "right",
            value: '<div class="navbar-divider"></div>',
          },
          {
            href: "https://github.com/juampamillan",
            position: "right",
            className: "header-github-link",
            "aria-label": "GitHub repository",
          },
          {
            href: "https://linkedin.com/in/juampamillan",
            position: "right",
            className: "header-linkedin-link",
            "aria-label": "LinkedIn profile",
          },
        ],
      },
      footer: {
        style: "light", // Use light style to avoid hardcoded dark backgrounds, we control it via CSS Zinc variables
        copyright: `© ${new Date().getFullYear()} Juampa Millan. Construido con Docusaurus, React & Tailwind.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
        additionalLanguages: ['bash', 'json', 'yaml'],
      },
    }),
};

module.exports = config;
