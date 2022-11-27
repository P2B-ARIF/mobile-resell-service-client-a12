import { Table } from "flowbite-react";
import React, { useState } from "react";
import { useEffect } from "react";
import toast from "react-hot-toast";

const AllBuyers = () => {
  const [buyers, setBuyers] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_PORT}/dashboard/allUsers`)
      .then((res) => res.json())
      .then((data) => {
        const filter = data.filter((buyer) => buyer.status === "buyer");
        setBuyers(filter);
      });
  }, []);

  const handleDelete = (id) => {
    console.log('object');
    fetch(`${process.env.REACT_APP_PORT}/dashboard/userDelete/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          const filterDelete = buyers.filter((user) => user._id !== id);
          setBuyers(filterDelete);
          toast.success('The user has been deleted');
        }
        console.log(data, "Delete Account")});
  };

  console.log(buyers);

  return (
    <Table hoverable={true}>
      <Table.Head>
        <Table.HeadCell>No</Table.HeadCell>
        <Table.HeadCell>Name</Table.HeadCell>
        <Table.HeadCell>Email</Table.HeadCell>
        <Table.HeadCell>Status</Table.HeadCell>
        <Table.HeadCell>Action</Table.HeadCell>

      </Table.Head>
      <Table.Body className="divide-y">
        {buyers.map((buyer, i) => {
          const { _id, name, email, status } = buyer;
          return (
            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {i + 1}
              </Table.Cell>
              <Table.Cell>{name}</Table.Cell>
              <Table.Cell>{email}</Table.Cell>
              <Table.Cell>{status}</Table.Cell>
              <Table.Cell>
                <button
                onClick={()=> handleDelete(_id)}
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

export default AllBuyers;
