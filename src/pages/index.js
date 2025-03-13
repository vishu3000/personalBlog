import NavigationBar from "@/components/NavigationBar";
import BlogHub from "@/components/BlogHub";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="h-screen">
      <NavigationBar />
      <BlogHub />
      <Footer />
    </div>
  );
}
