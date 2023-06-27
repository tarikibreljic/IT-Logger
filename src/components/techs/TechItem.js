import React from "react";
import M from "materialize-css/dist/js/materialize.min.js";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deleteTech } from "../../actions/TechActions";

const TechItem = ({ tech: { id, firstName, lastName }, deleteTech }) => {
  const onDelete = () => {
    deleteTech(id);
    M.toast({ html: `${firstName} ${lastName} was deleted` });
  };

  return (
    <li className="collection-item">
      <div>
        {firstName} {lastName}
        <a onClick={onDelete} href="#!" className="secondary-content">
          <i className="material-icons grey-text">delete</i>
        </a>
      </div>
    </li>
  );
};

TechItem.propTypes = {
  tech: PropTypes.object.isRequired,
  deleteTech: PropTypes.func.isRequired,
};

export default connect(null, { deleteTech })(TechItem);
