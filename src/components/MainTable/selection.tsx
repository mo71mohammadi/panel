import React, {useContext, useEffect, useState} from "react";
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
  const [state, setstate] = useState([]);
  const [obj, setObj] = useState({key: '', value: null});
  const [change, setChange] = useState({key: '', value: null});

  function HandleSearch() {
    if (obj.value !== change.value || obj.key !== change.key) {
      const filter: any = {page: 1};
      if (obj.key) filter[obj.key] = obj.value;
      else delete filter.page;
      setAction({...action, filters: filter});
      setChange({key: obj.key, value: obj.value})
    }
  }

  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <SearchProvider>
        <Select
          placeholder={obj.key}
          defaultValue="Select Subject"
          value={obj.key}
          style={{ width: "25%", marginRight: 8 }}
          onChange={(e:any) => setObj({...obj, key: e})}
          size="large"
          defaultActiveFirstOption={true}
        >
          <Option value="">All</Option>
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
        <Search
            placeholder="input search text"
            onSearch={HandleSearch}
            onChange={(e:any) => setObj({...obj, value: e.target.value})}
            enterButton
            size="large"
            style={{ width: "75%" }}
        />

        {/*<CSVLink*/}
        {/*  data={state.toLocaleString()}*/}
        {/*  filename={"drgExport.xlsx"}*/}
        {/*  style={{ width: "25%", marginRight: 0, marginLeft: 8 }}*/}
        {/*>*/}
        {/*  <Button style={{ width: "100%" }} size="large" type="danger">*/}
        {/*    {"Export Based Subject"}*/}
        {/*  </Button>*/}
        {/*</CSVLink>*/}
      </SearchProvider>
    </div>
  );
}
