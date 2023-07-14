import { useState } from "react";
import "@progress/kendo-theme-material/dist/all.css";
import { DataResult, State } from "@progress/kendo-data-query";
import {
  Grid,
  GridColumn as Column,
  GridDataStateChangeEvent,
} from "@progress/kendo-react-grid";
import { formFields } from "./formFields";
import Capability from "./Capability";

const App = () => {
  const [data, setData] = useState<DataResult>({
    data: [],
    total: 100,
  });

  const [dataState, setDataState] = useState<State>({
    take: 10,
    skip: 0,
  });

  const dataStateChange = (e: GridDataStateChangeEvent) => {
    setDataState(e.dataState);
  };

  const dataRecieved = (ReciecedData: DataResult) => {
    console.log(ReciecedData);
    setData(ReciecedData);
  };

  console.log(data);

  return (
    <>
      <Grid
        pageable={true}
        {...dataState}
        data={data}
        onDataStateChange={dataStateChange}
      >
        {formFields.map((fields, index) => (
          <Column field={fields.field} title={fields.title} key={index} />
        ))}
      </Grid>
      <Capability dataState={dataState} onDataReceived={dataRecieved} />
    </>
  );
};
export default App;
