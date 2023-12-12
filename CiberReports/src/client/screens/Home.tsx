import Banner from "../components/Banner";
import ImgBack from "../components/ImgBack";

function Home() {

  return (
    <>
      <ImgBack/>
      <Banner/>
      <div className="container mx-auto ">
        <div className="content mx-auto">
          <h1>HomePage</h1>

        </div>
      </div>

    </>
  )
}

export default Home;