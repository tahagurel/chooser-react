import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import categoryReducer from './slices/categorySlice';
import itemReducer from './slices/itemSlice';
import comparisonReducer from './slices/comparisonSlice';
import userReducer from './slices/userSlice';
import searchReducer from './slices/searchSlice';

export default configureStore({
  reducer: {
    auth: authReducer,
    category: categoryReducer,
    item: itemReducer,
    comparison: comparisonReducer,
    user: userReducer,
    search: searchReducer,
  },
});
