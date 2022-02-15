import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchSystems, chooseSystem } from "./SystemsSlice";
import proxima_centauri from "../../Images/proxima_centauri.jpeg";
import tau_ceti from "../../Images/tau_ceti.jpeg";
import upsilon_andromedae from "../../Images/upsilon_andromedae.jpeg";
import { store } from "../../app/store";

function MissionSelect() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const storeState = useSelector((state) => state); /* redux state*/

  function getSystems(e) {
    e.preventDefault();
    dispatch(fetchSystems());
  }

  const eachSystem = [];

  if (storeState.systems.entities.length) {
    storeState.systems.entities.forEach(system => {
      eachSystem.push(system)
    })
  }

  function selectSystem(e, system) {
    e.preventDefault();
    dispatch(chooseSystem(system))
    navigate("/ships_overview")
  }

  // function selectTau(e, system) {
  //   e.preventDefault();
  //   dispatch(chooseTau(system))
  //   navigate("/ships_overview")
  // }

  // function selectUpsilon(e, system) {
  //   e.preventDefault();
  //   dispatch(chooseUpsilon(system))
  //   navigate("/ships_overview")
  // }

  function goBack() {
    navigate("/main_menu");
  }

  return (
    <>
      {eachSystem.length ? (
        <div className="mission_div">
          <h2 id="mission_select">
            【﻿ｃｈｏｏｓｅ　ｙｏｕｒ　ｄｅｓｔｉｎａｔｉｏｎ】
          </h2>
          <div className="mission_container">
            <div id="proxima">
              <p>
                System:{" "}
                <b>
                  <em>{eachSystem[0].name}</em>
                </b>
              </p>
              <img
                className="img_proxima"
                src={proxima_centauri}
                alt="proxima_centauri"
              />
              <p>
                Distance: <b>{eachSystem[0].distance} light years</b>
              </p>
              <p>
                Mission complexity: <b>{eachSystem[0].mission_complexity}</b>
              </p>
              <p>
                Chance of finding habitable planet:{" "}
                <b>{eachSystem[0].habitibility_chance}%</b>
              </p>
              <button onClick={(e) => selectSystem(e, eachSystem[0])}>
                <span>Choose system</span>
              </button>
            </div>
            <div id="tau">
              <p>
                System: <b><em>{eachSystem[1].name}</em></b>
              </p>
              <img className="img_tau_ceti" src={tau_ceti} alt="tau_ceti" />
              <p>
                Distance: <b>{eachSystem[1].distance} light years</b>
              </p>
              <p>
                Mission complexity: <b>{eachSystem[1].mission_complexity}</b>
              </p>
              <p>
                Chance of finding habitable planet:{" "}
                <b>{eachSystem[1].habitibility_chance}%</b>
              </p>
              <button onClick={(e) => selectSystem(e, eachSystem[1])}>
                <span>Choose system</span>
              </button>
            </div>
            <div id="upsilon">
              <p>
                System: <b><em>{eachSystem[2].name}</em></b>
              </p>
              <img
                className="img_upsilon"
                src={upsilon_andromedae}
                alt="upsilon_andromedae"
              />
              <p>
                Distance: <b>{eachSystem[2].distance} light years</b>
              </p>
              <p>
                Mission complexity: <b>{eachSystem[2].mission_complexity}</b>
              </p>
              <p>
                Chance of finding habitable planet:{" "}
                <b>{eachSystem[2].habitibility_chance}%</b>
              </p>
              <button onClick={(e) => selectSystem(e, eachSystem[2])}>
                <span>Choose system</span>
              </button>
            </div>
          </div>
          <button onClick={goBack}>Go back</button>
        </div>
      ) : (
        <div className="mission_div">
          <p id="shuttle_systems">
            On the shuttle, a display of missions corresponding to different
            star systems presents itself..
          </p>
          <button onClick={getSystems}>View star systems</button>
        </div>
      )}
    </>
  );
}

export default MissionSelect;
