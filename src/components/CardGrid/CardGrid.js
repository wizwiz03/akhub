import Card from '../Card/Card';

import './CardGrid.css';

const CardGrid = ({ data_list, images }) => {
  return (
    <div className='grid-container'>
      {data_list.map((data, i) => <Card key={i} title={data.title} descr={data.descr} rules={data.rules} img_url={images[data.img]}/>)}
    </div>  
  );
};

export default CardGrid;