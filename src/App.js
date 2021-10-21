import './App.css';
import Cart from './components/Cart';
import Products from './components/Products';

function App(props) {
  return (
    <div className="App">
      <h1>Shopping Example</h1>
      <Products />
      <Cart />
    </div>
  );
}

export default App;
