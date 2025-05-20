import { getTranslations } from "next-intl/server";

/**
 * Helper function to safely access indexed arrays from translations
 * without using .map() which can cause type issues with next-intl
 *
 * @param t Translation function from getTranslations
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
 * @param t Translation function
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
