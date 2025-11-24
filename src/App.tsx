import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { PlansProvider } from './context/PlansContext';
import { TeamProvider } from './context/TeamContext';
import { GalleryProvider } from './context/GalleryContext';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';

function App() {
  return (
    <GalleryProvider>
      <TeamProvider>
        <PlansProvider>
          <BrowserRouter basename="/new">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/admin" element={<Dashboard />} />
            </Routes>
          </BrowserRouter>
        </PlansProvider>
      </TeamProvider>
    </GalleryProvider>
  );
}

export default App;
