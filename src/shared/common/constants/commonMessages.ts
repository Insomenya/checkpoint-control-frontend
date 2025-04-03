export const MESSAGES = {
    ADDED: 'Успешно добавлено.',
    UPDATED: 'Успешно изменено.',
    DELETED: 'Успешно удалено.',
    NO_DATA: 'Нет данных для составления отчета.'
};

export type Messages = Record<keyof typeof MESSAGES, string>;
