import { useEffect, useState } from "react";
import { useReports } from "../../../hooks/useReports";
import { Loading } from "../../components/Loading";
import { useAuth } from "../../../hooks/useAuth";
import { useImgs } from "../../../hooks/useImgs";
import ExploreSidebar from '../../components/ExploreCompunents/ExploreSidebar'

function Explore() {

  const { getAllReports } = useReports();
  const { getRportImage, } = useImgs();
  const { user } = useAuth();
  const [isLoading, setisLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setisLoading(true);
      await getRportImage();
      await getAllReports();
      setisLoading(false);
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading || !user) {
    return <Loading />;
  }

  return (

    <>
      <div className="container mx-auto flex">
        <div className="flex flex-col content mx-auto ">
          <div className="w-full dark:bg-gray-800 dark:border-gray-700">
            <ExploreSidebar />
          </div>
        </div>
      </div>
  </>
  );
}

export default Explore;
