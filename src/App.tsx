import React from 'react';
import { useRoutes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import { PersistGate } from 'redux-persist/integration/react';
import routes from '@/router';
import { store, persistor } from '@/store';

const Router: React.FC = () => {
  return <>{useRoutes(routes)}</>;
};

const App: React.FC = () => {
  return (
    <ConfigProvider locale={zhCN}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Router />
        </PersistGate>
      </Provider>
    </ConfigProvider>
  );
};

export default App;
