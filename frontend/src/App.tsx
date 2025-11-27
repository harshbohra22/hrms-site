import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import RegisterJobSeeker from './pages/RegisterJobSeeker';
import RegisterEmployer from './pages/RegisterEmployer';
import PostJob from './pages/PostJob';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="register/seeker" element={<RegisterJobSeeker />} />
          <Route path="register/employer" element={<RegisterEmployer />} />
          <Route path="post-job" element={<PostJob />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
