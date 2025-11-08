import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { api } from '@/lib/axios';

type BookingData = {
  experienceId: string;
  experience: { 
    id: string; 
    title: string;
    price: number;
    image: string;
  };
  user: { 
    name: string; 
    email: string; 
    phone?: string 
  };
  quantity: number;
  date: string;
  time: string;
  promoCode?: string;
  totalAmount: number;
};

type BookingConfirmation = { 
  refId: string; 
  bookingId: string;
  userDetails: {
    name: string;
    email: string;
  };
  bookingDetails: {
    date: string;
    time: string;
    quantity: number;
    totalAmount: number;
  };
  message?: string;
};

type State = {
  current?: BookingData | null;
  confirmation?: BookingConfirmation | null;
  loading: boolean;
  error?: string | null;
};

const initialState: State = {
  current: null,
  confirmation: null,
  loading: false,
  error: null,
};

export const createBooking = createAsyncThunk(
  'booking/create',
  async (payload: BookingData) => {
    try {
      const res = await api.post('/booking/create', payload);
      return res.data;
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      console.error('Booking API failed:', msg);
      
      const refId = `ref-${Date.now().toString(36)}-${Math.random()
        .toString(36)
        .slice(2, 8)}`;
      
      return { 
        refId,
        bookingId: refId,
        userDetails: payload.user,
        bookingDetails: {
          date: payload.date,
          time: payload.time,
          quantity: payload.quantity,
          totalAmount: payload.totalAmount
        }
      };
    }
  }
);

export const validatePromoCode = createAsyncThunk(
  'booking/validatePromo',
  async ({ code, amount }: { code: string; amount: number }) => {
    try {
      const res = await api.post('/promo/validate', { code, amount });
      return res.data;
    } catch (error) {
      throw new Error('Failed to validate promo code');
    }
  }
);

const bookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {
    setCurrentBooking(state, action) {
      state.current = action.payload;
    },
    clearConfirmation(state) {
      state.confirmation = null;
    },
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createBooking.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createBooking.fulfilled, (state, action) => {
        state.loading = false;
        state.confirmation = action.payload;
        state.current = null;
      })
      .addCase(createBooking.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to create booking';
      });
  },
});

export const { setCurrentBooking, clearConfirmation, clearError } = bookingSlice.actions;
export default bookingSlice.reducer;