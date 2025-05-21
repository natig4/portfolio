import { getTranslations } from "next-intl/server";

/**
 * Helper function to safely access indexed arrays from translations
 * without using .map() which can cause type issues with next-intl
 *
 * @param namespace The translation namespace
 * @param basePath Base path for the array
 * @param indices Array of indices to access
 * @param property Property to extract at each index
 * @returns Array of values
 */
export async function getTranslatedArray<T>(
  namespace: string,
  basePath: string,
  indices: number[],
  property: string
): Promise<T[]> {
  const t = await getTranslations(namespace);

  return indices.map((index) => {
    const fullPath = `${basePath}.${index}.${property}`;
    return t(fullPath) as unknown as T;
  });
}

/**
 * Helper function to safely access nested translated arrays
 *
 * @param namespace The translation namespace
 * @param basePath Base path for the parent array
 * @param parentIndex Index in the parent array
 * @param childPath Path to the child array
 * @param childIndices Array of indices to access in child array
 * @returns Array of values
 */
export async function getNestedTranslatedArray<T>(
  namespace: string,
  basePath: string,
  parentIndex: number,
  childPath: string,
  childIndices: number[]
): Promise<T[]> {
  const t = await getTranslations(namespace);

  return childIndices.map((childIndex) => {
    const fullPath = `${basePath}.${parentIndex}.${childPath}.${childIndex}`;
    return t(fullPath) as unknown as T;
  });
}

/**
 * Helper to get a complete array of objects from translations
 *
 * @param namespace The translation namespace
 * @param basePath Base path for the array
 * @param count Number of items to fetch
 * @param properties Object properties to extract
 * @returns Array of objects with the specified properties
 */
export async function getTranslatedObjectArray<T>(
  namespace: string,
  basePath: string,
  count: number,
  properties: string[]
): Promise<T[]> {
  const t = await getTranslations(namespace);
  const indices = Array.from({ length: count }, (_, i) => i);

  return indices.map((index) => {
    const obj: Record<string, unknown> = {};

    properties.forEach((prop) => {
      const fullPath = `${basePath}.${index}.${prop}`;
      obj[prop] = t(fullPath);
    });

    return obj as T;
  });
}

/**
 * Helper to get nested translated arrays when parent keys are strings, not indices.
 *
 * @param namespace The translation namespace
 * @param basePath Base path for the parent object
 * @param parentKey String key in the parent object
 * @param childPath Path to the child array
 * @param childIndices Array of indices to access in child array
 * @returns Array of values
 */
export async function getNestedTranslatedArrayByKey<T>(
  namespace: string,
  basePath: string,
  parentKey: string,
  childPath: string,
  childIndices: number[]
): Promise<T[]> {
  const t = await getTranslations(namespace);

  return childIndices.map((childIndex) => {
    const fullPath = `${basePath}.${parentKey}.${childPath}.${childIndex}`;
    return t(fullPath) as unknown as T;
  });
}

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

/**
 * Helper to get translations with dynamic parameters
 *
 * @param namespace The translation namespace
 * @param key Translation key
 * @param params Parameters to interpolate
 * @returns Translated string with parameters
 */
export async function getTranslatedString(
  namespace: string,
  key: string,
  params?: Record<string, string | number>
): Promise<string> {
  const t = await getTranslations(namespace);
  return t(key, params || {}) as string;
}
