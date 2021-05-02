import { BrowserRouter as Router ,Route, Switch } from "react-router-dom";
import { StockProvider } from './components/ContextProvider/StockContext';
import Compare from './components/StockComparison/Compare';
import Stock from './components/StockTracker/Stock';
import NoMatchPage from './components/ErrorPages/NoMatchPage';
import './App.css';

const App = () => {
  return (
    <StockProvider>
        <Router>
          <div className="App">
            <Switch>
              <Route exact from="/" component={Stock} />
              <Route exact from="/compare" component={Compare} />
              <Route component={NoMatchPage} />
            </Switch>
          </div>
        </Router>
    </StockProvider>
  );
}

export default App;
