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
      <ThemeToggle />
      <Header />

      <AllRoutes />
      <Footer />
    </div>
  );
}

export default App;
