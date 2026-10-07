import { experiencesData, experienceJourneyScenes } from "@/lib/data";
import type { JourneySceneDescriptor } from "@/lib/journey-scene-types";

export type JourneyLeg = "start" | "walk" | "flight";

export type JourneyStop = {
  title: string;
  location: string;
  description: string;
  date: string;
  country: string;
  leg: JourneyLeg;
  tags: readonly string[];
  scene: JourneySceneDescriptor;
};

const fallbackScene: JourneySceneDescriptor = {
  setting: "office",
  activity: "code",
  careerStage: "professional",
  props: "workstation",
};

export function sceneForExperience(title: string): JourneySceneDescriptor {
  return (
    experienceJourneyScenes.find((scene) => scene.title === title)?.visual ??
    fallbackScene
  );
}

export function journeyTravelMode(
  from: Pick<JourneyStop, "country">,
  to: Pick<JourneyStop, "country">,
): "walk" | "flight" {
  return from.country === to.country ? "walk" : "flight";
}

function tagsOf(entry: (typeof experiencesData)[number]): readonly string[] {
  if (!("tags" in entry)) {
    return [];
  }

  return entry.tags;
}

function countryOf(location: string) {
  const comma = location.lastIndexOf(",");
  if (comma === -1) {
    return location.trim();
  }

  return location.slice(comma + 1).trim();
}

export function buildExperienceJourney(): JourneyStop[] {
  const chronological = [...experiencesData].reverse();

  return chronological.map((entry, index) => {
    const country = countryOf(entry.location);
    const previous = chronological[index - 1];
    const previousCountry =
      previous === undefined ? country : countryOf(previous.location);

    let leg: JourneyLeg = "start";
    if (previous !== undefined) {
      leg = previousCountry === country ? "walk" : "flight";
    }

    return {
      title: entry.title,
      location: entry.location,
      description: entry.description,
      date: entry.date,
      country,
      leg,
      tags: tagsOf(entry),
      scene: sceneForExperience(entry.title),
    };
  });
}
