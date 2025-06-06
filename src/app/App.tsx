import { store } from "@store/store";
import { DateLibAdapterProvider, NotificationContainer, ThemeProvider } from "@v-uik/base";
import { DateFnsAdapter } from '@v-uik/date-picker/dist/adapters/esm/date-fns';
import { ru } from "date-fns/locale";
import { ErrorBoundary } from "react-error-boundary";
import { Provider } from "react-redux";
import { Router } from "./Router/Router";
import { theme } from "@/styles/theme";
import '@/styles/index.css';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <ErrorBoundary fallback={<div>Карамба, всё упало!</div>}>
        <Provider store={store}>
          <DateLibAdapterProvider dateAdapter={DateFnsAdapter} options={{ locale: ru }}>
            <Router />
            <NotificationContainer
              nextNotification
            />
          </DateLibAdapterProvider>
        </Provider>
      </ErrorBoundary>
    </ThemeProvider>
  );
};

export default App;