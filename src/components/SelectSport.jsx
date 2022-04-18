const SelectSport = (props) => (
    <div ClassName="select-sport">
        <h1>Choose your sport</h1>
        <button onClick={props.handleClickCycle}>Cycling</button>
        <br></br>
        <button>Surfing</button>
        <br></br>
        <button>Sailing</button>
        <br></br>
        <button>Hiking</button>
        <br></br>
        <button>Running</button>
        <br></br>
        <button>Snowboarding</button>
    </div>
);

export default SelectSport;