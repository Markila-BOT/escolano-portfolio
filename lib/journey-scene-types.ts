export type JourneyActivity =
  "study" | "code" | "celebrate" | "travel" | "learn" | "collaborate" | "guide";

export type JourneySceneDescriptor = {
  setting: "campus" | "office" | "terminal" | "training" | "team";
  activity: JourneyActivity;
  careerStage: "student" | "junior" | "professional" | "senior";
  props:
    | "books"
    | "workstation"
    | "dual-monitors"
    | "laptop"
    | "planning"
    | "luggage";
};
