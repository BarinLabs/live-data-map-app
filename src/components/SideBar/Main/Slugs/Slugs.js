import { useEffect, useMemo, useState } from "react";
import SlugChart from "../../Charts/SlugChart";

const Slugs = ({ slugs }) => {
  const [selectedSlug, setSelectedSlug] = useState(slugs[0]);

  useEffect(() => {
    setSelectedSlug(slugs[0]);
  }, []);

  const slugSelectOptions = useMemo(() => {
    return slugs.map(({ slug }) => {
  
        return (
          <option key={Math.random(100)} value={slug}>
            {slug}
          </option>
        );
    });
      
  }, [slugs]);

  const handleSlugSelection = (event) => {
    const value = event.target.value;
    setSelectedSlug(slugs.find(slug => slug.slug === value));
  };

  return (
    <div>
      <h3>Standards:</h3>
      <div>
        <select
          value={selectedSlug.slug}
          onChange={handleSlugSelection}
        >
          {slugSelectOptions}
        </select>
      </div>
      <div>
        {selectedSlug && (
          <SlugChart slug={selectedSlug} />
        )}
      </div>
    </div>
  );
};

export default Slugs;
