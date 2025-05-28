import { MONTHS } from "../../constants/constants";

export const SelectMonth = ({
  selectMonth,
  onBlur,
}: {
  selectMonth: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onBlur: () => void;
}) => {
  return (
    <select
      onBlur={onBlur}
      onChange={selectMonth}
      className="appearance-none pl-1 pr-5 rounded-sm border border-zinc-500 hover:border-white focus:border-white focus:shadow-[0_0_0_1px_white]"
    >
      {MONTHS.map((month, index) => (
        <option key={month} value={index + 1} className="bg-zinc-900">
          {month}
        </option>
      ))}
    </select>
  );
};
