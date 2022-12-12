import Image from "next/image";

import LinkButton from "./components/LinkButton";

export default function HomePage() {
  return (
    <div className="container flex flex-col justify-center h-screen mx-auto -mt-20 place-items-center">
      <div className="flex items-center justify-center pt-3 pb-3">
        <a
          href="https://oss.deltares.nl/web/xbeach/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src="https://oss.deltares.nl/image/layout_set_logo?img_id=4177670&amp;t=1663572973403"
            alt="XBeach logo"
            width={75}
            height={75}
            style={{ marginRight: 10 }}
          />
        </a>
        <h1 className="text-4xl font-bold text-center text-blue-800">
          {"XBeach UI"}
        </h1>
      </div>
      <div className="container max-w-2xl pb-4 mx-auto">
        <h3 className="mb-4 text-3xl font-bold text-center">
          {"Quality of life tools for XBeach"}
        </h3>
        <p className="text-md">
          {
            "This project is not affiliated with Deltares or XBeach in any way. It is a community project to make XBeach more accessible to the general public. If you would like to contribute, feel free to check out the repository on "
          }
          <a
            href="https://github.com/Seth-McKilla/xbeach-ui"
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold text-blue-800"
          >
            {"GitHub."}
          </a>
        </p>
      </div>
    </div>
  );
}
