import React, { Component } from 'react';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

import ContentData from '../../data/english.json';
import '../../main.css';

const restructureData = () => {
  const allKeys = Object.keys(ContentData);
  const withCity = allKeys.filter(key => key.indexOf('_city_') > -1);

  const newObject = {};
  const finalData = [];
  for (let index = 0; index < withCity.length / 3; index += 1) {
    newObject[ContentData[`compare-tabs_1_city_${index + 1}_name`]] = {
      aqi: ContentData[`compare-tabs_1_city_${index + 1}_aqi`],
      cigg: ContentData[`compare-tabs_1_city_${index + 1}_cigg`]
    };
  }
  finalData.push(newObject);
  return finalData[0];
};

class HeadingData extends Component {
  constructor(props) {
    super(props);
    this.onSelect = this.onSelect.bind(this);
    this.state = {
      aqi: '',
      cigg: '',
    };
  }
  onSelect(data) {
    const { value } = data;
    const cityData = restructureData()[value];
    this.setState({
      aqi: cityData.aqi,
      cigg: cityData.cigg
    });
  }
  render() {
    return (
      <div className="parentContainer">
        <img className="heroImage" src={ContentData.hero_1_image} alt="Display" />
        <div className="parentText">
          <p className="contentText">{ContentData.p_1_value}</p>
          <p className="contentText">{ContentData.p_2_value}</p>
          <p className="contentText">{ContentData.p_3_value}</p>
          <p className="contentText">{ContentData.p_4_value}</p>
          <p className="contentText">{ContentData.p_5_value}</p>
        </div>
        <div>
          <Dropdown
            options={Object.keys(restructureData())}
            onChange={this.onSelect}
            value=""
            placeholder={ContentData['compare-tabs_1_title']}
          />
        </div>

        <div>
          The Air Quality is {this.state.aqi}
        </div>
        <div>
          The number of Cigarettes smoked is {this.state.cigg}
        </div>
      </div>
    );
  }
}


export default HeadingData;
