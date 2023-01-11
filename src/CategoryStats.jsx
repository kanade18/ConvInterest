function CategoryStats({ subscribedTo, stats, onCategoryChange }) {
  function isSubscribedToCategory(category){
    return subscribedTo !== undefined && Array.isArray(subscribedTo) && subscribedTo.includes(category)
  }

  return (
    <div className="category__stats__container">
      <h3>Whats trending??</h3>
      <ul className="category__stats__list">
        { Object.keys(stats).map( categoryItem => (
          isSubscribedToCategory(categoryItem) && 
          <li className="category__stats__item" key={categoryItem}>
            <a href="#" className="change__interest__button" onClick={ (e) => { e.preventDefault(); onCategoryChange(categoryItem); }}>{categoryItem.toUpperCase()}</a>
            <label>{stats[categoryItem]}</label>
          </li>
        ))}
      </ul>
    </div>
);
}

export default CategoryStats;
