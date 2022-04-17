const NavBar = (props) => (
    <div ClassName="NavBar">
        <nav>
        <ul>
          <li>
            {<props.Link to="/LocationSection">Home</props.Link>}
            
          </li>
          <li>
            {<props.Link to="/About">About</props.Link>}
          </li>
        </ul>
      </nav>
    </div>
);

export default NavBar;