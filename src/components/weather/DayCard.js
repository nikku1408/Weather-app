import React, { useEffect, useState } from "react";
import "./daycard.css";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import cityTimezones from "city-timezones";
import NightlightIcon from "@mui/icons-material/Nightlight";
import CircleRoundedIcon from "@mui/icons-material/CircleRounded";

const DayCard = () => {
  const [temp, setTemp] = useState("");
  const [input, setInput] = useState("");
  const [place, setPlace] = useState("");
  const [zone, setZone] = useState("");

  const handleGo = async (event) => {
    event.preventDefault();
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=ea65acd06aec0598db7ba0fdd18f3eed`;
    const response = await fetch(url);
    const jsonResp = await response.json();
    setTemp(jsonResp.main.temp);
    setPlace(input);
    var zone = new Date().toLocaleString("en-US", {
      timeZone: cityTimezones.lookupViaCity(input)[0].timezone.toString(),
      timeStyle: "medium",
      hourCycle: "h24",
    });
    setZone(zone.slice(0, 5));
  };

  const splitedValue = zone.split(":")[0];
  const val1 = Number(splitedValue) >= 19 && Number(splitedValue) <= 24;
  const val2 = Number(splitedValue) >= 1 && Number(splitedValue) <= 6;
  const val = val1 || val2;

  return (
    <>
      <div style={{ width: "20%", marginTop: "30px", marginLeft: "565px" }}>
        <InputGroup className="mb-3">
          <Form.Control
            placeholder="enter city"
            aria-label="Recipient's username"
            aria-describedby="basic-addon2"
            onChange={(e) => {
              setInput(e.target.value);
            }}
          />
          <Button variant="outline-dark" id="button-addon2" onClick={handleGo}>
            Go
          </Button>
        </InputGroup>
      </div>
      <div className={val ? "night" : "container"}>
        <div className="background">
          <div className="Circle1"></div>
          <div className="Circle2"></div>
          <div className="Circle3"></div>
          <div className="content">
            <h1 className="Condition">
              <i className="material-icons sun">
                {val ? <NightlightIcon /> : <WbSunnyIcon />}
                {place.length === 0 ? <CircleRoundedIcon /> : ""}
              </i>
            </h1>
            <h3 className="Temp">
              {place.length !== 0 ? Math.round(Number(temp) - 273) : ""}
              <span id="F">&#8451;</span>
            </h3>
            <h1 className="Time">{zone}</h1>
            <h1 className="Location">
              <i className="material-icons locationIcon">place</i>
              {place}
            </h1>
          </div>
        </div>
      </div>
    </>
  );
};

export default DayCard;
