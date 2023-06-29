import { useEffect, useMemo, useState } from 'react';
import './App.css';
import { CircularProgress, ImageList, ImageListItem, ImageListItemBar, Typography } from '@mui/material';
import { Photo } from './IPhoto';
import axios from 'axios';



const App = () => {
  const [itemData, setItemData] = useState<Photo[]>([])
  const [queryParam, setQueryParam] = useState<string|null>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isFirstRender, setIsFirstRender] = useState<boolean>(true);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const paramValue = urlParams.get("albumId");
    setQueryParam(paramValue);
    setIsFirstRender(false);
  }, []);

  useEffect(() => {
    async function fetchData() {
      if(queryParam === undefined) return;
      setIsLoading(true);
      const apiQuery = queryParam ? `?albumId=${queryParam}` : '';
      const json = await axios.get(`https://jsonplaceholder.typicode.com/photos${apiQuery}`);
      setItemData(json.data);
      setIsLoading(false);
    }
    fetchData();
  }, [queryParam]);

  const renderImages = useMemo(() => {
    return itemData.length > 0 ? (
      itemData.map((item) => (
        <ImageListItem key={item.id}>
          <img src={`${item.url}`} alt={item.title} loading="lazy" />
        </ImageListItem>
      ))
    ) : 
      isLoading || isFirstRender ? <CircularProgress color='primary'/> : <Typography variant="h3" component="h4">No images found</Typography>
  }, [itemData]);
  
  return (
    <div className="App">
      <Typography variant="h1" component="h2">
        Photo Album Showcase
      </Typography>
      {queryParam && <Typography variant="h2" component="h3">Album ID: {queryParam}</Typography>}
      <ImageList sx={{ width: '50vw', height: '80vh' }} cols={3}>
        {renderImages}
      </ImageList>
    </div>
  );
}

export default App;
