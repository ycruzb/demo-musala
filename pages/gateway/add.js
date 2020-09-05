import Head from "next/head";
import Link from "next/link";
import { useForm } from "react-hook-form";

function GatewayAdd() {
  const { handleSubmit, register, errors, reset } = useForm();

  const [errorShow, setErrorShown] = React.useState(false);

  const [adding, setAdding] = React.useState(false);

  const onSubmit = async (data, e) => {
    setAdding(true);
    const res = await fetch("/api/gateway/add", {
      method: "post",
      body: JSON.stringify(data),
    });
    //console.log(res);

    if (res.status === 200) {
      e.target.reset();
      setAdding(false);
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
        <title>Add Gateway | Demo for MusalaSoft</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Link href="/">
        <a className="pt-6 pb-4 block px-6">&#8592; Back to Gateways</a>
      </Link>

      {errorShow && (
        <p className="text-center p-4 my-6 bg-red-700 text-white">
          An error has been occurred! Please, fill the form properly.
        </p>
      )}

      <div className="grid grid-flow-row grid-cols-1 gap-4 pt-2 pb-4 px-6 w-full sm:max-w-screen-sm mx-auto">
        <h1 className="text-2xl">Add Gateway</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="max-w-full">
          <p>
            <input
              name="name"
              type="text"
              className="bg-gray-100 py-3 px-3 w-full mb-4"
              autoComplete="off"
              placeholder="Name"
              ref={register({
                required: "Required",
              })}
            />
          </p>
          {errors.name && (
            <p className="text-red-800 mb-6">{errors.name.message}</p>
          )}

          <p>
            <input
              name="serial"
              type="text"
              className="bg-gray-100 py-3 px-3 w-full mb-4"
              autoComplete="off"
              placeholder="Serial"
              ref={register({
                required: "Required",
              })}
            />
          </p>
          {errors.serial && (
            <p className="text-red-800 mb-6">{errors.serial.message}</p>
          )}

          <p>
            <input
              name="ipv4"
              type="text"
              className="bg-gray-100 py-3 px-3 w-full mb-4"
              autoComplete="off"
              placeholder="IPv4"
              ref={register({
                required: "Required",
                pattern: {
                  value: /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/gm,
                  message: "Invalid IPv4",
                },
              })}
            />
          </p>
          {errors.ipv4 && (
            <p className="text-red-800 mb-6">{errors.ipv4.message}</p>
          )}

          <p>
            <button
              disabled={adding}
              className="bg-gray-800 text-gray-100 px-20 py-4 mt-6 rounded hover:bg-gray-900 transition ease-out duration-200"
            >
              {!adding ? "Add" : "Adding..."}
            </button>
          </p>
        </form>
      </div>
    </>
  );
}

export default GatewayAdd;
