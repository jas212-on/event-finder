import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EventsPage from "./HomePage";
import EventDetailPage from "./eventDetail";
import AddEventForm from "./createEvent";
import ScrollToTop from "./scrollToTop";


function App() {
  return (
    <Router>
      <ScrollToTop/>
      <Routes>
        <Route path="/" element={<EventsPage />} />
        <Route path="/event/details/:id" element={<EventDetailPage />} />
        <Route path="/create" element={<AddEventForm/>}/>
      </Routes>
    </Router>
  );
}

export default App;