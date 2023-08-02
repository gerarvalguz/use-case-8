import './App.css';
import FormComponent from './components/FormComponent'
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from './store/reducers';
const store = createStore(rootReducer);

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Provider store={store}>
          <FormComponent />
        </Provider>
      </header>
    </div>
  );
}

export default App;
