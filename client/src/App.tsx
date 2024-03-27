import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AddPlant from './pages/AddPlant';
import SoilMateForm from './components/SoilMateForm';

function App() {
  return (
    <div className="flex w-screen justify-center">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SoilMateForm/>} />
          <Route path="/add" element={<AddPlant />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
