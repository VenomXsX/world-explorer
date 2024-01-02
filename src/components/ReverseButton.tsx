import { ArrowDownAZ, ArrowUpAZ } from "lucide-react";

interface Props {
  handler: () => void;
  reversed: boolean;
}

export default function ReverseButton({ handler, reversed }: Props) {
  return (
    <button
      type="button"
      className="h-12 w-12 text-secondary flex flex-row items-center justify-center rounded-md bg-transparent hover:bg-white/10 hover:-skew-x-6 backdrop-blur-md duration-300"
      onClick={handler}
    >
      {!reversed ? <ArrowDownAZ /> : <ArrowUpAZ />}
    </button>
  );
}
