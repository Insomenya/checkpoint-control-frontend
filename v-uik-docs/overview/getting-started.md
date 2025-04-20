# Начало работы

## Установка

Установите основной пакет и необходимые компоненты:

```bash
# Основной пакет
yarn add @v-uik/theme

# Отдельные компоненты, например:
yarn add @v-uik/button @v-uik/input @v-uik/select
```

## Базовая настройка

### 1. Настройка ThemeProvider

Оберните ваше приложение компонентом `ThemeProvider`:

```jsx
import { ThemeProvider } from '@v-uik/theme';

function App() {
  return (
    <ThemeProvider>
      {/* Ваше приложение */}
    </ThemeProvider>
  );
}
```

### 2. Использование компонентов

Импортируйте и используйте компоненты в вашем приложении:

```jsx
import { Button } from '@v-uik/button';
import { Input } from '@v-uik/input';

function MyForm() {
  return (
    <form>
      <Input label="Имя пользователя" placeholder="Введите имя" />
      <Button>Отправить</Button>
    </form>
  );
}
```

### 3. Настройка пользовательской темы

Вы можете переопределить стандартную тему:

```jsx
import { ThemeProvider, createTheme } from '@v-uik/theme';

// Создаем пользовательскую тему
const customTheme = createTheme({
  tokens: {
    // Токены цветов
    colorPrimary: '#0077FF',
    colorSecondary: '#6C757D',
    
    // Токены размеров
    space1: '4px',
    space2: '8px',
    space3: '16px',
    
    // Токены типографики
    fontFamilyBase: 'Roboto, sans-serif',
    fontSizeBase: '16px',
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

## Следующие шаги

- Изучите [Темизацию](./theming.md) для более глубокой настройки внешнего вида
- Ознакомьтесь с [Компонентами](../components/) для детального изучения API каждого компонента 