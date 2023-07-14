/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useRef } from "react";
import { CapabilityProps } from "./interface";
import { toODataString } from "@progress/kendo-data-query";

const Capability = ({ dataState, onDataReceived }: CapabilityProps) => {
  const baseUrl = `https://afsctest.xrdig.com//Milhub/server/odata/MhCapability?$count=true&$select=id,keyed_name,created_by_id,_name,_description,_capability_area,_status&`;
  const token: number = import.meta.env.VITE_TOKEN_KEY;
  const init = {
    method: "GET",
    accept: "application/json",
    headers: { Authorization: `Bearer ${token}` },
  };

  const lastSuccess = useRef<string>("");
  const pending = useRef<string>("");

  const requestDataIfNeeded = () => {
    if (pending.current || toODataString(dataState) === lastSuccess.current) {
      return;
    }
    pending.current = toODataString(dataState);

    void fetch(baseUrl + pending.current, init)
      .then((res) => res.json())
      .then((json) => {
        lastSuccess.current = pending.current;
        console.log(lastSuccess.current);
        pending.current = "";
        if (toODataString(dataState) === lastSuccess.current) {
          onDataReceived.call(undefined, {
            data: json.value,
            total: json["@odata.count"],
          });
        } else {
          requestDataIfNeeded();
        }
      });
  };

  requestDataIfNeeded();
  return null;
};
export default Capability;
