import CreateTweet from './CreateTweet';
import TweetList from './TweetList';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';

const Layout = () => {
  return (
    <>
      <h1>tweets dude</h1>
      <TweetList />
      <CreateTweet/>
    </>
  )
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    loader: async ({request})=>{
      return fetch('/api/tweets');
    },
    action: async ({request})=>{
      let tweet = await request.formData();
      return tweet
    }
  }
]);

function App() {
  return (
    <>
      <RouterProvider router={router}/>
    </>
  );
}

export default App;
