module.exports = {
  stylesheet: [
    'https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/5.5.1/github-markdown.min.css',
  ],
  body_class: 'markdown-body',
  marked_options: {
    headerIds: false,
    smartypants: true,
  },
  pdf_options: {
    format: 'A4',
    margin: '20mm',
    printBackground: true,
  },
  stylesheet_encoding: 'utf-8',
  script: `
    // Load Mermaid
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.min.js';
    document.head.appendChild(script);

    script.onload = function() {
      mermaid.initialize({
        startOnLoad: true,
        theme: 'default',
        securityLevel: 'loose'
      });
    };
  `,
}
