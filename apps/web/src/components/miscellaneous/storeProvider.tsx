'use client';


import { AppStore, makeStore } from '@/app/store';
import { useRef } from 'react';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';



export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  {
    const storeRef = useRef<AppStore>();
    if (!storeRef.current) {
      storeRef.current = makeStore();
    }

    return (
      <Provider store={storeRef.current}>
        <PersistGate
          persistor={persistStore(storeRef.current)}
        >
          {children}
        </PersistGate>
      </Provider>
    );
  }
}
