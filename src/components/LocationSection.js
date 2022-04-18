// import { Link } from 'react-router-dom';

const LocationSection = (props) => (
    <div className="search">
        <h1>Weather Wise</h1>
        <p>Please select your city</p>
        <form onSubmit={props.handleSubmit}>
            <input value={props.city} onChange={props.handleChange}placeholder="Location" />
            <button onClick={props.handleClick}>Click</button>
        </form>
        {props.showCity ? (
        <p>City you wrote is: {props.city}</p>
      ) : (
        <p>Write a city and click the button</p>
      )}
    </div>
);

export default LocationSection;