import { CATEGORY } from "./constants";
function AddInterestItem({ category, isSubscribed, onToggleInterest }) {

  return (
    <div> 
      <form className="add__interest__form" action="#/add">
        <label>{category.toUpperCase()}</label>
        {category != CATEGORY.GENERAL 
        && <button type="submit" onClick={ (e) => { e.preventDefault(); onToggleInterest(category); } } 
          className={`add__interest__button${isSubscribed ? ' add__interest__button__red' : ''} `}>
          { isSubscribed ? ' x ' : ' + '}
          </button>
        }
      </form>
    </div>
  );
}

export default AddInterestItem;
