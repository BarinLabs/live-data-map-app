import { useCallback, useEffect, useMemo, useState, useContext } from "react";
import { Bar } from "react-chartjs-2";
import { formatTime } from "../../../utils/timeAndDate";
import { indexColors, font } from "../../../utils/utils";
import ThemeContext from "../../../context/theme-context";
import styles from "./aqichart.module.scss";
import { isDataRecent } from "../../../utils/utils";

const FIRST_TICK_INDEX = 0;
const MID_TICK_INDEX = 11;
const LAST_TICK_INDEX = 23;

const indexHistoricalDataTresholdInMinutes = 180;

const setTooltipText = (context) => {
  const value = context[0].formattedValue;

  let text = "";
  if (value <= 25) {
    text = "Very low";
  } else if (value <= 50) {
    text = "Low";
  } else if (value <= 75) {
    text = "Medium";
  } else if (value <= 100) {
    text = "High";
  } else {
    text = "Very high";
  }
  return text;
};

const setBarColor = (context) => {
  var index = context.dataIndex;
  var value = context.dataset.data[index];

  let color = "";
  if (value <= 25) {
    color = indexColors.veryLow;
  } else if (value <= 50) {
    color = indexColors.low;
  } else if (value <= 75) {
    color = indexColors.medium;
  } else if (value <= 100) {
    color = indexColors.high;
  } else {
    color = indexColors.veryHigh;
  }

  return color;
};

const tickConfigs = {
  color: font.color,
  font: {
    family: font.family,
    size: 14,
    weight: 600,
  },
};

const options = {
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      displayColors: false,
      titleAlign: "center",
      bodyAlign: "center",
      callbacks: {
        afterTitle: (context) => setTooltipText(context),
      },
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      ticks: {
        ...tickConfigs,
      },
    },
    x: {
      ticks: {
        callback: function (val, index) {
          return index === FIRST_TICK_INDEX ||
            index === MID_TICK_INDEX ||
            index === LAST_TICK_INDEX
            ? this.getLabelForValue(val)
            : "";
        },
        autoSkip: false,
        maxRotation: 0,
        ...tickConfigs,
      },
      grid: {
        display: false,
      },
    },
  },
};

const AQIChart = ({ token, indexes, source }) => {
  const ctx = useContext(ThemeContext);
  let { isDarkTheme } = ctx;
  const [error, setError] = useState(false);
  const [data, setData] = useState({ labels: [], hourlyIndexValues: [] });
  const [selectedSlug, setSelectedSlug] = useState(indexes[0].slug);
  const selectOptions = indexes.map(({ slug }) => (
    <option value={slug} key={slug}>
      {slug.toUpperCase()}
    </option>
  ));

  const chartData = useMemo(() => {
    const { labels, hourlyIndexValues } = data;
    return {
      labels: labels,
      datasets: [
        {
          data: hourlyIndexValues,
          barThickness: "flex",
          borderWidth: 0,
          backgroundColor: (context) => setBarColor(context),
        },
      ],
    };
  }, [data]);

  let currSlug = indexes.find((index) => index.slug === selectedSlug);
  let slug = currSlug ? currSlug.slug : indexes[0].slug;

  const getIndexData = useCallback(async () => {
    const response = await fetch(
      `https://see.senstate.cloud/data/${token}/index?slug=${slug}`
    );

    if (!response.ok) {
      throw new Error("Something went wrong.");
    }

    const data = await response.json();

    const loadedLabels = data.map(({ timeStamp }) => formatTime(timeStamp));
    const loadedValues = data.map(({ value }) => value);

    const lastTimeStamp = data[data.length - 1].timeStamp;
    const dataNotRecent = isDataRecent(
      lastTimeStamp,
      indexHistoricalDataTresholdInMinutes
    );
    if (dataNotRecent) {
      setError(true);
    }

    setError(false);
    setData({ labels: loadedLabels, hourlyIndexValues: loadedValues });
  }, [token, slug]);

  useEffect(() => {
    getIndexData().catch((e) => console.log(e.message));
  }, [getIndexData]);

  const handleSlugSelection = (ev) => {
    setSelectedSlug(ev.target.value);
  };

  const title =
    slug === "caqi"
      ? "Air Quality Index (CAQI)"
      : slug === "eaqi"
      ? "European Air Quality Index (EAQI)"
      : "Senstate Air Quality Index (SBAQI)";

  const chart = useMemo(() => {
    return (
      <div className={styles["chart"]}>
        <Bar
          data={chartData}
          options={{
            ...options,
            scales: {
              y: { max: Math.max(...(data.hourlyIndexValues || [0])) + 5 },
            },
          }}
        />
      </div>
    );
  }, [chartData]);

  return (
    <div className={styles["container"]}>
      <p className={isDarkTheme ? styles.p_dark : styles.p}>
        Source:{" "}
        <a href={source.url} target={"_blank"}>
          {source.name}
        </a>
      </p>
      <div className={styles["title-and-select-container"]}>
        <span className={isDarkTheme ? styles.span_dark : styles.span}>
          {title}
        </span>
        <select
          className={isDarkTheme ? styles.select_dark : styles.select}
          value={selectedSlug}
          onChange={handleSlugSelection}
        >
          {selectOptions}
        </select>
      </div>
      <div className={styles["chart-container"]}>
        {error && (
          <div className={styles["no-recent-data-overlay"]}>
            <p>Index historical data not updated recently</p>
          </div>
        )}
        {chart}
      </div>
    </div>
  );
};

export default AQIChart;
