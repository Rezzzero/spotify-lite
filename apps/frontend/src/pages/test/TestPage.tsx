import { Table } from "@shared/ui/table/Table";
import { SoundCloudSearch } from "@widgets/sound-cloud-test/SoundCloud";

const TestPage = () => {
  return (
    <div className="flex flex-col gap-10 w-full">
      <SoundCloudSearch />
      <Table />
    </div>
  );
};

export default TestPage;
