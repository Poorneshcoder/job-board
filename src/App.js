
import { useEffect, useState } from 'react';
import './App.css';
import JobPosting from './component/jobPosting';


const items_per_page = 6;
const api = "https://hacker-news.firebaseio.com/v0";

function App() {
   const [item, setItem] = useState([]);
  const [itemIds, setItemIds] = useState(null);
  const [fetchDetails, setFetchDetails] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);

  const fetchItems = async (currPage) => {
    setCurrentPage(currPage);
    setFetchDetails(true);

    let itemsList = itemIds;
    if (itemsList === null) {
      const response = await fetch(`${api}/jobstories.json`);
      itemsList = await response.json();
      setItemIds(itemsList);
    }
    const itemIdsForPage = itemsList.slice(
      currPage * items_per_page,
      currPage * items_per_page + items_per_page
    );
    const itemsForPage = await Promise.all(
      itemIdsForPage.map((itemId) =>
        fetch(`${api}/item/${itemId}.json`).then((res) => res.json())
      )
    );
    setItem([...item, ...itemsForPage]);
    setFetchDetails(false);
  };

  useEffect(() => {
    if (currentPage === 0) fetchItems(currentPage);
  }, []);
  return (
       <div className="App">
      <h1 className="title">Job Board</h1>
      {itemIds === null || item.length < 1 ? (
        <p className="loading">loading...</p>
      ) : (
        <div>
          <div className="items" role="list">
            {item.map((item) => {
              return <JobPosting key={item.id} {...item} />;
            })}
          </div>
          <button
            className="load-more-button"
            onClick={() => fetchItems(currentPage + 1)}
            disabled={fetchDetails}
          >
            {fetchDetails ? "Loading..." : "load more jobs"}
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
