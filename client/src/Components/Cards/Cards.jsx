import './Cards.css';
import Card from '../Card/Card';


function Cards({allDogs}) {

  const dogsList = allDogs
  return (
    <div className='cards'>
      {dogsList?.map(dog =>
        <Card dog ={dog} />)}
    </div>
  )

}

export default Cards;