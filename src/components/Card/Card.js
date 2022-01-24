import './Card.css';


const Card = ({ title, descr, rules, img_url }) => {
  return (
    <div className='card'>
      <img src={img_url} alt='todo' />
      <div className='card-content'>
        <h4>{title}</h4>
        <p>{descr}</p>
        <ul>
          {rules.map((rule, i) => <li key={i}>{rule}</li>)}
        </ul>
      </div>
    </div>
  );
};

export default Card;