import { Link } from '@tanstack/react-router';

function HomePage() {
  return (
    <div>
      <h1 className="header__title">Welkom</h1>
      <Link to="/backlog">Go to backlog</Link>
    </div>
  );
}

export default HomePage;
