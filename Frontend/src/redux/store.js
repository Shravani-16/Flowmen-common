import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import filterReducer from "./filterSlice";
import dateReducer from "./dateSlice";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import { FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';

const persistConfig = {
    key: 'root',
    storage,
}

const rootReducer = combineReducers({
    auth: authReducer,
    filter: filterReducer,
    datePicker:dateReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

export const persistor = persistStore(store);
export default store;
