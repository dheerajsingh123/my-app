import { useState, useEffect } from 'react';

import logo from './logo.svg';
import './App.css';

function App() {
  const [ apiData, setApiData ] = useState(null);
  const [ pagesArray, setPagesArray ] = useState([]);
  const [ loading, setLoading ] = useState(false);

  useEffect(() => {
    getApiData(1);
  }, []);

  const getApiData = (page) => {
    setLoading(true);

    fetch(`https://reqres.in/api/users?page=${page}&delay=3`, {
      method: 'GET',
      headers: {
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache',
        'Expires': '0',
      }
    })
    .then(response => response.json())
    .then(data => {
      setLoading(false);
      setApiData(data);
      let arr = new Array(data.total_pages).fill('Page');
      setPagesArray(arr);

    }).catch(error => {
      setLoading(false);
      console.log(error);
    });
  }

  return (
    <div className="App">
      <header className="App-header">
        <div className="mainContainer">
          <h1>People Dashboard</h1>
          {
            loading ? <div className="loading">Loading...</div> :
            apiData?.data?.map(item => {
              return (
                <div className='personCard'>
                  <div key={item.id}><img src={item.avatar} alt={item.first_name} /></div>
                  <div className='personDetails'>
                    <div className="personName">{item.first_name + ' ' + item.last_name}</div>
                    <div className="personEmail">{item.email}</div>
                  </div>
                </div>
              )
            })
          }
          <div className='pageContainer'>
            {
              pagesArray?.map((item, index) => {
                return (
                  <div className="pageLink" key={index} onClick={() => {getApiData(index + 1)}}>{(index + 1)}</div>
                )
              })
            }
          </div>
        </div>
        <a
          className="App-link"
          href="https://reqres.in/#support-heading"
          target="_blank"
          rel="noopener noreferrer"
        >
          To keep ReqRes free, contributions towards server costs are appreciated!
        </a>
      </header>
    </div>
  );
}

export default App;
