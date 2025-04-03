/**
 * Функция, получает инициалы из имени пользователя для отображения 
 * их на аватаре с градиентом.
 * 
 * @param username Имя пользователя для извлечения инициалов
 * @returns Инициалы логина для отображения на аватаре
 */

export const getNameInitials = (username: string | undefined) => {
    if (username?.length && username?.length > 0) {
        return username?.split(' ').reduce((str, word) => str + word[0].toLocaleUpperCase(), '').slice(0, 2);
    }
    
    return '';
};
