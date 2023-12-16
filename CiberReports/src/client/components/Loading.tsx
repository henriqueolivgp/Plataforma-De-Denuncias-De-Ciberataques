import { Spinner } from "flowbite-react"

export function Loading() {
    return (
        <div className="container mx-auto flex  text-center justify-center">
            <Spinner className=" fill-bluelite text-gray-400 w-11 h-11" />
        </div>

    )
}