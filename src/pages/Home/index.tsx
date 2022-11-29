import React from 'react';
import Header from './components/Header';
import Chart from './components/Chart';
import ShowCount from './components/ShowCount';
import Styles from './index.module.scss';

const Home = () => {
  return (
    <div>
      <Header />
      <div className={Styles.wrapper}>
        <Chart />
        <ShowCount />
      </div>
    </div>
  );
};

export default Home;
