import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import Home from "./pages/Home.jsx";
import SimplePage from "./pages/SimplePage.jsx";
import { pages } from "./data.js";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        {Object.entries(pages).map(([path, page]) => (
          <Route key={path} path={path} element={<SimplePage page={page} />} />
        ))}
      </Route>
    </Routes>
  );
}
