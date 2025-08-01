interface TabSelectorsProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
}

export default function TabSelectors({
  currentTab,
  setCurrentTab,
}: TabSelectorsProps) {
  const tabs = ["cast", "crew", "details", "genres"];

  const elements = tabs.map((tab) => {
    return (
      <div
        key={tab}
        className={`tab ${currentTab === tab ? "active" : ""}`}
        onClick={() => setCurrentTab(tab)}
      >
        {tab}
      </div>
    );
  });

  return <div className='film-tabs'>{elements}</div>;
}
