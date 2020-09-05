import Head from "next/head";
import { getAllGatewaysIds, getGatewayData } from "../../lib/gateways";
import Link from "next/link";
import fetch from "isomorphic-unfetch";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import uid from "uid";
import ItemDevice from "../../components/itemDevice";

export default function Gateway({ gatewayData }) {
  const router = useRouter();

  const [formShown, setFormShown] = React.useState(false);

  const [adding, setAdding] = React.useState(false);

  const [devices, setDevices] = React.useState(gatewayData.devices);

  const [errorShow, setErrorShown] = React.useState(false);

  const { handleSubmit, register, errors, reset } = useForm();

  const handleDelete = async (e) => {
    e.preventDefault();

    const res = await fetch(`/api/gateway/delete/${gatewayData._id}`);

    const result = await res.json();

    if (result.result.ok) {
      // Make sure we're in the browser
      if (typeof window !== "undefined") {
        router.push("/");
      }
    }
  };

  const onSubmit = async (data, e) => {
    setAdding(true);

    const device_uid = uid();
    data.uid = device_uid;

    const payload = { gateway_id: gatewayData._id, device: data };

    const res = await fetch("/api/device/add", {
      method: "post",
      body: JSON.stringify(payload),
    });
    //console.log(res);
    setAdding(false);

    if (res.status === 200) {
      let devs = devices;
      devs.push(data);
      setDevices(devs);

      setFormShown(false);
    } else {
      setErrorShown(true);
      setTimeout(() => {
        setErrorShown(false);
      }, 5000);
    }
  };

  const handleDeleteDevice = async (uid) => {
    const payload = { gateway_id: gatewayData._id, device_uid: uid };

    const res = await fetch("/api/device/delete", {
      method: "post",
      body: JSON.stringify(payload),
    });
    //console.log(res);

    if (res.status === 200) {
      const new_devices = devices.filter((item) => item.uid !== uid);
      setDevices(new_devices);
    } else {
      setErrorShown(true);
      setTimeout(() => {
        setErrorShown(false);
      }, 5000);
    }
  };

  return (
    <>
      <Head>
        <title>{gatewayData.name} | Demo for MusalaSoft</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {errorShow && (
        <p className="text-center p-4 my-6 bg-red-700 text-white">
          An error has been occurred! Please, fill the form properly and
          consider that a Gateway can't have more than 10 devices.
        </p>
      )}

      {!formShown && (
        <>
          <div className="flex justify-between">
            <Link href="/">
              <a className="pt-6 pb-4 block px-6">&#8592; Back to Gateways</a>
            </Link>

            <a
              href=""
              onClick={handleDelete}
              className="pt-6 pb-4 px-6 text-red-800 flex flex-row"
            >
              <img
                className="w-4 mr-1 inline-block"
                src="/squared-minus.svg"
                alt=""
              />{" "}
              Delete
            </a>
          </div>

          <h1 className="text-center pb-6 text-3xl px-6">{gatewayData.name}</h1>
          <p className="text-center text-xl flex flex-col md:flex-row md:justify-around px-6">
            <span>
              serial: <strong>{gatewayData.serial}</strong>
            </span>
            <span>
              {" "}
              ipv4: <strong>{gatewayData.ipv4}</strong>
            </span>
          </p>
          {devices.length > 0 ? (
            <>
              <p className="text-center pt-6 pb-4 text-xl px-6">Devices</p>
              {devices.map((device, index) => (
                <ItemDevice
                  key={index}
                  device={device}
                  index={index}
                  handleDeleteDevice={handleDeleteDevice}
                />
              ))}
            </>
          ) : (
            <>
              <p className="text-center pt-6 pb-4 text-xl">
                There are no devices
              </p>
            </>
          )}
          {devices.length < 10 && (
            <p className="text-center my-4">
              <button
                onClick={() => setFormShown(true)}
                className="bg-gray-800 text-gray-100 px-8 py-2 mt-6 rounded hover:bg-gray-900 transition ease-out duration-200"
              >
                Add a Device
              </button>
            </p>
          )}
        </>
      )}

      {formShown && (
        <>
          <div className="grid grid-flow-row grid-cols-1 gap-4 pt-2 pb-4 px-6 w-full sm:max-w-screen-sm mx-auto">
            <h1 className="text-2xl pt-6">
              Add Device to <strong>{gatewayData.name}</strong>
            </h1>
            <form onSubmit={handleSubmit(onSubmit)} className="max-w-full">
              <input
                name="vendor"
                type="text"
                className="bg-gray-100 py-3 px-3 max-w-ful w-full sm:max-w-screen-sm mb-4"
                autoComplete="off"
                placeholder="Vendor"
                ref={register({
                  required: "Required",
                })}
              />
              {errors.vendor && (
                <p className="text-red-800 mb-6">{errors.vendor.message}</p>
              )}

              <input
                name="date"
                type="date"
                className="bg-gray-100 py-3 px-3 max-w-ful w-full sm:max-w-screen-sm mb-4"
                autoComplete="off"
                placeholder="Date"
                ref={register({
                  required: "Required",
                })}
              />
              {errors.date && (
                <p className="text-red-800 mb-6">{errors.date.message}</p>
              )}

              <select
                className="block bg-gray-100 py-3 px-3"
                name="status"
                ref={register()}
              >
                <option value="1">Online</option>
                <option value="0">Offline</option>
              </select>

              <p>
                <button
                  disabled={adding}
                  className="bg-gray-800 text-gray-100 px-10 py-2 mt-6 mr-4 rounded hover:bg-gray-900 transition ease-out duration-200"
                >
                  {!adding ? "Add" : "Adding..."}
                </button>
                <button
                  onClick={() => setFormShown(false)}
                  className="bg-green-500 text-gray-100 px-10 py-2 mt-6 rounded hover:bg-green-600 transition ease-out duration-200"
                >
                  Cancel
                </button>
              </p>
            </form>
          </div>
        </>
      )}
    </>
  );
}

export async function getStaticPaths() {
  const paths = await getAllGatewaysIds();
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const gatewayData = await getGatewayData(params.id);
  return {
    props: {
      gatewayData,
    },
  };
}
