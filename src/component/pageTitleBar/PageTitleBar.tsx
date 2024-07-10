import { FC } from "react";

interface pageTitleBarProps {
  title: string;
}
const PageTitleBar: FC<pageTitleBarProps> = ({ title }) => {
  return (
    <div className="flex-row w-full text-3xl bg-gray-900 text-white p-4 flex items-center justify-between border-b  border-l border-l-white">
         <div>{title}</div>
         <div>RK</div>
    </div>
  );
};
export default PageTitleBar;