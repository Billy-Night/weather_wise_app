const LocationSection = (props) => (
    
    <div className="search">
        <h1>Weather Wise</h1>
        <p>Please select your city</p>
        <form onSubmit={props.handleSubmit}>
            <input value={props.city} onChange={props.handleChange}placeholder="Location" />
            <button onClick={props.handleClick}>Click</button>
        </form>
    </div>
);

export default LocationSection;