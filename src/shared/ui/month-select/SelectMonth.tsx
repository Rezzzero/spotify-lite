import { MONTHS } from "../../constants/constants";
import selectIcon from "../../assets/select-icon.svg";

export const SelectMonth = ({
  selectMonth,
  selectBlured,
  needToSelect,
  onBlur,
  stepError,
}: {
  selectMonth: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  selectBlured: boolean;
  needToSelect: boolean;
  onBlur: () => void;
  stepError: boolean;
}) => {
  return (
    <div className="flex w-full relative">
      <select
        onBlur={onBlur}
        onChange={selectMonth}
        className={`appearance-none w-full pl-3 pr-5 mt-1 h-[50px] rounded-sm border ${
          (selectBlured && needToSelect) || stepError
            ? "border-red-500"
            : "border-zinc-500 hover:border-white focus:border-white focus:shadow-[0_0_0_1px_white]"
        }`}
      >
        <option value={0} className="bg-zinc-900">
          Месяц
        </option>
        {MONTHS.map((month, index) => (
          <option key={month} value={index + 1} className="bg-zinc-900">
            {month}
          </option>
        ))}
      </select>
      <img
        src={selectIcon}
        alt="select icon"
        className="absolute right-4 top-6 pointer-events-none"
      />
    </div>
  );
};
