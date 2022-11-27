import { useEffect, useState } from "react";

export const RoleChecker = (user) => {
  const [role, setRole] = useState("");
  useEffect(() => {
    if (user?.email) {
      fetch(`${process.env.REACT_APP_PORT}/role/${user?.email}`)
        .then((res) => res.json())
        .then((data) => {
          setRole(data);
        })
        .catch((err) => console.log("data not coming from server"));
    }
  }, [user?.email]);
  return role;
};
