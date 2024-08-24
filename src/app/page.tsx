import { Link } from "next-view-transitions";
import { buttonVariants } from "@/components/ui/button";

export default function Home() {
  return (
    <>
      <Link href={"/payment"} className={buttonVariants()}>
        Go to Payment
      </Link>
    </>
  );
}
