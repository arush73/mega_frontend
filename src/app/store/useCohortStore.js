import { create } from "zustand"

export const useCohortStore = create((set, get) => ({
  cohorts: [],
  selectedCohort: null,

  setCohorts: (cohorts) => {
    set({ cohorts: cohorts || [] })
  },

  setSelectedCohort: (cohort) => {
    set({ selectedCohort: cohort })
  },

  clearCohorts: () => {
    set({ cohorts: [], selectedCohort: null })
  },
}))
