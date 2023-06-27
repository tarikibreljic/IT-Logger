import React, { useEffect, useState } from "react";
import LogItem from "./LogItem";
import Preloader from "../layout/Preloader";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getLogs } from "../../actions/LogActions";
import Pagination from "../layout/Pagination";

const Logs = ({ log: { logs, loading }, getLogs }) => {
  //
  useEffect(() => {
    getLogs();
    sessionStorage.setItem("currPage", JSON.stringify(1));
    //eslint-disable-next-line
  }, []);

  const logsPerPage = 5;
  const [currPage, setCurrPage] = useState(1);
  const lastIndex = logsPerPage * currPage;
  const firstIndex = lastIndex - logsPerPage;
  let currLogs;

  console.log(logs);

  if (logs !== null) {
    currLogs = logs.slice(firstIndex, lastIndex);
  }

  if (loading || logs === null) {
    return <Preloader />;
  }

  const paginate = (num) => {
    sessionStorage.setItem("currPage", JSON.stringify(num));
    setCurrPage(num);
  };

  return (
    <div>
      <ul className="collection with-header">
        <li className="collection-header">
          <h4 className="center">System Logs</h4>
        </li>

        {(!loading && currLogs === undefined) || currLogs.length === 0 ? (
          <p className="center">No Logs to show..</p>
        ) : (
          currLogs.map((log) => <LogItem key={log.id} log={log} />)
        )}
      </ul>
      <Pagination
        logs={currLogs}
        totalLogs={logs.length}
        logsPerPage={logsPerPage}
        paginate={paginate}
      />
    </div>
  );
};

Logs.prototypes = {
  log: PropTypes.object.isRequired,
  getLogs: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  log: state.log,
});

export default connect(mapStateToProps, { getLogs })(Logs);
