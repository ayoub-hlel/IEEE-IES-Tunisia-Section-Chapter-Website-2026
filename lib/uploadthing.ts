/**
 * IEEE IES Tunisia — UploadThing Configuration
 * ==============================================
 * Centralized UploadThing setup for photo management.
 *
 * Setup:
 *   1. Go to https://uploadthing.com/dashboard
 *   2. Create a new app (or use existing)
 *   3. Copy your UPLOADTHING_TOKEN
 *   4. Add it to your environment:
 *      - Development: create `.env.local` with UPLOADTHING_TOKEN=xxx
 *      - Build/CI: set UPLOADTHING_TOKEN in your CI environment
 *
 * Free tier: 10GB storage, 5GB bandwidth/month — plenty for a chapter site.
 */

import { UTApi } from "uploadthing/server";

/**
 * Get a configured UTApi instance.
 * Requires UPLOADTHING_TOKEN environment variable.
 */
export function getUTApi(): UTApi {
  const token = process.env.UPLOADTHING_TOKEN;
  if (!token) {
    throw new Error(
      "UPLOADTHING_TOKEN is required. Get it from https://uploadthing.com/dashboard"
    );
  }
  return new UTApi({ token });
}

/**
 * Upload a single file from a local path or buffer.
 * Returns the public URL.
 */
export async function uploadFile(
  file: { name: string; buffer: Buffer },
  customId?: string
): Promise<string> {
  const utapi = getUTApi();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const result = await (utapi as any).uploadFiles(file, {
    ...(customId ? { customId } : {}),
  });

  if (!result.data) {
    throw new Error(`UploadThing upload failed: ${result.error}`);
  }

  return result.data.ufsUrl ?? result.data.url;
}

/**
 * Upload multiple files. Returns array of URLs.
 */
export async function uploadFiles(
  files: { name: string; buffer: Buffer }[]
): Promise<string[]> {
  const utapi = getUTApi();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const results = await (utapi as any).uploadFiles(files);

  return results.map((r: any) => {
    if (!r.data) {
      throw new Error(`UploadThing upload failed: ${r.error}`);
    }
    return r.data.ufsUrl ?? r.data.url;
  });
}

/**
 * Delete files by their UploadThing key or URL.
 */
export async function deleteFiles(keys: string[]): Promise<void> {
  const utapi = getUTApi();
  await utapi.deleteFiles(keys);
}

/**
 * List all uploaded files.
 */
export async function listFiles() {
  const utapi = getUTApi();
  return utapi.listFiles();
}

/**
 * Get the UploadThing URL for a given file key.
 */
export function getFileUrl(key: string): string {
  return `https://utfs.io/f/${key}`;
}
