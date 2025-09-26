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
  console.table({
    endpoint: import.meta.env.VITE_APPWRITE_ENDPOINT,
    project: import.meta.env.VITE_APPWRITE_PROJECT_ID,
    db: import.meta.env.VITE_APPWRITE_DATABASE_ID,
    table: import.meta.env.VITE_APPWRITE_PRODUCTS_TABLE_ID,
  });

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
