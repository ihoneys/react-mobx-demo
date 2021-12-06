import './App.css';
import Cart from './components/Cart';
import Demo from './components/Demo';
import Products from './components/Products';

function App(props) {
  return (
    <div className="App">
      <h1>Shopping Example</h1>
      <Products />
      <Cart />
      <Demo />
    </div>
  );
}

export default App;
