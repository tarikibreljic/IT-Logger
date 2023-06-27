import React, { useEffect } from "react";
import TechItem from "./TechItem";
import { connect } from "react-redux";
import { getTechs } from "../../actions/TechActions";
import PropTypes from "prop-types";

const TechListModal = ({ getTechs, tech: { techs, loading } }) => {
  useEffect(() => {
    getTechs();
    //eslint-disable-next-line
  }, []);

  console.log(techs);

  return (
    <div id="tech-list-modal" className="modal">
      <div className="modal-content">
        {techs && techs.length !== 0 ? (
          <>
            <h4>Technician List</h4>
            <ul className="collection">
              {!loading &&
                techs !== null &&
                techs.map((tech) => <TechItem key={tech.id} tech={tech} />)}
            </ul>
          </>
        ) : (
          <h5>No Technicians to show</h5>
        )}
      </div>
    </div>
  );
};

TechListModal.propTypes = {
  tech: PropTypes.object.isRequired,
  getTechs: PropTypes.func.isRequired,
};

const mapToStateProps = (state) => ({
  tech: state.tech,
});

export default connect(mapToStateProps, { getTechs })(TechListModal);
