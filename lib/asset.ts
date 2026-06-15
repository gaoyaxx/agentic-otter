/**
 * Prefix a /public asset path with the deployment base path.
 * Next.js does NOT rewrite raw <img src> / CSS url() for basePath, so static
 * assets must be prefixed manually. NEXT_PUBLIC_BASE_PATH is "" locally and
 * "/agentic-otter" in the GitHub Pages build.
 */
export const asset = (path: string): string =>
  `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${path}`;
