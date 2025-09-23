import { AllRoutes } from "./routes/AllRoutes";
import { Header, Footer } from "./components";
import "./App.css";

function ThemeToggle() {
  const onClick = () => {
    const el = document.documentElement;
    const isDark = el.classList.toggle("dark");
    localStorage.setItem("theme", isDark ? "dark" : "light");
  };
  return (
    <button className="btn btn-outline-secondary" onClick={onClick}>
      Toggle theme
    </button>
  );
}
function App() {
  return (
    <div>
      <Header />
      <div className="min-h-screen">
        <nav className="navbar navbar-expand-lg border-bottom">
          <div className="container-fluid">
            <a className="navbar-brand" href="#">
              Codebook
            </a>
            <button className="btn btn-primary">Bootstrap Button</button>
          </div>
        </nav>

        <div className="container py-4">
          <div className="card mb-3">
            <div className="card-body">
              <h5 className="card-title">Bootstrap + Tailwind dark mode</h5>
              <p className="card-text">
                Toggle the site theme to see Bootstrap restyle automatically.
              </p>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </div>
      <AllRoutes />
      <Footer />
    </div>
  );
}

export default App;
