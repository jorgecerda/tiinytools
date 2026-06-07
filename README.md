# tiinytools

![tiinytools](assets/tiinytools.png)

https://tiinytools.netlify.app/

a collection of simple client-side web tools. calculate percentages, count words, split/merge pdfs, and check urls directly in your browser with no server uploads.

## features

- **100% client-side processing**: your data never leaves your browser, ensuring absolute privacy and security.
- **percentage calculator**: instantly calculate percentages, differences, increases, and fractions as you type.
- **pdf split & join**: extract specific pages or merge multiple pdf documents locally using `pdf-lib`.
- **pdf compress & convert**: reduce pdf file size locally in your browser, or convert pdfs to word, powerpoint, excel and png images via cloudconvert api.
- **character counter & text analyzer**: analyze text length, word count, sentence count, and readability in real-time.
- **url http status checker**: check http status codes, redirect destinations, and response headers for multiple urls in bulk.
- **url redirect checker**: track the complete path a url takes, identifying redirect chains, intermediate urls, status codes, and headers.

## design system

built with a focus on modern web aesthetics, featuring:
- sleek glassmorphism ui cards
- fully responsive grid layout
- beautiful dark mode by default (with light mode toggle)
- vanilla html, css, and es6 javascript (no heavy frameworks or build steps required)

## dependencies

this project uses the following dependencies:
- **pdf-lib**: dynamically loaded via unpkg cdn for client-side pdf modification (splitting, joining, and reconstruction)
- **pdf.js**: dynamically loaded via cloudflare cdnjs for client-side pdf rendering and compression
- **cloudconvert api**: integration used by serverless functions to convert pdf files to docx, pptx, xlsx, and png
- **netlify functions**: serverless backend endpoints used for checking url statuses and interacting with the cloudconvert api

## getting started

because the tools are entirely static and client-side, you can run them locally with zero configuration.

to run locally for development:
```bash
npx netlify dev
```
then visit `http://localhost:8888` in your browser.

## structure tree

```
tiinytools/
├── index.html            # main html entry point
├── netlify.toml          # netlify configuration
├── assets/               # static images and icons
│   ├── logo.png          # application logo
│   └── tiinytools.png    # project branding image
├── css/                  # styling files
│   ├── main.css          # global styling
│   └── tools/            # tool-specific stylesheets
│       ├── percentage.css
│       ├── pdf.css
│       ├── text.css
│       ├── pdftools.css
│       ├── bulk-status.css
│       └── redirect-checker.css
├── js/                   # javascript files
│   ├── app.js            # main routing logic
│   └── tools/            # tool-specific script files
│       ├── percentage.js
│       ├── pdf.js
│       ├── text.js
│       ├── pdftools.js
│       ├── bulk-status.js
│       └── redirect-checker.js
└── netlify/              # serverless backend config
    └── functions/        # serverless endpoints
        ├── cc-start.js   # start cloudconvert job
        ├── cc-status.js  # check cloudconvert status
        └── check-url.js  # proxy to fetch headers and redirects
```

## deployment

this project is built to be hosted on any static hosting provider. it is currently configured for continuous deployment via netlify. simply push to the main branch, and the live site updates automatically.
