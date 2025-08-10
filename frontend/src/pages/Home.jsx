import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { Main } from "../components/Main";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <Main />
      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
}
