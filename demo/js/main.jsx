import React, { StrictMode, useState, useEffect } from "react";
import { createRoot } from "react-dom/client";

const root = createRoot(document.getElementById("reactEntry"));

root.render(
  <StrictMode>
    <Demo />
  </StrictMode>
);

function Demo() {
  const [datumId, setDatumId] = useState(null);
  return (
    <div className="content">
      <div className="controls">
        <button
          className={datumId == 1 ? "selected" : "unselected"}
          onClick={() => setDatumId(1)}
        >
          Load Datum #1
        </button>
        <button
          className={datumId == 2 ? "selected" : "unselected"}
          onClick={() => setDatumId(2)}
        >
          Load Datum #2
        </button>
        <button
          className={datumId == 3 ? "selected" : "unselected"}
          onClick={() => setDatumId(3)}
        >
          Load Datum #3
        </button>
        {datumId !== null && <DataDisplay datumId={datumId} />}
      </div>
    </div>
  );
}

function DataDisplay({ datumId }) {
  const [datum, setDatum] = useState(null);

  useEffect(() => {
    // Reset data to null when dataId changes so we can show a loading state
    setDatum(null);

    // Fetch data from the server
    fetch(`/data/${datumId}`)
      .then((response) => response.json())
      .then((data) => setDatum(data));
  }, [datumId]);

  if (datum === null) {
    return <div className="data">Loading...</div>;
  }

  return <div className="data">datum #{datum.datum_id} loaded!</div>;
}

function DataDisplayFixed({ datumId }) {
  const [datum, setDatum] = useState(null);

  useEffect(() => {
    // Reset data to null when dataId changes so we can show a loading state
    setDatum(null);

    let ignore = false;

    // Fetch data from the server
    fetch(`/data/${datumId}`)
      .then((response) => response.json())
      .then((data) => {
        if (ignore) return;
        return setDatum(data);
      });

    return () => {
      ignore = true;
    };
  }, [datumId]);

  if (datum === null) {
    return <div className="data">Loading...</div>;
  }

  return <div className="data">Datum #{datum.datum_id} loaded!</div>;
}
