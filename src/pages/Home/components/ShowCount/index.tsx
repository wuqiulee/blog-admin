import React, { useEffect, useState } from 'react';
import Styles from './index.module.scss';
import { getArticleList } from '@/api/article';
import { getSayList } from '@/api/say';
import { ShowCountType } from '@/interface/home';

const ShowCount: React.FC = () => {
  const [count, setCount] = useState<ShowCountType>({ articleCount: 0, sayCount: 0 });

  const init = async () => {
    const { data: articleData } = await getArticleList();
    const { data: sayDate } = await getSayList();
    setCount({
      articleCount: articleData.total,
      sayCount: sayDate.total,
    });
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <div className={Styles.wrapper}>
      <div>
        <span>文章数</span>
        <span className={Styles.count}>{count.articleCount}</span>
      </div>
      <div>
        <span>说说数</span>
        <span className={Styles.count}>{count.sayCount}</span>
      </div>
      <div>
        <span>说说数</span>
        <span className={Styles.count}>{count.sayCount}</span>
      </div>
    </div>
  );
};

export default ShowCount;
