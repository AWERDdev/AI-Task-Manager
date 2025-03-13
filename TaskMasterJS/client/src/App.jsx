import "./App.css";
import NavBar from "./Components/NavBar";
import SideBar from "./Components/SideBar";

function App() {
  return (
    <main>
      <header>
        <NavBar />
      </header>

      <section className="SideBar absolute h-full w-[70%] shadow-lg   top-0 left-0 ">
        <SideBar/>
        </section>
      <section className="SectionOne"></section>
      <section className="SectionTwo-Cards"></section>
      <section className="SectionThree"></section>
    </main>
  );
}

export default App;
