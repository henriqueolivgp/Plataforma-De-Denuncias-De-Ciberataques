import { Datepicker } from 'flowbite-react';
import { useReports } from '../../../../hooks/useReports';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useAuth } from '../../../../hooks/useAuth';
import { useImgs } from '../../../../hooks/useImgs';

function Reports() {

  const { insertReports, setTitle, title, description, setDescription } = useReports();
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const { inertReportImage } = useImgs();
 
  const insertForm = async (e: FormEvent<HTMLFormElement>) => {
    await insertReports(e)
  }
  const insertReportImg = async (e: ChangeEvent<HTMLInputElement>) => {
    await inertReportImage(e)
  }

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      setLoading(false)
    };

    fetchData();
  }, [user]);

  if (loading || !user) {
    return <p>Carregando...</p>;
  }

  return (
    <>

      <form onSubmit={insertForm} className="">
        <h1 className="mb-2 text-[1.75rem] text-center font-semibold text-dark"> Insert a new Report</h1>

        <div className="flex flex-row mb-6 mt-4">
          <div className="flex flex-col mr-4 flex-1">
            <label htmlFor="tilte" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
            <input
              value={title}
              type="tilte"
              id="tilte"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Title..."
              onChange={(e) => setTitle(e.target.value)}
              required />
          </div>
          <div className="flex flex-col flex-1">
            <label htmlFor="datepicker" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Date</label>
            <Datepicker
              className=''
              required />
          </div>
        </div>

        <div className="flex items-center justify-center w-full">
          <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
              </svg>
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
            </div>
            <input
              onChange={(e) => {
                insertReportImg(e); // 👈 this will trigger when user selects the file.
              }}
              id="dropzone-file"
              type="file"
              className="hidden" />
          </label>
        </div>

        <div className="relative max-w-sm">

        </div>

        <div className="mt-4">
          <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            id="message"
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Write your thoughts here..."></textarea>
        </div>
        <div className="mt-4">
          <div className="mb-6">
            <label htmlFor="selectbox" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Topic</label>
            <select id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
              <option selected>Default</option>
              <option value="US">United States</option>
              <option value="CA">Canada</option>
              <option value="FR">France</option>
              <option value="DE">Germany</option>
            </select>

          </div>
        </div>

        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
      </form>


    </>
  )
}

export default Reports;