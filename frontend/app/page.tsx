import Link from "next/link";
import { IoArrowForwardCircleOutline } from "react-icons/io5";

export default function Home() {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1>Welcome to Crib Commerce</h1>
        <h2>Find your dream home with ease.</h2>
        <Link href="/listings">
          <span>View listings</span>
          <IoArrowForwardCircleOutline />
        </Link>
      </div>
    </section>
  );
}
