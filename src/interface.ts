import { DataResult, State } from "@progress/kendo-data-query";
export interface CapabilityProps {
  dataState: State;
  onDataReceived: (recievedAlbums: DataResult) => void;
}
