import MainContainer from "./components/containers/MainContainer";
import "./index.css";

function App() {
  return (
    <div className="flex min-h-screen w-screen flex-col items-center justify-center text-white">
      <main className="flex h-full w-full items-center justify-center">
        <MainContainer />
      </main>
    </div>
  );
}

export default App;
