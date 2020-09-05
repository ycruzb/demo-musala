export default function ItemDevice({ device, index, handleDeleteDevice }) {
  return (
    <p className="text-center py-2 mx-6 flex flex-col md:flex-row md:justify-around bg-gray-200 rounded mb-4 hover:bg-gray-300 hover:shadow-md transform hover:-translate-y-1 transition ease-out duration-200">
      {" "}
      <span>
        <strong>{index + 1}</strong>
      </span>
      <span>
        uid: <strong>{device.uid}</strong>
      </span>
      <span>
        vendor: <strong>{device.vendor}</strong>
      </span>
      <span>
        date: <strong>{device.date}</strong>
      </span>
      <span>
        status:{" "}
        <strong>
          {parseInt(device.status) === 1 ? (
            <span className="text-green-800">Online</span>
          ) : (
            <span className="text-red-800">Offline</span>
          )}
        </strong>
      </span>
      <span>
        <button
          onClick={() => handleDeleteDevice(device.uid)}
          className="flex flex-row w-full justify-center"
        >
          <img
            className="w-5 pr-1 block mt-1"
            src="/squared-minus.svg"
            alt=""
          />{" "}
          <span className="text-red-800">Delete</span>
        </button>
      </span>
    </p>
  );
}
