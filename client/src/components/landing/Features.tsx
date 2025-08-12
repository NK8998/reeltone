import {
  ClockIcon,
  FavouriteSvg,
  FilledVisibleSvg,
  RateSvg,
  ReviewSvg,
} from "@/assets/icons";

const features = [
  {
    icon: <FilledVisibleSvg />,
    name: "Track Films",
    desc: "Keep track of every film you’ve ever watched (or just start from the day you join)",
  },
  {
    icon: <FavouriteSvg />,
    name: "Like Favorites",
    desc: "Show some love for your favorite films, lists and reviews with a “like”",
  },
  {
    icon: <ReviewSvg />,
    name: "Write Reviews",
    desc: "Write and share reviews, and follow friends and other members to read theirs",
  },
  {
    icon: <RateSvg />,
    name: "Rate Films",
    desc: "Rate each film on a five-star scale (with halves) to record and share your reaction",
  },
  {
    icon: <ClockIcon />,
    name: "Watchlist",
    desc: "Add your favorite films to a watchlist and never forget to watch them",
  },
];

export default function Features() {
  const elements = features.map((feature, idx) => (
    <li
      className='feature-card'
      key={idx}
      itemScope
      itemType='https://schema.org/Article'
    >
      <span
        className='feature-icon'
        role='img'
        aria-label={`${feature.name} icon`}
      >
        {feature.icon}
      </span>
      <h5 className='sr-only' itemProp='headline'>
        {feature.name}
      </h5>
      <p className='feature-desc' itemProp='description'>
        {feature.desc}
      </p>
    </li>
  ));

  return (
    <section className='limited-width features'>
      <div
        className='section-top-row'
        style={{ "--section-translate-y": "0px" } as React.CSSProperties}
      >
        <h4>ReelTone lets you...</h4>
      </div>
      <ul className='featured-grid'>{elements}</ul>
    </section>
  );
}
