import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import M from "materialize-css/dist/js/materialize.min.js";
import { updateLog } from "../../actions/LogActions";
import TechSelecetOptions from "../techs/TechSelecetOptions";
import { getTechs } from "../../actions/TechActions";

const EditLogModal = ({ updateLog, current, techs }) => {
  const [message, setMessage] = useState("");
  const [attention, setAttention] = useState(false);
  const [tech, setTech] = useState("");

  console.log(techs);

  useEffect(() => {
    getTechs();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (current) {
      setMessage(current.message);
      setAttention(current.attention);
      // setTech(current.tech);
    }
  }, [current]);

  const onSubmit = (e) => {
    if (message === "" || tech === "") {
      M.toast({ html: "Please enter a message and tech" });
    } else {
      const updLog = {
        id: current.id,
        message,
        tech,
        attention,
        date: new Date(),
      };
      updateLog(updLog);
      M.toast({ html: `Log updated by ${tech}` });

      setMessage("");
      setAttention(false);
      setTech("");
    }
  };

  return (
    <div id="edit-log-modal" className="modal" style={modalStyle}>
      <div className="modal-content">
        <h4>Edit System Log</h4>
        <div className="row">
          <div className="input-field">
            <input
              type="text"
              name="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>
        </div>
        <div className="row">
          <div className="input-field">
            {techs === null || techs.length === 0 ? (
              "Please register Technician to update log"
            ) : (
              <select
                name="tech"
                value={tech}
                className="browser-default"
                onChange={(e) => setTech(e.target.value)}
              >
                <option value="" disabled>
                  Select tehnician
                </option>
                <TechSelecetOptions />
              </select>
            )}
          </div>
        </div>
        <div className="row">
          <div className="input-field">
            <p>
              <label>
                <input
                  type="checkbox"
                  className="filled-in"
                  checked={attention}
                  value={attention}
                  onChange={(e) => {
                    setAttention(!attention);
                  }}
                />
                <span>Needs attention</span>
              </label>
            </p>
          </div>
        </div>
      </div>
      <div className="modal-footer">
        <a href="#!" onClick={onSubmit} className="modal-close blue btn">
          Enter
        </a>
      </div>
    </div>
  );
};

EditLogModal.propTypes = {
  current: PropTypes.object,
  updateLog: PropTypes.func.isRequired,
  techs: PropTypes.array,
};

const modalStyle = {
  width: "75%",
  height: "75%",
};

const mapStateToProps = (state) => ({
  current: state.log.current,
  techs: state.tech.techs,
});

export default connect(mapStateToProps, { updateLog })(EditLogModal);
