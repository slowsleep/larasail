// Status id constants
export const PLANNING = 1;
export const WATCHING = 2;
export const FINISHED = 3;
export const ABANDONED = 4;

/**
 * @type {Object.<number, string>} - text representation of status
 */
export const STATUSES = {
    [PLANNING]: "Планирую",
    [WATCHING]: "В процессе",
    [FINISHED]: "Завершено",
    [ABANDONED]: "Заброшено",
};
