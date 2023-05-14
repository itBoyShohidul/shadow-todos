// Dependancies
import { useNavigate } from "react-router-dom";

//Internals

import Footer from "./components/Footer";
import Nav from "./components/Nav";

function App() {
  const navigate = useNavigate();
  return (
    <>
      <Nav />
      <div className="app">
        <h1>Hello, Stay Organized with Tasks</h1>
        <h6>Efficient task management made simple.</h6>
        <br />
        <br />
        <p>
          Welcome to our Todo app, where productivity meets simplicity. Our app
          is designed to help you stay organized and on top of your tasks with
          ease. With intuitive features and a user-friendly interface, managing
          your to-do list has never been easier. Stay focused, prioritize your
          tasks, and track your progress effortlessly. Whether you're a busy
          professional, a student, or a busy parent, our Todo app is here to
          simplify your life. Start achieving your goals, managing your
          projects, and completing your tasks with confidence. Experience the
          power of efficient task management and unlock your productivity
          potential today!
        </p>
        <br />
        <p>
          Feel free to customize this paragraph to align with the unique
          features and benefits of your Todo app.
        </p>
        <br />
        <p>
          Introducing our innovative Todo app, designed to revolutionize the way
          you organize your life. With our app, you can seamlessly manage your
          tasks, projects, and deadlines all in one place. Say goodbye to
          scattered sticky notes and overwhelming to-do lists. Our powerful
          features empower you to effortlessly plan, prioritize, and accomplish
          your goals. Stay motivated with reminders and notifications,
          collaborate with others on shared tasks, and track your progress with
          insightful analytics. Take control of your time, increase your
          productivity, and experience the satisfaction of a well-managed
          schedule. Embrace the future of task management and unlock your true
          potential with our feature-rich Todo app.
        </p>
        <button
          className="btn-primary"
          onClick={() => {
            navigate("/signup");
          }}
        >
          Start Journey
        </button>
      </div>
      <Footer />
    </>
  );
}

export default App;
