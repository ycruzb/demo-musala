import Head from "next/head";
import fetch from "isomorphic-unfetch";
import Link from "next/link";

// This gets called on every request
export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch(`http://localhost:3000/api/gateways`);
  const data = await res.json();

  // Pass data to the page via props
  return { props: { data } };
}

function Home({ data }) {
  return (
    <>
      <Head>
        <title>Demo for MusalaSoft</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="pt-8 grid grid-flow-row grid-cols-1 gap-4 py-10 px-6 ">
        {data.gateways.length > 0 ? (
          <>
            {data.gateways.map((item, index) => (
              <Link href={`/gateway/${item._id}`} key={index}>
                <a>
                  <div className="bg-gray-200 p-5 mb-3 flex justify-between align-middle rounded hover:bg-gray-300 hover:shadow-md transform hover:-translate-y-1 transition ease-out duration-200">
                    <div>
                      <strong>{item.name}</strong> - {item.serial} @ {item.ipv4}
                    </div>
                    <div>
                      <span className="bg-black text-white rounded py-1 px-2 text-xs inline">
                        {item.devices.length}
                      </span>
                    </div>
                  </div>
                </a>
              </Link>
            ))}
          </>
        ) : (
          <>
            <p className="text-center py-4 text-xl">There are no gateways!</p>
            <p className="text-center">
              You can add Gateways just making click wherever you see this icon
              <br />
              <Link href="/gateway/add">
                <a>
                  <img
                    className="w-20 inline-block py-6"
                    src="/add-to-list.svg"
                    alt=""
                  />
                </a>
              </Link>
            </p>
          </>
        )}
      </div>
    </>
  );
}

export default Home;
