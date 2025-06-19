import axios from "axios";
import { useState } from "react";
import { API_URL } from "@shared/constants/constants";

export const SoundCloudSearch = () => {
  const [tracks, setTracks] = useState([]);
  const [query, setQuery] = useState("");
  const [audio, setAudio] = useState(null);

  const searchTracks = async () => {
    const res = await axios.get(`${API_URL}/api/soundcloud-search?q=${query}`);
    const data = await res.data;
    setTracks(data.collection);
  };

  const playTrack = async (track) => {
    const streamInfo = track.media.transcodings.find(
      (t) => t.format.protocol === "progressive"
    );
    if (!streamInfo) {
      alert("Этот трек нельзя проиграть");
      return;
    }

    const res = await axios.get(
      `${API_URL}/api/soundcloud-stream?url=${streamInfo.url}`
    );
    const streamData = await res.data;
    console.log(streamData);
    if (audio) {
      audio.pause();
    }
    const newAudio = new Audio(streamData);
    newAudio.play();
    setAudio(newAudio);
  };

  return (
    <div>
      <h2>🔍 SoundCloud поиск</h2>
      <input
        type="text"
        placeholder="Введите название трека..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={searchTracks}>Искать</button>

      <ul>
        {tracks.map((track) => (
          <li key={track.id}>
            {track.title}
            <button onClick={() => playTrack(track)}>▶️ Воспроизвести</button>
          </li>
        ))}
      </ul>
    </div>
  );
};
