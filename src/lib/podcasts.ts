import type { GeneratedPodcast } from "../types";

export type MilestoneEpisode = Omit<GeneratedPodcast, "id" | "createdAt">;

export function toPodcast(episode: MilestoneEpisode): GeneratedPodcast {
  return { ...episode, id: `milestone-${episode.milestone}`, createdAt: "" };
}
