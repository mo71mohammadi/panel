import React, { useContext, useState } from "react";
import { Select, Button } from "antd";
import Search from "antd/lib/input/Search";
import { SearchState, SearchProvider } from "./StateManager/searchState";
import { pagination } from "./StateManager/paginationState";
import axios from "axios";
import { message } from "antd";
import { CSVLink } from "react-csv";

const { Option } = Select;

export function Selecto() {
  const { action, setAction } = React.useContext(SearchState);
  const { pagi, setPagi } = useContext(pagination);
  const [state, setstate] = useState([]);

  function handleChange(value: any) {
    console.log(`selected ${value}`);
    const data: any = {
      size: 20
    };
    axios({
      method: "GET",
      url: `http://45.92.95.69:5000/api/drugs/distinct?item=${value}`,
      data: data
    })
      .then((res: { data: any }) => {
        setAction({ ...action, subject: value, isSearch: true });
        setstate(res.data.data);
        console.log("res.data.data", res.data.data);
        message.success(
          `We found ${res.data.count} item Related with ${value}`
        );
      })
      .catch(() => console.log("Get Data Fail"));
  }

  function HandleSearch() {
    setPagi({
      pageSize: pagi.pageSize,
      pageCurrent: 0
    });

    setAction({
      ...action,
      input: action.input,
      subject: action.subject,
      isSearch: true
    });
  }

  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <SearchProvider>
        <Search
          placeholder="input search text"
          onSearch={HandleSearch}
          onChange={e => setAction({ ...action, input: e.target.value })}
          enterButton
          size="large"
          style={{ width: "50%" }}
        />

        <Select
          placeholder={action.subject}
          defaultValue="Select Subject"
          value={action.subject}
          style={{ width: "25%", marginLeft: 8 }}
          onChange={handleChange}
          size="large"
          defaultActiveFirstOption={true}
        >
          <Option value="eRx">eRx</Option>
          <Option value="genericCode">genericCode</Option>
          <Option value="enBrandName">enBrandName</Option>
          <Option value="enName">enName</Option>
          <Option value="faName">faName</Option>
          <Option value="producer">producer</Option>
          <Option value="gtn">gtn</Option>
          <Option value="irc">irc</Option>
          <Option value="packageCode">packageCode</Option>
          <Option value="packageType">packageType</Option>
          <Option value="strength">strength</Option>
          <Option value="enRoute">enRoute</Option>
          <Option value="faRoute">faRoute</Option>
          <Option value="enForm">enForm</Option>
          <Option value="faForm">faForm</Option>
          <Option value="atcCode">atcCode</Option>
          <Option value="upToDateId">upToDateId</Option>
          <Option value="medScapeId">medScapeId</Option>
          <Option value="packageCount">packageCount</Option>
          <Option value="faBrandName">faBrandName</Option>
          <Option value="nativeIRC">nativeIRC</Option>
          <Option value="volume">volume</Option>
          <Option value="licenseOwner">licenseOwner</Option>
          <Option value="countryBrandOwner">countryBrandOwner</Option>
          <Option value="brandOwner">brandOwner</Option>
          <Option value="countryProducer">countryProducer</Option>
          <Option value="atc">atc</Option>
          <Option value="priceHistory">priceHistory</Option>
        </Select>

        <CSVLink
          data={state.toLocaleString()}
          filename={"drgExport.xlsx"}
          style={{ width: "25%", marginRight: 0, marginLeft: 8 }}
        >
          <Button style={{ width: "100%" }} size="large" type="danger">
            {"Export Based Subject"}
          </Button>
        </CSVLink>
      </SearchProvider>
    </div>
  );
}
