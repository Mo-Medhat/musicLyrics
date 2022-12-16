import { Route, Routes } from "react-router-dom";
import "./App.css";
import TopArtists from "./Pages/TopArtists";
import TopCharts from "./Pages/TopCharts";
import Discover from "./Pages/Discover";
import AroundYou from "./Pages/AroundYou";
import ArtistDetails from "./Pages/ArtistDetails";
import SongDetails from "./Pages/SongDetails";
import Search from "./Pages/Search";
import Sidebar from "./Components/Sidebar";
import Searchbar from "./Components/Searchbar";
import TopPlay from "./Components/TopPlay";
import ErrorLost from "./Pages/ErrorLost";

function App() {
  return (
    <>
      <section className="relative flex">
        <Sidebar />
        <div className="flex-1 flex flex-col bg-gradient-to-br from-black to-[#121286]">
          <Searchbar />
          <div className="px-6 h-[calc(100vh-72px)] overflow-y-scroll hide-scrollbar flex xl:flex-row flex-col-reverse">
            <div className="flex-1 h-fit pb-40">
              <Routes>
                <Route path="/" element={<Discover />} />
                <Route path="/musicLyrics" element={<Discover />} />
                <Route path="/top-artists" element={<TopArtists />} />
                <Route path="/top-charts" element={<TopCharts />} />
                <Route path="/around-you" element={<AroundYou />} />
                <Route path="/artists/:id" element={<ArtistDetails />} />
                <Route path="/songs/:songid" element={<SongDetails />} />
                <Route path="/search/:searchTerm" element={<Search />} />
                <Route path="*" element={ <ErrorLost/> } />
              </Routes>
            </div>
            <div className="xl:sticky relative top-0 h-fit">
              <TopPlay />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default App;
