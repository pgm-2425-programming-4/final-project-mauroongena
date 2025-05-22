import { useNavigate } from "@tanstack/react-router";

function HomePage() {
  const navigate = useNavigate();

  return (
    <div>
      <h1 className="header__title">Welkom</h1>
      <button
        className="button is-link"
        onClick={() => navigate({ to: "/backlog" })}
      >
        Ga naar Backlog
      </button>
    </div>
  );
}

export default HomePage;
