import axios from "axios";
import { PageLayout } from "@shared/ui/page-layout/PageLayout";
import { SoundCloudSearch } from "@widgets/sound-cloud-test/SoundCloud";
import { API_URL } from "@shared/constants/constants";

const TestPage = () => {
  const albumId = "20YkqA8ivmBOheN4QGjp1V";
  const handleAddAlbum = async () => {
    try {
      const resonse = await axios.post(`${API_URL}/test-add-album/${albumId}`);
      console.log(resonse);
    } catch {
      console.log("error adding album to supabase");
    }
  };

  return (
    <PageLayout>
      <SoundCloudSearch />
      <div>
        <button
          type="button"
          onClick={handleAddAlbum}
          className="bg-white px-5 py-2 rounded-full font-bold text-black hover:bg-gray-100 hover:scale-105 cursor-pointer"
        >
          Add Album to Supabase
        </button>
      </div>
    </PageLayout>
  );
};

export default TestPage;
