import { LogicPlayground } from './components';
import { CartProvider } from './context';
import './App.css';

function App() {
  return (
    <CartProvider>
      <LogicPlayground />
    </CartProvider>
  );
}

export default App;
