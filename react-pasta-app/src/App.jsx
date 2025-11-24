import './App.css'
import HomePage from "./components/HomePage.jsx";
import Footer from "./components/Footer.jsx";

function App() {

  return (
      <div className="app-layout">

          <div className="main-content">
              <HomePage/>
          </div>

          <Footer />
      </div>
  );
}

export default App
