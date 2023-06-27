import React from "react";
import Moment from "react-moment";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deleteLogs, setCurrent } from "../../actions/LogActions";
import M from "materialize-css/dist/js/materialize.min.js";

const LogItem = ({ log, deleteLogs, setCurrent }) => {
  const onDelete = () => {
    deleteLogs(log.id);
    M.toast({ html: "Log Deleted" });
  };

  return (
    <div>
      <li className="collection-item">
        <div>
          <a
            href="#edit-log-modal"
            className={`modal-trigger ${
              log.attention ? "red-text" : "blue-text"
            }`}
            style={{ fontSize: "18px" }}
            onClick={() => setCurrent(log)}
          >
            {log.message}
          </a>
          <br></br>
          <span className="grey-text">
            <span className="black-text">ID #{log.id}</span> last updated by{" "}
            <span className="black-text">{log.tech}</span> on{" "}
            <Moment format="MMMM Do YYYY, h:mm:ss a">{log.date}</Moment>
          </span>
          <a className="secondary-content" onClick={onDelete} href="#!">
            <i className="material-icons grey-text">delete</i>
          </a>
        </div>
      </li>
    </div>
  );
};

LogItem.propTypes = {
  log: PropTypes.object.isRequired,
  deleteLogs: PropTypes.func.isRequired,
  setCurrent: PropTypes.func.isRequired,
};

export default connect(null, { deleteLogs, setCurrent })(LogItem);
