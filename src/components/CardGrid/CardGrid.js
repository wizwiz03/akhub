import { Link } from 'react-router-dom';

import Card from '../Card/Card';

import './CardGrid.css';

const CardGrid = ({ data_list, images }) => {
  return (
    <div className='grid-container'>
      {
        data_list.map((data, i) => (
          <Link to={`/games/${data.sub}`} key={i}>
            <Card title={data.title} descr={data.descr} rules={data.rules} img_url={images[data.img]} />
          </Link>
        ))
      }
    </div>
  );
};

export default CardGrid;