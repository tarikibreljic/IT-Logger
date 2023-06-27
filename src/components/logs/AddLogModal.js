import React, { useEffect, useState } from "react";
import M from "materialize-css/dist/js/materialize.min.js";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addLog } from "../../actions/LogActions";
import TechSelecetOptions from "../techs/TechSelecetOptions";
import { getTechs } from "../../actions/TechActions";

const AddLogModal = ({ tech: { techs }, addLog }) => {
  const [message, setMessage] = useState("");
  const [attention, setAttention] = useState(false);
  const [tech, setTech] = useState("");

  useEffect(() => {
    getTechs();
    // eslint-disable-next-line
  }, []);

  console.log(techs);

  const onSubmit = (e) => {
    if (message === "" || tech === "") {
      M.toast({ html: "Please enter a message and tech" });
      setMessage("");
      setAttention(false);
      setTech("");
    } else {
      const newLog = {
        message,
        attention,
        tech,
        date: new Date(),
      };

      addLog(newLog);

      M.toast({ html: `Log added by ${tech}` });

      setMessage("");
      setAttention(false);
      setTech("");
    }
  };

  return (
    <div id="add-log-modal" className="modal" style={modalStyle}>
      <div className="modal-content">
        <h4>Enter System Log</h4>
        <div className="row">
          <div className="input-field">
            <input
              type="text"
              id="message"
              name="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <label htmlFor="message" className="active">
              Log message
            </label>
          </div>
        </div>
        <div className="row">
          {techs && techs.length !== 0 ? (
            <div className="input-field">
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
            </div>
          ) : (
            <h6>Please register Technician to leave a log message</h6>
          )}
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
                  onChange={() => {
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

AddLogModal.propTypes = {
  addLog: PropTypes.func.isRequired,
  tech: PropTypes.object.isRequired,
};

const modalStyle = {
  width: "75%",
  height: "75%",
};

const mapStateToProps = (state) => ({
  tech: state.tech,
});

export default connect(mapStateToProps, { addLog })(AddLogModal);
