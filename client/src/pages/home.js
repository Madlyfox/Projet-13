import "../sass/home.scss";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import chat from "../img/icon-chat.png";
import money from "../img/icon-money.png";
import security from "../img/icon-security.png";

export function Home() {
  return (
    <div className="appContainer">
      <Navbar />
      <header>
        <div className="context">
          <h1>No fees.</h1>
          <h1>No minimum deposit.</h1>
          <h1>High interest rates</h1>
          <p>Open a saving account with Argent bank today!</p>
        </div>
      </header>
      <main>
        <div className="content">
          <div className="card">
            {" "}
            <img className="icon" src={chat} alt="chat ison" />
            <h1>You are our #1 priority</h1>
            <div className="text">
              <p>
                Need to talk to a representative? You can get in touch through
                our 24/7 chat or through a phone call in less than 5 minutes.
              </p>
            </div>
          </div>
          <div className="card">
            <img className="icon" src={money} alt="money icon" />

            <h1>More savings means higher rates</h1>
            <div className="text">
              <p>
                The more you save with us, the higher your interest rate will
                be!
              </p>
            </div>
          </div>
          <div className="card">
            <img className="icon" src={security} alt="secutiry icon" />

            <h1>Security you can trust</h1>
            <div className="text">
              <p>
                We use top of the line encryption to make sure your data and
                money is always safe.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Home;
