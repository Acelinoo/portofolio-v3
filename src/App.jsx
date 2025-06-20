// App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./assets/pages/index"; // pastikan index.js atau index.jsx export Home

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
};

export default App;
