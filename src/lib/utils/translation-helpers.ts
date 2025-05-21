import { getTranslations } from "next-intl/server";

/**
 * Helper to get a complete object from translations
 *
 * @param namespace The translation namespace
 * @param basePath Base path for the object
 * @param properties Object properties to extract
 * @returns Object with the specified properties
 */
export async function getTranslatedObject<T>(
  namespace: string,
  basePath: string,
  properties: string[]
): Promise<T> {
  const t = await getTranslations(namespace);

  const obj: Record<string, unknown> = {};

  properties.forEach((prop) => {
    const fullPath = `${basePath}.${prop}`;
    obj[prop] = t(fullPath);
  });

  return obj as T;
}
