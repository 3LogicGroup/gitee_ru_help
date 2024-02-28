import React from 'react';
import Indexpage from '../modules/indexpage';
import withQueryClientProvider from '../components/withQueryClientProvider';
import { UserContextProvider } from '../context/UserContext';
import "meilisearch-docsearch/css";
import '../css/gitee-ui.less';

function Index() {
  return withQueryClientProvider(
    <UserContextProvider>
      <Indexpage />
    </UserContextProvider>,
  );
}
export default Index;
