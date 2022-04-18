import { Link } from 'react-router-dom';

const NavBar = (props) => (
    <div ClassName="NavBar">
        <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
        </ul>
      </nav>
    </div>
);

export default NavBar;