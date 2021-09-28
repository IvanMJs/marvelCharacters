import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./pages/Home";
import ShowCharacter from "./pages/ShowCharacter/Index";
function App() {
  return (
    <>
      <Router>
        <Route exact path="/" component={Home} />
        <Route path="/show" component={ShowCharacter} />
      </Router>
    </>
  );
}

export default App;
