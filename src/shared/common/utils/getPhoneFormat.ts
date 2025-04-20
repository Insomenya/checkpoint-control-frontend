/**
 * Форматирует телефонный номер в формат +7(XXX)XXX-XX-XX
 * @param input Строка, которую нужно отформатировать
 * @returns Отформатированный телефонный номер или исходное значение, если форматирование невозможно
 */
export const formatPhoneNumber = (input: string): string => {
  const digitsOnly = input.replace(/\D/g, '');
  
  if (digitsOnly.length === 0) return input;
  
  let formattedNumber = '';
  if (digitsOnly.startsWith('7') || digitsOnly.startsWith('8')) {
    formattedNumber = '+7';
    if (digitsOnly.length > 1) {
      if (digitsOnly.length >= 4) {
        formattedNumber += `(${digitsOnly.substring(1, 4)}`;
      } else {
        formattedNumber += `(${digitsOnly.substring(1)}`;
      }
      
      if (digitsOnly.length >= 7) {
        formattedNumber += `)${digitsOnly.substring(4, 7)}`;
      } else if (digitsOnly.length > 4) {
        formattedNumber += `)${digitsOnly.substring(4)}`;
      } else {
        formattedNumber += ')';
      }
      
      if (digitsOnly.length >= 9) {
        formattedNumber += `-${digitsOnly.substring(7, 9)}`;
      } else if (digitsOnly.length > 7) {
        formattedNumber += `-${digitsOnly.substring(7)}`;
      }
      
      if (digitsOnly.length >= 11) {
        formattedNumber += `-${digitsOnly.substring(9, 11)}`;
      } else if (digitsOnly.length > 9) {
        formattedNumber += `-${digitsOnly.substring(9)}`;
      }
    }
  } else {
    formattedNumber = '+7';
    if (digitsOnly.length >= 3) {
      formattedNumber += `(${digitsOnly.substring(0, 3)}`;
    } else {
      formattedNumber += `(${digitsOnly}`;
    }
    
    if (digitsOnly.length >= 6) {
      formattedNumber += `)${digitsOnly.substring(3, 6)}`;
    } else if (digitsOnly.length > 3) {
      formattedNumber += `)${digitsOnly.substring(3)}`;
    } else {
      formattedNumber += ')';
    }
    
    if (digitsOnly.length >= 8) {
      formattedNumber += `-${digitsOnly.substring(6, 8)}`;
    } else if (digitsOnly.length > 6) {
      formattedNumber += `-${digitsOnly.substring(6)}`;
    }
    
    if (digitsOnly.length >= 10) {
      formattedNumber += `-${digitsOnly.substring(8, 10)}`;
    } else if (digitsOnly.length > 8) {
      formattedNumber += `-${digitsOnly.substring(8)}`;
    }
  }
  
  return formattedNumber;
}; 