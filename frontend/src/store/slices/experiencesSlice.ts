import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "@/lib/axios";
import { experiences as mock } from "@/lib/mockExperiences";

export type Experience = {
  _id?: string;
  id: string;
  title: string;
  location: string;
  price: number;
  image: string;
  description?: string;
  duration?: string;
  difficulty?: string;
  rating?: number;
  reviews?: number;
};

type State = {
  items: Experience[];
  filteredItems: Experience[];
  selected?: Experience | null;
  loading: boolean;
  error?: string | null;
  searchQuery: string;
  initialized: boolean; 
};

const initialState: State = {
  items: [],
  filteredItems: [],
  selected: null,
  loading: false,
  error: null,
  searchQuery: "",
  initialized: false, 
};

export const fetchExperiences = createAsyncThunk(
  "experiences/fetch",
  async (searchQuery?: string) => {
    try {
      const params = searchQuery ? { search: searchQuery } : {};
      const res = await api.get("/experiences", { params });
      
      if (res.data && Array.isArray(res.data) && res.data.length > 0) {
        return res.data;
      } else {
        console.warn("API returned empty data, using mock data");
        if (searchQuery) {
          const query = searchQuery.toLowerCase();
          return mock.filter(
            (exp) =>
              exp.title.toLowerCase().includes(query) ||
              exp.description?.toLowerCase().includes(query) ||
              exp.location.toLowerCase().includes(query)
          );
        }
        return mock;
      }
    } catch (err) {
      console.warn(" API failed, using mock data", err);
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return mock.filter(
          (exp) =>
            exp.title.toLowerCase().includes(query) ||
            exp.description?.toLowerCase().includes(query) ||
            exp.location.toLowerCase().includes(query)
        );
      }
      return mock;
    }
  }
);

export const fetchExperienceById = createAsyncThunk(
  "experiences/fetchById",
  async (id: string) => {
    try {
      const res = await api.get(`/experiences/${id}`);
      return res.data;
    } catch (err) {
      console.warn(" API failed, checking mock data");
      const mockExp = mock.find((m) => m.id === id);
      if (mockExp) return mockExp;
      throw new Error("Experience not found");
    }
  }
);

const slice = createSlice({
  name: "experiences",
  initialState,
  reducers: {
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
      if (action.payload) {
        const query = action.payload.toLowerCase();
        state.filteredItems = state.items.filter(
          (exp) =>
            exp.title.toLowerCase().includes(query) ||
            exp.description?.toLowerCase().includes(query) ||
            exp.location.toLowerCase().includes(query)
        );
      } else {
        state.filteredItems = state.items;
      }
    },
    clearSearch: (state) => {
      state.searchQuery = "";
      state.filteredItems = state.items;
    },
    resetExperiences: (state) => {
      state.items = [];
      state.filteredItems = [];
      state.searchQuery = "";
      state.initialized = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchExperiences.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchExperiences.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
        state.filteredItems = action.payload;
        state.initialized = true; 
        state.error = null;
      })
      .addCase(fetchExperiences.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to load experiences";
        state.items = mock;
        state.filteredItems = mock;
        state.initialized = true;
      })
      .addCase(fetchExperienceById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchExperienceById.fulfilled, (state, action) => {
        state.loading = false;
        state.selected = action.payload;
        state.error = null;
      })
      .addCase(fetchExperienceById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to load experience";
      });
  },
});

export const { setSearchQuery, clearSearch, resetExperiences } = slice.actions;
export default slice.reducer;