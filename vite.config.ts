// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, nitro (build-only using cloudflare as a default target),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

const githubRepository = process.env.GITHUB_REPOSITORY?.split("/")[1];
const isGitHubPagesBuild = process.env.GITHUB_ACTIONS === "true" && !!githubRepository;

// Prerender to static HTML only during the GitHub Pages build. In the Lovable
// sandbox, nitro is force-enabled and emits `dist/server/index.mjs`, which is
// incompatible with TanStack's preview-server plugin (it expects `server.js`)
// and breaks prerender. Skipping prerender in sandbox keeps preview working.
const enablePrerender = isGitHubPagesBuild;

export default defineConfig({
  tanstackStart: {
    prerender: enablePrerender
      ? { enabled: true, autoStaticPathsDiscovery: false, failOnError: true }
      : undefined,
    pages: enablePrerender ? [{ path: "/", prerender: { crawlLinks: false } }] : undefined,
    router: isGitHubPagesBuild && githubRepository ? { basepath: githubRepository } : {},
  },
  vite: {
    base: isGitHubPagesBuild && githubRepository ? `/${githubRepository}/` : "/",
  },
});
