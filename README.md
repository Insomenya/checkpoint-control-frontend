# checkpoint-control-frontend

Фронтенд для системы контроля прохождения ТМЦ и транспорта через КПП. Проект разработан в рамках дипломной работы.

## Описание

Система предназначена для операторов КПП, которые регистрируют въезд/выезд транспорта и перемещение ТМЦ, проверяют накладные и управляют экспедициями. Основные функции:

- Регистрация экспедиций (въезд/выезд).
- Управление накладными и ТМЦ (товарно-материальными ценностями).
- Поддержка нескольких ролей пользователей (администратор АРМ, оператор КПП).
- Генерация отчетов в PDF и Excel.

## Технологии

- **Frontend**: 
  - React
  - TypeScript
  - Vite
  - Redux Toolkit
  - RTK Query
  - react-hook-form
  - Zod (валидация)
  - v-uik (V UI kit - библиотека типовых UI-компонентов)
- **Backend-заглушка (development env)**: 
  - Mirage.js (для симуляции API)
 
## Структура проекта

Проект организован в соответствии с методологией **FSD (Feature-Sliced Design)** и её вариантом **ФАСАД**, а также включает элементы **Atomic Design**.

### **Atomic Design**
- **Atoms**: Минимальные UI-компоненты (например, кнопки, инпуты).
- **Molecules**: Комбинации атомов (например, форма поиска).
- **Organisms**: Более сложные компоненты (например, шапка страницы).
- **Pages**: Страницы и экранные формы.

## Установка и запуск

1. Клонируйте репозиторий:
   ```bash
   git clone https://github.com/insomenya/checkpoint-control-frontend.git
   cd checkpoint-control-frontend
2. Установите зависимости:
   ```node
   npm install
3. Запустите проект:
   ```node
   npm run dev
4. Откройте браузер и перейдите по адресу:
   ```
   http://localhost:3000
