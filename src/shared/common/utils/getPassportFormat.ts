/**
 * Форматирует номер паспорта в формат XXXX XXXXXX (4 цифры, пробел, 6 цифр)
 * @param input Строка, которую нужно отформатировать
 * @returns Отформатированный номер паспорта или исходное значение, если форматирование невозможно
 */
export const formatPassportNumber = (input: string): string => {
  const digitsOnly = input.replace(/\D/g, '');
  
  if (digitsOnly.length === 0) return input;
  
  let formattedNumber = '';
  
  if (digitsOnly.length >= 4) {
    formattedNumber += digitsOnly.substring(0, 4);
  } else {
    formattedNumber += digitsOnly;
    return formattedNumber;
  }
  
  formattedNumber += ' ';
  
  if (digitsOnly.length > 4) {
    const secondPart = digitsOnly.substring(4);
    formattedNumber += secondPart.substring(0, 6);
  }
  
  return formattedNumber;
}; 