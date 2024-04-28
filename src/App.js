import './App.css';

import { Provider } from "react-redux";
import store from "./Redux/store/store";
import '@elastic/eui/dist/eui_theme_light.css';

import { EuiProvider, EuiText } from '@elastic/eui';

import Table from './Components/crud';

const App = () => {
  return (
    <EuiProvider colorMode="light">
      <Provider store={store}>
        <Table/>
      </Provider>
    </EuiProvider>
  );
}

export default App;

