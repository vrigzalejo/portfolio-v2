export const toSlug = (
    text: string, 
    replacement: string = '_', 
    pattern: RegExp = /[^a-zA-Z0-9]/g
): string => {
    return text.replace(pattern, replacement).toLowerCase();
};
