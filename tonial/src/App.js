import "./App.css";
import Routing from "./components/Routing";
import { AuthStatusCtxProvider } from "./components/contexts/AuthStatusCtx";
import { LoggedInCtxProvider } from "./components/contexts/LoggedInCtx";
import Store from "./components/LoggedInStack/redux/Store";
import { Provider } from "react-redux";
import { ThemeCtxProvider } from "./components/contexts/ThemeCtx";

function App() {
  return (
    <Provider store={Store}>
      <ThemeCtxProvider>
        <AuthStatusCtxProvider>
          <LoggedInCtxProvider>
            <div className="App">
              <div className="Content">
                <Routing />
              </div>
            </div>
          </LoggedInCtxProvider>
        </AuthStatusCtxProvider>
      </ThemeCtxProvider>
    </Provider>
  );
}

export default App;
