import { Routes, Route } from 'react-router-dom';
import { PlansProvider } from './context/PlansContext';
import { TeamProvider } from './context/TeamContext';
import { GalleryProvider } from './context/GalleryContext';
import { Home } from './pages/Home';

function App() {
  return (
    <GalleryProvider>
      <TeamProvider>
        <PlansProvider>
          <Routes>
            <Route path="/" element={<Home />} />              
          </Routes>
        </PlansProvider>
      </TeamProvider>
    </GalleryProvider>
  );
}

export default App;

