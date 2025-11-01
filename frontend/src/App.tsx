import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EventsPage from "./pages/HomePage";
import EventDetailPage from "./pages/eventDetail";
import AddEventForm from "./pages/createEvent";
import ScrollToTop from "./utils/scrollToTop";
import { Toaster } from 'react-hot-toast';


function App() {
  return (
    <Router>
      <ScrollToTop/>
      <Routes>
        <Route path="/" element={<EventsPage />} />
        <Route path="/event/details/:id" element={<EventDetailPage />} />
        <Route path="/create" element={<AddEventForm/>}/>
      </Routes>
      <Toaster/>
    </Router>
  );
}

export default App;