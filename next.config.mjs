// Pin the project root so Next ignores the package-lock.json in the home folder.
// The site builds to static files in out/. On GitHub Pages it is served from /openable, so the
// publish workflow sets GITHUB_PAGES=true; local dev stays at the root.
export default {
  turbopack: { root: import.meta.dirname },
  output: 'export',
  trailingSlash: true,
  ...(process.env.GITHUB_PAGES === 'true' && { basePath: '/openable' }),
};
