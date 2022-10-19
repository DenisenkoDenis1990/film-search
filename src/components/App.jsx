import { NavLink, Route, Routes } from 'react-router-dom';
import Homepage from 'pages/Homepage';
import MoviesPage from 'pages/MoviesPage';
import MovieDetailsPage from 'pages/MovieDetailsPage';
import { Cast } from './Cast/Cast';
import { Reviews } from './Reviews/Reviews';
export const App = () => {
  return (
    <div className="Conteiner">
      <nav className="Navigation">
        <NavLink to="/" end className="NavigationLink">
          Home
        </NavLink>
        <NavLink to="/movies" className="NavigationLink">
          Movies
        </NavLink>
      </nav>

      <Routes>
        <Route path="/" element={<Homepage />}></Route>
        <Route path="movies" element={<MoviesPage />}></Route>
        <Route path="movies/:movieId" element={<MovieDetailsPage />}>
          <Route path="cast" element={<Cast />}></Route>
          <Route path="reviews" element={<Reviews />}></Route>
        </Route>
        <Route path="*" element={<Homepage />}></Route>
      </Routes>
    </div>
  );
};
