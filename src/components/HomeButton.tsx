import { useRouter } from "next/navigation";

export default function HomeButton() {
  const router = useRouter();
  return (
    <button
      className="m-4 p-4 gap-5 text-secondary flex flex-row rounded-md bg-transparent hover:bg-white/10 hover:-skew-x-6 backdrop-blur-md duration-300"
      onClick={() => router.push("/")}
    >
      Go back Home
    </button>
  );
}
