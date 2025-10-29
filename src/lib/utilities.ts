// src/lib/utilities.ts

/**
 * Inserts <wbr> tags into a word to suggest break points.
 *
 * @param word - The long word to break.
 * @param chunkSize - The size of each chunk before inserting <wbr>.
 * @returns The word with <wbr> inserted at appropriate break points.
 */
export function breakWord(word: string, chunkSize = 4): string {
    return word.replace(
        new RegExp(`([a-zA-Z0-9]{${chunkSize}})(?=[a-zA-Z0-9])`, 'g'),
        "$1<wbr>"
    );
}

/**
   * Forces a word to break by inserting <br> tags at specific intervals.
   *
   * @param word - The long word to break.
   * @param chunkSize - The size of each chunk before inserting <br>.
   * @returns The word with <br> tags inserted at specified intervals.
   */
export function forceBreakWord(word: string, chunkSize = 4): string {
    let result = '';
    for (let i = 0; i < word.length; i += chunkSize) {
        result += word.slice(i, i + chunkSize) + (i + chunkSize < word.length ? '<br>' : '');
    }
    return result;
}

export function toU64(str: string): bigint {
    const num = BigInt(str);
    if (num < 0n || num > 2n ** 64n - 1n) {
        throw new Error("Value out of range for u64");
    }
    return num;
}

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export function isNotEmpty(value: any): boolean {
    if (value == null) return false; // covers null and undefined

    if (typeof value === 'string') {
        return value.trim() !== '';
    }

    if (Array.isArray(value)) {
        return value.length > 0;
    }

    if (typeof value === 'object') {
        return Object.keys(value).length > 0;
    }

    // For numbers, booleans, etc., you can define your own criteria
    return true;
}

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export function removeEmptyAndNullProperties<T extends Record<string, any>>(obj: T): Partial<T> {
    return Object.fromEntries(
        Object.entries(obj).filter(([_, value]) => value !== null && value !== "")
    ) as Partial<T>;
}