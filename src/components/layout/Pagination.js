import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

const Pagination = ({ logs, totalLogs, paginate, logsPerPage }) => {
  // console.log(logs);

  const pageNumbers = [];
  const [active, setActive] = useState(1);

  for (let i = 1; i <= Math.ceil(totalLogs / logsPerPage); i++) {
    pageNumbers.push(i);
  }

  useEffect(() => {
    if (logs.length === 0) {
      let lastNum = pageNumbers[pageNumbers.length - 1];
      paginate(lastNum);
      setActive(lastNum);
    }
  }, [pageNumbers]);

  return (
    <div style={{ position: "absolute", bottom: "30px", left: "215px" }}>
      {pageNumbers.length > 1 && (
        <ul className="pagination">
          {pageNumbers.map((number) => (
            <li
              key={number}
              onClick={() => (setActive(number), paginate(number))}
              className={active === number ? "active" : "waves-effect"}
            >
              <a>{number}</a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

Pagination.propTypes = {
  logs: PropTypes.array,
  totalLogs: PropTypes.number.isRequired,
  paginate: PropTypes.func.isRequired,
  logsPerPage: PropTypes.number.isRequired,
};

export default Pagination;
