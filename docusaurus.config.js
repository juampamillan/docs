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
  favicon: "img/favicon.ico",

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
            type: 'doc',
            docId: 'intro',
            position: 'right',
            label: 'Tutorial',
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
        links: [
          {
            title: "Resources",
            items: [
              {
                label: "Introduction",
                to: "/docs/intro",
              },
              {
                label: "Guides",
                to: "/docs/intro", // Pointing to intro for now as generic docs link
              },
            ],
          },
          {
            title: "Network",
            items: [
              {
                label: "Main Site",
                href: "https://juampamillan.com",
              },
              {
                label: "GitHub",
                href: "https://github.com/juampamillan",
              },
            ],
          },
        ],
        copyright: `© ${new Date().getFullYear()} JuampaMillan. Construido con Docusaurus.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
        additionalLanguages: ['bash', 'json', 'yaml'],
      },
    }),
};

module.exports = config;
