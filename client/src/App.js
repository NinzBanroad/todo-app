import { BrowserRouter as Router, Route } from 'react-router-dom'
import Navbar from './components/navbar'
import "bootstrap/dist/css/bootstrap.min.css"
import Home from './containers/Home'
import AddTodo from './containers/AddTodo'

function App() {
  return (
    <Router>
    <Navbar />
    <div className="container">
      <Route path="/" exact component={Home} />
      <Route path="/add-todo" exact component={AddTodo} />
    </div>
    </Router>
  );
}

export default App;
