import { CATEGORY } from './constants';
import AddInterestItem from './AddInterestItem';

function AddInterestForm({ subscribedTo, onToggleInterest }) {
  function isSubscribedToCategory(category){
    return subscribedTo !== undefined && Array.isArray(subscribedTo) && subscribedTo.includes(category)
  }
  return (
    <div className="interests__form">
      <h3>Manage Interests</h3>
      <ul className="interests__form__list">
        { Object.values(CATEGORY).map( categoryItem => (
          <li className="interests__form__item" key={categoryItem}>
            <AddInterestItem category={categoryItem} isSubscribed={isSubscribedToCategory(categoryItem)} onToggleInterest={onToggleInterest}/>
          </li>
        ))}
      </ul> 
    </div>
);
}

export default AddInterestForm;
