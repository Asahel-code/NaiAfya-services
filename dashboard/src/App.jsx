import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { routes } from "./utils/routes";

function App() {

  return ( 
    <Router>
          <Routes>
          {routes &&
              routes.map((r) => (
                <Route exact key={r.path} path={r.path} element={r.element} />
              ))
            }
          </Routes>
      </Router> 
  )
}

export default App
