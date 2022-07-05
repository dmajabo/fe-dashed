import React from "react";

const PasteChart = () => {
  const [storyTitle, setStoryTitle] = React.useState("Story title");
  const [storyDataString, setStoryDataString] = React.useState("");

  React.useEffect(() => {
    if (storyDataString.trim() !== "") {
      console.log("story data string input", storyDataString);

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
    <>
      <textarea
        onChange={e => setStoryDataString(e.target.value)}
        className="form-control"
        style={{ height: "200px" }}
        value={storyDataString}
      />
    </>
  );
};

export default PasteChart;
