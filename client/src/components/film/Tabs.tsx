import { CastMember, CrewMember, EssentialData } from "@/types/types";
import RegularImage from "../reusables/RegularImage";
import { useState } from "react";

const orderedJobs = [
  "Director",
  "Executive Producer",
  "Producer",
  "Writer",
  "Assistant Director",
];

const TMDDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

export const CrewTab = ({
  crew,
  isHidden,
}: {
  crew: CrewMember[];
  isHidden: boolean;
}) => {
  const [showMore, setShowMore] = useState(false);
  const MAX_MEMBERS = showMore ? crew.length : 7;
  // Bring priority crew to the front
  const prioritizedCrew = [...crew].sort((a, b) => {
    const aIndex = orderedJobs.indexOf(a.job);
    const bIndex = orderedJobs.indexOf(b.job);
    const aRank = aIndex === -1 ? Infinity : aIndex;
    const bRank = bIndex === -1 ? Infinity : bIndex;
    return aRank - bRank;
  });

  const limitedCrew = prioritizedCrew.slice(0, MAX_MEMBERS);

  //group crew members by job
  const groupedCrew = limitedCrew.reduce<Record<string, CrewMember[]>>(
    (acc, member) => {
      if (!acc[member.job]) acc[member.job] = [];
      acc[member.job].push(member);
      return acc;
    },
    {}
  );

  return (
    <div className='crew-tab film-tab' hidden={isHidden}>
      {Object.entries(groupedCrew).map(([job, members]) => (
        <div key={job} className='crew-group tab-group'>
          <div className='job-title tab-left'>
            <h2>{job}</h2>
            <span>
              ...........................................................
            </span>
          </div>
          <div className='member-list tab-list'>
            {members.map((member) => {
              const src = `${TMDDB_IMAGE_BASE_URL}${member.profile_path}`;
              return (
                <div key={member.id} className='crew-member tab-member'>
                  <RegularImage
                    src={src}
                    alt={member.name}
                    className='profile-image'
                    isHidden={isHidden}
                  />
                  <div className='member-info'>
                    <h3>{member.name}</h3>
                    {/* optionally omit job here, since it's shown in the group */}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
      {limitedCrew.length >= MAX_MEMBERS && (
        <button
          onClick={() => setShowMore(!showMore)}
          className='show-more-button'
        >
          {showMore ? "Show Less" : "Show More"}
        </button>
      )}
    </div>
  );
};

export const CastTab = ({
  cast,
  isHidden,
}: {
  cast: CastMember[];
  isHidden: boolean;
}) => {
  const [showMore, setShowMore] = useState(false);
  const MAX_MEMBERS = showMore ? cast.length : 7;
  // Limit the number of cast members shown
  const limitedCast = cast.slice(0, MAX_MEMBERS);
  return (
    <div className='cast-tab film-tab' hidden={isHidden}>
      {limitedCast.map((member, index) => {
        const src = `${TMDDB_IMAGE_BASE_URL}${member.profile_path}`;
        return (
          <div key={`${member.id}-${index}`} className='tab-group'>
            <div className='tab-left'>
              <RegularImage
                src={src}
                alt={member.name}
                className='profile-image'
                isHidden={isHidden}
              />
              <h3>{member.name}</h3>
              <span>....................................................</span>
            </div>
            <div className='cast-member tab-member'>
              <div className='member-info '>
                <p>{member.character}</p>
              </div>
            </div>
          </div>
        );
      })}
      {limitedCast.length >= MAX_MEMBERS && (
        <button
          onClick={() => setShowMore(!showMore)}
          className='show-more-button'
        >
          {showMore ? "Show Less" : "Show More"}
        </button>
      )}
    </div>
  );
};

export const DetailsTab = ({
  productionCompanies,
  productionCountries,
  spokenLanguages,
  isHidden,
}: {
  productionCompanies: string[];
  productionCountries: string[];
  spokenLanguages: string[];
  isHidden: boolean;
}) => {
  return (
    <div className='details-tab film-tab' hidden={isHidden}>
      <div className='tab-group'>
        <div className='tab-left'>
          <h3>Production Companies</h3>
          <span>...................................................</span>
        </div>
        <div className='tab-list'>
          {productionCompanies.map((company) => (
            <div className='tab-member' key={company}>
              <p>{company}</p>
            </div>
          ))}
        </div>
      </div>
      <div className='tab-group'>
        <div className='tab-left'>
          <h3>Production Countries</h3>
          <span>........................................................</span>
        </div>
        <div className='tab-list'>
          {productionCountries.map((country) => (
            <div className='tab-member' key={country}>
              <p>{country}</p>
            </div>
          ))}
        </div>
      </div>
      <div className='tab-group'>
        <div className='tab-left'>
          <h3>Spoken Languages</h3>
          <span>....................................................</span>
        </div>
        <div className='tab-list'>
          {spokenLanguages.map((language) => (
            <div className='tab-member' key={language}>
              <p>{language}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const GenresTab = ({
  genres,
  isHidden,
}: {
  genres: string[];
  isHidden: boolean;
}) => {
  return (
    <div className={"genres-tab film-tab"} hidden={isHidden}>
      <div className='tab-group'>
        <div className='tab-left'>
          <h3>Genres</h3>
          <span>....................................................</span>
        </div>
        <div className='tab-list'>
          {genres.map((genre) => (
            <div className='tab-member' key={genre}>
              <p>{genre}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default function Tabs({
  essentialData,
  currentTab,
}: {
  essentialData: EssentialData;
  currentTab: string;
}) {
  return (
    <div className='tabs'>
      <CastTab cast={essentialData.cast} isHidden={currentTab !== "cast"} />
      <CrewTab crew={essentialData.crew} isHidden={currentTab !== "crew"} />
      <DetailsTab
        productionCompanies={essentialData.production_companies}
        productionCountries={essentialData.production_countries}
        spokenLanguages={essentialData.spoken_languages}
        isHidden={currentTab !== "details"}
      />
      <GenresTab
        genres={essentialData.genres}
        isHidden={currentTab !== "genres"}
      />
    </div>
  );
}
