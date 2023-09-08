![alt text](https://cms.econcrimelab.com/uploads/Econ_Crime_Logo_Normal_79f0957e6d.jpg?updated_at=2023-01-31T21:52:24.844Z)

## Description

This repo contains the website of [SIPLAB](https://siplab.ca), a research hub based at University of Montreal.

## Technologies

The site is a [Next.js](https://nextjs.org/) project deployed on [Vercel](https://vercel.com/). Data is sourced from [Strapi](https://strapi.io/) and styling is done with [Tailwind CSS](https://tailwindcss.com). It is a bilingual site, using <code>next-i18next</code> to handle localizations and translations. It features both <code>dark</code> and <code>light</code> mode.

## Installation

1. Use the git CLI to close the repo

```
gh repo clone brunosj/siplab
```

2. Install dependencies

```bash
npm install
# or
yarn install
```

3. Navigate into the site's directory and start the development server

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Structure

```
.
├── node_modules
├── public
    ├── locales
└── src
    ├── components
    ├── lib
    ├── pages
    ├── styles
    ├── utils
├── .env
├── .eslintrc.json
├── .gitignore
├── jsconfig.js
├── next-i18next.config.js
├── next-sitemap.config.json
├── next-config.js
├── package-lock.json
├── package.json
├── postcss.config.js
├── README.md
└── tailwind.config.js
```

## Further development

This repository is maintained by [brunosj](https://github.com/brunosj).
