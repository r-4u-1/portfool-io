import { Navigation } from "./components/Navigation/Navigation";
import { TimeLine } from "./components/TimeLine/TimeLine";
import Mountain from "./components/Mountain/Mountain";
import Portfolio from "./components/Portfolio/Portfolio";
import './App.css'

const App: React.FC = () => {
  return (
    <div id="home">
      <Navigation />
      {/*<Spline
        scene="https://prod.spline.design/rOQGsMaKWtxiCRjc/scene.splinecode"
        className="spline"
      />*/}
      <Mountain />
      <main>
        {/* About section */}
        <section id="about" className="about">
          <img src="img/plio.webp" alt="About" />
          <h2>About</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec
            odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla
            quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent
            mauris. Fusce nec tellus sed augue semper porta. Mauris massa.
            Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad
            litora torquent per conubia nostra, per inceptos himenaeos.
            Curabitur sodales ligula in libero. Sed dignissim lacinia nunc.
          </p>
        </section>
        {/* Timeline section */}
        <TimeLine />
        <Portfolio />
      </main>
    </div>
  );
};

export default App;
