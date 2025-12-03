import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { PlansProvider } from './context/PlansContext';
import { TeamProvider } from './context/TeamContext';
import { GalleryProvider } from './context/GalleryContext';
import { Home } from './pages/Home';

function App() {
  return (
    <GalleryProvider>
      <TeamProvider>
        <PlansProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />              
            </Routes>
          </BrowserRouter>
        </PlansProvider>
      </TeamProvider>
    </GalleryProvider>
  );
}

export default App;

