import { useContext, useEffect, useState } from "react";
import SideMenuNav from "./SideMenuNav";
import SideMenuContent from "./SideMenuContent";

import CAQI from "../../assets/CAQI.png";
import EAQI from "../../assets/EAQI.png";
import SBAQI from "../../assets/SBAQI.png";

import styles from "./sideMenu.module.scss";
import LangContext from "../../context/lang-context";

const SideMenu = () => {
  const langCtx = useContext(LangContext);
  const { lang } = langCtx;
  const [isItemSelected, setIsItemSelected] = useState(false);
  const [currItem, setCurrItem] = useState("");
  const [currItemTitle, setCurrItemTitle] = useState("");

  useEffect(() => {
    const FAQ = lang === "bg" ? FAQbg : FAQen;
    const About = lang === "bg" ? aboutBG : aboutEN;
    setCurrItem(currItemTitle === "About" ? About : FAQ);
  }, [lang]);

  const handleItemSelection = (itemTitle) => {
    if (currItemTitle !== itemTitle) {
      setIsItemSelected(true);
      const FAQ = lang === "bg" ? FAQbg : FAQen;
      const About = lang === "bg" ? aboutBG : aboutEN;
      setCurrItem(itemTitle === "About" ? About : FAQ);
      setCurrItemTitle(itemTitle);
    } else {
      closeContent();
    }
  };

  const closeContent = () => {
    setIsItemSelected(false);
    setCurrItem("");
    setCurrItemTitle("");
  };

  return (
    <div className={styles["container"]}>
      <SideMenuNav
        selectItem={handleItemSelection}
        closeContent={closeContent}
        isItemSelected={isItemSelected}
      />
      {isItemSelected && (
        <SideMenuContent item={currItem} closeContent={closeContent} />
      )}
    </div>
  );
};

export default SideMenu;

const aboutEN = (
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
      <a
        href="https://creativecommons.org/licenses/by/4.0/"
        target="_blank"
        rel="noopener noreferrer"
      >
        here
      </a>
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

const aboutBG = (
  <div>
    <h1>За нас</h1>
    <h3>За приложението</h3>
    <p>
      Senstate Live Map е съвременно уеб базирано приложение за визуализиране на
      данни за околната среда. Приложението показва данни в реално време в
      зависимост от наличните параметри на съответните сензорни станции за
      околна среда, а също така съпоставя стойностите спрямо действащите
      Европейски стандарти. Senstate Live Map използва скалируема облачна
      инфраструктура за анализ на големи обеми от данни, което позволява
      изчислението на световно признати индекси за качеството на въздуха, като
      например Общият индекс за качество на въздуха (CAQI), Европейският индекс
      за качеството на въздуха (EAQI) и други. Приложението използва данни от
      надеждни доставчици, като например вътрешно-сертифицираната мрежа от
      устройства на Senstate, Европейската агенция по околна среда и други.
      Повече информация за индексите за качество на въздуха можете да научите от
      страницата Често задавани въпроси.
    </p>
    <h3>За нас</h3>
    <p>
      Сенстейт Технолоджис е българска технологична компания, разработваща
      решения в областта на екологичните решения и опазването на околната среда.
      Компанията разработва висококачествени хардуерни устройства за мониторинг
      на качеството на въздуха, качество на водата и интелигентния трафик.
      Сенстейт Технолоджис разработва собствени облачно базирани решения за
      управление на данни за околната среда за публичния и частен сектор.
    </p>
    <h3>Лицензионна политика</h3>
    <p>
      Информацията в това приложение е лицензирана под CC BY 4.0 и може да бъде
      защитена от интелектуална собственост. Можете да използвате данните за
      лична и търговска употреба, включително за промяна, възпроизвеждане и
      прехвърляне, но сте длъжни да предоставите връзка към лиценза и да
      посочите дали са направени промени. Всички услуги с отворени данни са
      ограничени до 30 заявки в минута на IP адрес. За пълен достъп до услуги с
      разширени функции и по -висок лимит на заявки, моля свържете се с нас.
    </p>
    <p>
      Можете да прочетете пълните условия на CC BY 4.0{" "}
      <a
        href="https://creativecommons.org/licenses/by/4.0/"
        target="_blank"
        rel="noopener noreferrer"
      >
        тук
      </a>
    </p>
    <h3>Надеждност на данните</h3>
    <p>
      Нашият екип полага значителни усилия за осигуряване на максимална
      надеждност на визуализираните данни. В това приложение се визуализират
      само устройства от най-висок клас, които се характеризират с прецизни
      сензорни системи и защита на срещу подправяне на данните. Устройствата на
      Senstate преминават през различни вътрешни процедури за вътрешно
      осигуряване на качеството, както и проверки от водещи лаборатории. В
      приложението може да се визуализират и данни на устройства от външни
      източници на данни след валидиране на съответствието. Пример за надежден
      източник на данни е мрежата на Европейската агенция по околна среда.
    </p>
  </div>
);

const FAQen = (
  <div>
    <h1>Frequently asked questions</h1>
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
          <a
            href="https://en.wikipedia.org/wiki/Air_quality_index#CAQI"
            target="_blank"
            rel="noopener noreferrer"
          >
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
      possible, the index calculation of our data services is made on every 10
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
      <a
        href="https://open-data.senstate.cloud/api-reference/index.html"
        target="_blank"
        rel="noopener noreferrer"
      >
        here
      </a>
    </p>
  </div>
);

const FAQbg = (
  <div>
    <h1>Често задавани въпроси</h1>
    <h3>Какво означава индекс за качество?</h3>
    <p>
      Индексът е показател за стандартизирана мярка. Обикновено това е
      математическо или статистическо изчисление на набор от входни данни, което
      извежда стандартизиран числов показател в определен диапазон. Индексите се
      използват често в областта на финансите и околната среда. За представяне
      на качеството на въздуха се използват различни световно признати индекси,
      някои създадени от държавни агенции, други от научни институции, както и
      от частни компании.
    </p>
    <p>Senstate Live Data Map поддържа следните индекси за качество:</p>
    <ul>
      <li>
        CAQI (Общ индекс за качество на въздуха)
        <p>
          CAQI индексът е създаден в Европа, но се използва на много места по
          света. При изчисляването на този метод се използват прахови частици
          PM2.5, PM10.0, както и NO2 и O3. Той извежда число от 1 до 100, където
          ниската стойност означава добро качество на въздуха, а високата
          стойност означава лошо качество на въздуха. Има 5 нива - много ниско,
          ниско, средно, високо и много високо. Визуално този индекс е
          представен в таблична форма, както е показано по -долу:
        </p>
        <img src={CAQI}></img>
        <p>
          За повече информация относно този индекс, моля, посетете този ресурс{" "}
          <a
            href="https://en.wikipedia.org/wiki/Air_quality_index#CAQI"
            target="_blank"
            rel="noopener noreferrer"
          >
            тук
          </a>
        </p>
      </li>
      <li>
        EAQI (Европейски индекс на качеството на въздуха)
        <p>
          Индексът EAQI е официалният индекс за качеството на въздуха на Европа.
          Дефиницията му е създадена от Европейската агенция по околна среда и е
          широко възприета в Европейския съюз. Входни показатели за
          изчисляването му са прахови частици (PM2.5 и PM10), приземеният озон
          (O3), азотният диоксид (NO2) и серният диоксид (SO2). Ключов аспект на
          този индекс е, че той извежда нивото на замърсяване по 6-степенна
          скала: добро, умерено, нездравословно за чувствителни групи,
          нездравословно, изключително нездравословно и опасно. Подробна таблица
          е показана по -долу:
        </p>
        <img src={EAQI}></img>
      </li>
      <li>
        SBAQI (Индекс на качеството на въздуха Senstate)
        <p>
          Това е индекс, базиран на формулата за индекс CAQI, но специално
          създаден за места, където замърсяването с газ не представлява голям
          риск. Такива места могат да бъдат паркове, гори, ландшафтни зони или
          други места, които са далеч от индустриални зони или зони с интензивен
          трафик. Индексът SBAQI взема само компонента на фините частици за
          своето изчисление. Той изисква PM1.0, PM2.5 и PM10.0 като входни
          параметри. Неговият изход е подобен на CAQI Index - стойност от 1 до
          100 и ниво от 1 до 5.
        </p>
        <img src={SBAQI}></img>
      </li>
    </ul>
    <h3>Как се изчисляват индексите?</h3>
    <p>
      Индексите се изчисляват въз основа на съответната им спецификация.
      Обикновено, при изчисляването им се използват данни от последния час,
      последните 24 часа и други подобни функции за осредняване. Повечето
      публично достъпни системи изчисляват индексите на всеки част. Това
      означава, че стойността на индекса винаги се показва като историческа
      репрезентация с час закъснение.
    </p>
    <p>
      Нашият стремеж е да се превърнем във водещ доставчик на надеждни
      приложения за данни, които да са възможно най-близки до приложенията в
      реално време. Поради тази причина, изчисляването на индексите в облачните
      услуги, които разработваме се извършва на всеки 10 минути. Тази процедура
      е значително по-интензивна от гледна точка на изчислителни ресурси, но в
      крайна сметка прави приложението по-полезно за потребителите.
    </p>
    <h3>Какво представляват стандартите?</h3>
    <p>
      Стандартите са регулаторни лимити, определени от съответния официален
      орган. В сравнение с индексите, стандартите (съответствие) могат да бъдат
      изчислени за всеки отделен замърсител, а не за набор от замърсители.
      Например, ако стандарт за PM2.5 (фини частици с диаметър 2.5 микрона) въз
      основа на разпоредбите на ЕС не трябва да надвишава 25 mg/m3 за час,
      тогава всеки запис на данни, който идва от устройството, преизчислява
      средната почасова стойност и показва в проценти колко близо е стойността
      до регулаторната граница.
    </p>
    <h3>Можете ли да се добавят други източници на данни?</h3>
    <p>
      Можем да включим външни източници на данни при поискване. Ако произвеждате
      устройства за събиране на данни за околната среда или искате да включите
      данни от някои сензорни информационни мрежи, можете да се свържете с нас,
      за да преценим възможностите. Имайте предвид, че съгласно нашата политика
      за надеждност на данните трябва да има доказателство за надеждност на
      събраните данни. Също така може да има нужда от процедура за интегриране
      между нашите технически екипи, за да се стандартизират комуникационните
      специфики, стандартите за сигурност и други технически аспекти.
    </p>
    <p>
      Интегрирайки вашата мрежа за данни в нашата инфраструктура за услуги, вие
      директно ще се възползвате от възможността за изчисляване на индекси и
      стандарти, както и вашите устройства ще бъдат изброени на картата за
      обществена достъпност от потребителите.
    </p>
    <h3>Мога ли да използвам данните от това приложение?</h3>
    <p>
      Можете да използвате данните от това приложение свободно за изграждане на
      вашите приложения или да ги използвате за каквито и да е цели.
      Единственото изискване е да се спазват условията за лицензиране. Моля,
      вижте Лицензиране в раздела Информация за приложението.
    </p>
    <p>
      Освен това можете да се възползвате и от нашия API за отворени данни.
      Повече информация за услугите за отворени данни можете да намерите{" "}
      <a
        href="https://open-data.senstate.cloud/api-reference/index.html"
        target="_blank"
        rel="noopener noreferrer"
      >
        тук
      </a>
    </p>
  </div>
);
