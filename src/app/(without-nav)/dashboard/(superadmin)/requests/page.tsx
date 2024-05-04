"use client";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

export default function Requests() {
  const { data: session, status } = useSession();

  useEffect(() => {
    const getAffiliationRequests = async () => {
      try {
        if (status === "authenticated" && session) {
          const res = await fetch(
            "http://localhost:8000/api/company/requests",
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${session.user.access_token}`,
              },
            },
          );
          const response = await res.json();
          console.log(response);
        }
      } catch (error) {
        console.error(error);
      }
    };
    getAffiliationRequests();
  }, [session]);

  return <div>Affiliation Requests</div>;
}
