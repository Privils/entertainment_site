import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import Movies from './components/Movies';
import TvShows from './components/TvShows';
import Anime from './components/Anime';


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Header />}>
      <Route index element={<Home />} />
      <Route path='movies' element={<Movies />} />
      <Route path='TvShows' element={<TvShows />} />
      <Route path='Anime' element={<Anime />} />
    </Route>
  )
)
function App() {
  return (
 <>
 <RouterProvider router={router} />
 </>
  );
}

export default App;
