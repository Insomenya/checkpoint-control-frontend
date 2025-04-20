# Система темизации

V-UIK предоставляет гибкую систему темизации, которая позволяет настраивать внешний вид всех компонентов с помощью токенов.

## Токены дизайн-системы

Токены - это переменные, определяющие визуальный язык вашего приложения:

- **Цвета**: основные, второстепенные, акцентные, сигнальные
- **Типографика**: шрифты, размеры, веса
- **Размеры**: отступы, радиусы скругления, высоты
- **Анимации**: длительность, функции плавности

## Уровни токенов

В V-UIK используется многоуровневая система токенов:

1. **Базовые токены** (`color`, `colourway`) - содержат фундаментальные значения (устаревшие, будут удалены)
2. **Системные токены** (`sys`) - определяют общую систему и темизацию всего приложения
3. **Компонентные токены** (`comp`) - определяют внешний вид конкретных компонентов

## Создание пользовательской темы

```jsx
import { ThemeProvider, createTheme } from '@v-uik/theme';

const customTheme = createTheme({
  tokens: {
    // Системные токены
    sys: {
      color: {
        primary: '#0077FF',
        secondary: '#6C757D',
        success: '#28A745',
        error: '#DC3545',
        warning: '#FFC107',
        info: '#17A2B8',
      },
      typography: {
        fontFamily: 'Roboto, sans-serif',
        fontSize: '16px',
        lineHeight: 1.5,
      },
    },
    
    // Компонентные токены
    comp: {
      button: {
        primaryBg: '{sys.color.primary}',
        primaryText: '#FFFFFF',
        borderRadius: '4px',
        padding: '8px 16px',
      },
      input: {
        borderColor: '#CCCCCC',
        focusBorderColor: '{sys.color.primary}',
        borderRadius: '4px',
      }
    }
  }
});

function App() {
  return (
    <ThemeProvider theme={customTheme}>
      {/* Ваше приложение */}
    </ThemeProvider>
  );
}
```

## Темные и светлые темы

Вы можете определить несколько вариантов тем и переключаться между ними:

```jsx
import { ThemeProvider, createTheme } from '@v-uik/theme';
import { useState } from 'react';

const lightTheme = createTheme({
  tokens: {
    sys: {
      color: {
        background: '#FFFFFF',
        text: '#333333',
      }
    }
  }
});

const darkTheme = createTheme({
  tokens: {
    sys: {
      color: {
        background: '#222222',
        text: '#F5F5F5',
      }
    }
  }
});

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const currentTheme = isDarkMode ? darkTheme : lightTheme;
  
  return (
    <ThemeProvider theme={currentTheme}>
      <button onClick={() => setIsDarkMode(!isDarkMode)}>
        Переключить тему
      </button>
      {/* Ваше приложение */}
    </ThemeProvider>
  );
}
```

## Локальная переопределение темы

Вы можете переопределить тему для отдельного участка приложения:

```jsx
import { ThemeProvider, useTheme } from '@v-uik/theme';

function LocalThemeSection() {
  const parentTheme = useTheme();
  
  // Создаем локальную тему на основе родительской
  const localTheme = {
    ...parentTheme,
    tokens: {
      ...parentTheme.tokens,
      comp: {
        ...parentTheme.tokens.comp,
        button: {
          ...parentTheme.tokens.comp.button,
          primaryBg: '#FF0000', // Переопределяем цвет кнопок
        }
      }
    }
  };
  
  return (
    <ThemeProvider theme={localTheme}>
      {/* Компоненты с локальной темой */}
    </ThemeProvider>
  );
}
``` 