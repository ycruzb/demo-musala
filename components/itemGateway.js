import Link from "next/link";

export default function ItemGateway({ item }) {
  return (
    <Link href={`/gateway/${item._id}`}>
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
  );
}
