import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <h1>About</h1>
      <div className="about-content">
        <p className="about-content__p"> This project was developed as a final assignment for the Programming 4 course at Artevelde University of Applied Sciences. It is a task management application that allows you to organize projects. The frontend is built with React and TanStack Router, while the backend uses Strapi. The goal of this project is to provide a clear and modern interface for managing tasks per project, with features such as filtering,  searching, pagination, and adding new tasks.
        </p>
        <address>
          <p>
            <strong>Author:</strong> Mauro Ongena<br />
            <strong>Email:</strong> <a href="mailto:mauronge@student.arteveldehs.be">mauronge@student.arteveldehs.be</a><br />
            <strong>LinkedIn:</strong>
            <a href="https://www.linkedin.com/in/mauro-ongena-524786358/"> Mauro Ongena</a>
          </p>
        </address>
      </div>
    </>
  );
}
