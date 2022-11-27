import React, { useEffect, useState } from "react";
import { Table } from "flowbite-react";
import toast from "react-hot-toast";

const AllSellers = () => {
  const [sellers, setSellers] = useState([]);
  const [refetch, SetReFetch] = useState(true);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_PORT}/dashboard/allUsers`)
      .then((res) => res.json())
      .then((data) => {
        const filter = data.filter((seller) => seller.status === "seller");
        setSellers(filter);
      });
  }, [refetch]);
  const handleVerify = (email) => {
    fetch(`${process.env.REACT_APP_PORT}/dashboard/userVerify/${email}`, {
      method: "PUT",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          SetReFetch(!refetch);
          setSellers(sellers);
          toast.success("The user has been successfully ");
        }

        console.log(data, "verify Account");
      });
  };
  const handleDelete = (id) => {
    console.log("object");
    fetch(`${process.env.REACT_APP_PORT}/dashboard/userDelete/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          const filterDelete = sellers.filter((user) => user._id !== id);
          setSellers(filterDelete);
          toast.success("The user has been deleted");
        }
        console.log(data, "Delete Account");
      })
      .catch((err) => console.log(err));
  };
  return (
    <Table hoverable={true}>
      <Table.Head>
        <Table.HeadCell>Serial No</Table.HeadCell>
        <Table.HeadCell>Name</Table.HeadCell>
        <Table.HeadCell>Email</Table.HeadCell>
        <Table.HeadCell>Status</Table.HeadCell>
        <Table.HeadCell>Quality</Table.HeadCell>
        <Table.HeadCell>Action</Table.HeadCell>
      </Table.Head>
      <Table.Body className="divide-y">
        {sellers?.map((seller, i) => {
          const { _id, name, email, status, quality } = seller;
          return (
            <Table.Row
              key={i}
              className="bg-white dark:border-gray-700 dark:bg-gray-800"
            >
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {i + 1}
              </Table.Cell>
              <Table.Cell>{name}</Table.Cell>
              <Table.Cell>{email}</Table.Cell>
              <Table.Cell>{status}</Table.Cell>
              <Table.Cell
                className={`${
                  quality === "verified" && "font-semibold text-green-400 "
                } ${
                  quality === "Not Verified" && "font-semibold text-red-500"
                }`}
              >
                {quality}
                {quality === "requested" && (
                  <button
                    onClick={() => handleVerify(email)}
                    className="bg-green-700 text-white px-2 rounded-lg ml-2"
                  >
                    Verify
                  </button>
                )}
              </Table.Cell>
              <Table.Cell>
                <button
                  onClick={() => handleDelete(_id)}
                  href="/tables"
                  className="font-medium text-red-600 hover:underline dark:text-blue-500"
                >
                  Delete
                </button>
              </Table.Cell>
            </Table.Row>
          );
        })}
      </Table.Body>
    </Table>
  );
};

export default AllSellers;
