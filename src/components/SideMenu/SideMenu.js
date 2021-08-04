import SideMenuNav from "./SideMenuNav";
import SideMenuContent from "./SideMenuContent";

import CAQI from "../../assets/CAQI.png";
import EAQI from "../../assets/EAQI.png";
import SBAQI from "../../assets/SBAQI.png";

import styles from "./sideMenu.module.scss";
import { useState } from "react";

const SideMenu = () => {
  const [isItemSelected, setIsItemSelected] = useState(false);
  const [currItem, setCurrItem] = useState("");

  const handleItemSelection = (itemTitle) => {
    if (currItem !== itemTitle) {
      setIsItemSelected(true);
      setCurrItem(itemTitle === "About" ? About : FAQ);
    } else {
      closeContent();
    }
  };

  const closeContent = () => {
    setIsItemSelected(false);
    setCurrItem("");
  };

  return (
    <div className={styles.container}>
      <SideMenuNav
        selectItem={handleItemSelection}
        closeContent={closeContent}
      />
      {isItemSelected && (
        <SideMenuContent item={currItem} closeContent={closeContent} />
      )}
    </div>
  );
};

export default SideMenu;

const About = (
  <div>
    <h1>About</h1>
    <h3>About the application</h3>
    <p>
      Senstate Live Data Map is a real-time web application that visualizes data
      from environmental sensory devices in real-time manner. The application
      displays real-time and historical information for variety of measurement
      units depending on each device class. This application uses Senstate’s
      open data services to retrieve information from both our internal devices
      network, but also from other reliable data providers such as the European
      Environmental Agency and others. Please refer to Data Network from the FAQ
      section to learn more.
    </p>
    <h3>About us</h3>
    <p>
      Senstate Technologies is a European technology company operating in the
      field of EnvTech (environmental technology). The company develops high
      quality hardware devices for Air Quality Monitoring and monitoring of
      other environmental categories, such as water and traffic.{" "}
    </p>
    <p>
      We also develop software solutions for environmental data processing, open
      data services and cloud systems for cities, governments and the private
      sector.{" "}
    </p>
    <h3>Licensing</h3>
    <p>
      Information in this app is licensed under CC BY 4.0 and might be protected
      by intellectual property. You can use the data for personal and commercial
      use, including to modify, reproduce and transfer it, but you are obligated
      to provide a link to the license, and indicate if changes were made. All
      open data services are limited to 30 requests per minute per IP address as
      a community (free) version. For full access to services with advanced
      features and higher limit of requests, please contact us.
    </p>
    <p>
      You can read the full terms of CC BY 4.0{" "}
      <a href="https://creativecommons.org/licenses/by/4.0/">here</a>
    </p>
    <h3>Data reliability</h3>
    <p>
      We take great care of data reliability when taking decisions which devices
      to visualize on the map. The devices we build are industry grade devices
      of highest class that incorporate precision sensing components and tamper
      proof / data integrity protection. Each device passes through variety of
      internal quality assurance procedures and verification from leading
      laboratories. This is why all Senstate devices are listed by definition on
      the map.{" "}
    </p>
    <p>
      This application can also visualize sensory devices from other data
      sources. For other pool of devices to be shown on the map, it should have
      proof for compliance, to be validated by external or government
      institution or verified by other recognizable mean. An example of reliable
      data source is the network from the European Environmental Agency.
    </p>
  </div>
);

const FAQ = (
  <div>
    <h1>FAQ</h1>
    <h3>What does an Index mean?</h3>
    <p>
      An index is an indicator of measure of something. It is usually a
      mathematical or statistical calculation of set of input data that outputs
      a uniform representation of value or level. Indexes are commonly used in
      finance, other fields and especially in the environmental field, for
      example for Air Quality.{" "}
    </p>
    <p>
      For Air Quality representation, there are variety of indexes worldwide,
      most of them created by governments, but there are indexes defined by
      science establishments or even private companies.{" "}
    </p>
    <p>
      In the Senstate Live Data Map, the following indexes are currently
      supported:
    </p>
    <ul>
      <li>
        CAQI (Common Air Quality Index)
        <p>
          CAQI index is created in Europe, but used in many locations worldwide.
          Particulate matter PM2.5, PM10.0 as well as NO2 and O3 are used in the
          calculation of this method. It outputs a number from 1 to 100, where
          low value means good air quality and a high value means bad air
          quality. It has 5 levels – very low, low, medium, high and very high.
          Visually, this index is represented in tabular form, as shown below:
        </p>
        <img src={CAQI}></img>
        <p>
          For more information about this index, please check this{" "}
          <a href="https://en.wikipedia.org/wiki/Air_quality_index#CAQI">
            link
          </a>
        </p>
      </li>
      <li>
        EAQI (European Air Quality Index)
        <p>
          EAQI index is the official index of Europe. Its definition is created
          by the European Environmental Agency is widely adopted acrross the
          European Union. It requires particulate matter (PM2.5 and PM10),
          ground-level ozone (O3), nitrogen dioxide (NO2) and Sulphur dioxide
          (SO2) pollutant measurements to be calculated. Key aspect of this
          index is that it will not output a number, but rather just a level of
          pollution on a 6-level scale: good, fair, moderate, poor, very poor
          and extremely poor. A detailed table is shown below:
        </p>
        <img src={EAQI}></img>
      </li>
      <li>
        SBAQI (Senstate Basic Air Quality Index)
        <p>
          This is an index based on the CAQI index formula, but especially
          created for locations where gas pollution does not pose a great risk.
          Such places could be parks, forests, landscape areas or other places
          that are away from industrial zones or heavy traffic zones. The SBAQI
          index only takes the fine particles component for its calculation. It
          requires PM1.0, PM2.5, and PM10.0 as input parameters. Its output is
          similar to the CAQI Index – a value from 1 to 100 and level from 1 to
          5.
        </p>
        <img src={SBAQI}></img>
        <p>
          For more information about this index, please check this{" "}
          <a href="https://en.wikipedia.org/wiki/Air_quality_index#CAQI">
            link
          </a>
        </p>
      </li>
    </ul>
    <h3>How is an index calculated?</h3>
    <p>
      Indexes are calculated based on a certain definition for each one.
      Usually, a data from the last hour, last 24 hours, a median of 8 hours or
      similar averaging functions are used for index calculation. Most publicly
      open systems calculate the index for each hour. This means that the index
      value is always shown as historical representation with 1 hour delay, so
      in any means, it should not be considered as real-time, on the moment
      value.
    </p>
    <p>
      Since we aim to become a leading provider of reliable data applications as
      well as applications that are as responsive and as close to real-time as
      possible, the index calculation of our data services is made on every 5
      minutes. This procedure is much more computing resource intensive, but at
      the end it makes the application’s data more useful to the user.
    </p>
    <h3>What are standards, how they are calculated?</h3>
    <p>
      Standards are regulatory limits set by a respective official authority.
      Compared to indexes, standards (compliance) can be calculated for each
      separate pollutant rather than a set of pollutants. For example, if a
      standard for PM2.5 (fine particles with diameter of 2.5 microns) based on
      the EU regulations is to not exceed 25mg/m3 for hour, then each data
      record that comes from the device recalculates the average hourly value
      and shows in percentage how closely the value is to the regulation limit.
    </p>
    <h3>Can you include other data sources?</h3>
    <p>
      We can include external data sources upon request. If you produce
      environmental data acquisition devices or would like to include data from
      some sensory information networks, you can contact us to assess
      possibilities. Keep in mind, that a proof for reliability of the collected
      data should be present as per our Data reliability policy. Also, there
      might be a need for integration procedure between our technical teams in
      order to standardize communication specifics, security standards and other
      technical aspects.
    </p>
    <p>
      By integrating your data network into our services infrastructure, you
      will directly take the opportunity to have indexes and standards
      calculated as well as your devices will be listed on the map for public
      accessibility by users.
    </p>
    <h3>Can I use the data from this application?</h3>
    <p>
      You can use the data from this application freely to build your
      applications, or use it for whatever purposes you need. The only
      requirement is to comply with the terms of Licensing. Please refer to
      Licensing in the About section of the application.
    </p>
    <p>
      In addition, you can also take advantage of our Open Data API’s. More
      information about the Open Data services we provide can be found{" "}
      <a href="">here</a>
    </p>
  </div>
);
