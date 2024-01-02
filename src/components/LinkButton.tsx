import Link from "next/link";

interface Props {
  link: string;
  label: string;
  className?: string;
}

export default function LinkButton({ link, label, className }: Props) {
  return (
    <Link
      href={link}
      className={`m-4 p-4 gap-5 text-secondary flex flex-row rounded-md bg-transparent hover:bg-white/10  backdrop-blur-md duration-300 ${className}`}
    >
      {label}
    </Link>
  );
}
