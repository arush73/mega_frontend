import { create } from "zustand"

export const useTeamStore = create((set, get) => ({
  teams: [],
  selectedTeam: null,

  setTeams: (teams) => {
    set({ teams: teams || [] })
  },

  setSelectedTeam: (team) => {
    set({ selectedTeam: team })
  },

  clearTeams: () => {
    set({ teams: [], selectedTeam: null })
  },
}))
