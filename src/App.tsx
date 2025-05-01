import axios from "axios";

function App() {
  axios.get("http://localhost:3000/api/token").then((res) => {
    console.log(res.data);
  });

  return <>hello spotify lite</>;
}

export default App;
