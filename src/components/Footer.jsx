import { Link } from "react-router";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-column">
        <Link to="/" className="footer-logo">
          <img src="/macideas/logo.png" /> MacIdeas
        </Link>
        <div className="footer-copy">
          &copy; {new Date().getFullYear()}{" "}
          <a href="https://mac-web.github.io" target="_blank">
            MacWeb
          </a>
        </div>
        <div className="footer-copy">All rights reserved</div>
        <div className="footer-copy">
          Made with ❤️ by{" "}
          <a href="https://github.com/tonymac129/" target="_blank">
            Tony Macaroni
          </a>
        </div>
      </div>
      <div className="footer-column">
        <h2 className="footer-title">Browse Tabs</h2>
        <Link to="/" className="footer-link">
          Home
        </Link>
        <Link to="/tasks" className="footer-link">
          Tasks
        </Link>
        <Link to="/notes" className="footer-link">
          Notes
        </Link>
      </div>
      <div className="footer-column">
        <h2 className="footer-title">MacIdeas Information</h2>
        <a href="https://mac-web.github.io/macblog/#/apps/macideas" className="footer-link" target="_blank">
          About
        </a>
        <a href="https://mac-web.github.io/macblog/#/apps/macideas/updates" className="footer-link" target="_blank">
          Updates
        </a>
        <a href="https://forms.gle/fpMRFAcJU28VLpwt9" className="footer-link" target="_blank">
          Feedback
        </a>
      </div>
      <div className="footer-column">
        <h2 className="footer-title">MacWeb Apps</h2>
        <a href="https://mac-web.github.io/" className="footer-link" target="_blank">
          MacWeb
        </a>
        <a href="https://mac-web.github.io/macvg/" className="footer-link" target="_blank">
          MacVG
        </a>
        <a href="https://mac-web.github.io/maclearn/" className="footer-link" target="_blank">
          MacLearn
        </a>
        <a href="https://mac-web.github.io/mactools/" className="footer-link" target="_blank">
          MacTools
        </a>
        <a href="https://mac-web.github.io/macblog/" className="footer-link" target="_blank">
          MacBlog
        </a>
      </div>
      <div className="footer-column">
        <h2 className="footer-title">Social</h2>
        <div className="footer-social">
          <a href="mailto:mac.web.company@gmail.com" target="_blank" className="footer-icon" title="Email us">
            <img src="/macideas/icons/email.svg" />
          </a>
          <a href="https://www.youtube.com/@Mac-Web" target="_blank" className="footer-icon" title="YouTube">
            <img src="/macideas/icons/youtube.svg"/>
          </a>
          <a href="https://github.com/Mac-Web/macvg" target="_blank" className="footer-icon" title="Source code">
            <img src="/macideas/icons/github.svg" />
          </a>
          <a href="https://discord.gg/UT7g2S2cBP" target="_blank" className="footer-icon" title="Join our server!">
            <img src="/macideas/icons/discord.svg" />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
