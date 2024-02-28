import React, { useEffect, useRef } from 'react';

const HOST = process.env.MEILISEARCH_HOST || '';
const API_KEY = process.env.MEILISEARCH_API_KEY || '';
const INDEX_UID = process.env.MEILISEARCH_INDEX_UID || '';

const MeiliSearchInput = ({ className }: { className?: string }) => {
  const searchInputRef = useRef(null);
  useEffect(() => {
    import('meilisearch-docsearch').then(({ docsearch }) => {
      docsearch({
        container: searchInputRef.current,
        host: HOST,
        apiKey: API_KEY,
        indexUid: INDEX_UID,
        translations: {
          button: {
            buttonText: '快速搜索问题、主题或关键字...',
            buttonAriaLabel: '快速搜索问题、主题或关键字...',
          },
          modal: {
            selectText: '回车选中',
            selectKeyAriaLabel: '',
            navigateText: '移动',
            navigateUpKeyAriaLabel: '上方向键',
            navigateDownKeyAriaLabel: '下方向键',
            closeText: '关闭',
            closeKeyAriaLabel: '关闭',
            // poweredByText: '请输入 powered by',
            linkToTheResultAriaLabel: '',
            searchDocsPlaceHolder: '快速搜索问题、主题或关键字....',
            resetButtonTitle: '',
            resetButtonAriaLabel: '',
            cancelButtonText: '',
            cancelButtonAriaLabel: '',
          },
        },
      });
    });
  }, []);
  return <div ref={searchInputRef} className={className} />;
};

export default MeiliSearchInput;
