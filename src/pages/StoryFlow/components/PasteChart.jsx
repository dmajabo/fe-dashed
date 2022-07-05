import React from "react";
import { usePapaParse } from "react-papaparse";

const PasteChart = ({ setModalStep, onClose, setFormattedData }) => {
  const [storyDataString, setStoryDataString] = React.useState("");
  const { readString } = usePapaParse();
  React.useEffect(() => {
    if (storyDataString.trim() !== "") {
      // console.log("story data string input", storyDataString);

      readString(storyDataString, {
        worker: true,
        complete: results => {
          /**
           * results formatting:
           *
           * [ ['Date', 'ETH', 'BTC', 'MATIC'],
           *   [2020, 50, 120, 10]
           *   [2021, 100, 150, 20],
           *   [2022, 200, 300, 30]
           * ]
           */

          /**
           *  end result data formatting
           *
           * [
           *    {id: "BTC", data: [{ x: 2021 , y: 0 }, {x: 2022, y: 0}]},
           *    {id: "ETH", data: [{ x: 2021, y: 0, {x: 2022, y: 0} }]},
           * ]
           *
           * x should be the date, y is the numerical value
           */

          /** What do we know?
           *
           *  first item in our results array are the column headers.
           *  we can use those for the Id
           *
           *  we can loop over the first item in the results array,
           *  but skip the first index (which is date)
           */

          const columnHeaders = results.data[0];
          columnHeaders.shift(); // removes the "time" header

          results.data.shift();

          const dataForChart = columnHeaders.map((column, index) => {
            /**
             *  1. loop over results.data
             *  2. each iteration will give us back an array
             *  3. that arrays first item will be the date, or our "x" value
             *  4. we can access the columns value by using our index + 1 (b/c we removed date header)
             *
             * */

            let dataForColumn = results.data.map(data => {
              return {
                x: data[0],
                y: Number(data[index + 1]),
              };
            });

            return {
              id: column,
              data: [...dataForColumn],
            };
          });

          console.log({ dataForChart });

          setFormattedData(dataForChart);
        },
      });
    }
  }, [storyDataString]);
  return (
    <div className="paste-chart">
      <div className="modal-header ">
        <h5 className="modal-title mt-0" onClick={() => setModalStep(1)}>
          <i className="fas fa-chevron-left me-3"></i> Paste Data
        </h5>
        <button
          type="button"
          onClick={() => onClose()}
          className="close"
          data-dismiss="modal"
          aria-label="Close"
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="moda-body px-2">
        <textarea
          onChange={e => setStoryDataString(e.target.value)}
          className="form-control"
          style={{ height: "200px" }}
          value={storyDataString}
        />
      </div>

      <div className="modal-footer">
        <button
          type="button"
          onClick={() => onClose()}
          className="btn btn-secondary"
          data-dismiss="modal"
        >
          Cancel
        </button>
        <button
          type="button"
          className="btn btn-primary"
          disabled={!storyDataString}
          onClick={() => setModalStep(3)}
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default PasteChart;
