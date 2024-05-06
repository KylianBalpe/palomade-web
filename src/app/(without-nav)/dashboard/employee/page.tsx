// "use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Company } from "@/utils/services/company-service";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { set } from "react-hook-form";

type Employees = {
  userId: number;
  name: string;
  username: string;
  email: string;
  role: string;
};

async function getData(): Promise<Employees[]> {
  return [
    {
      userId: 1,
      name: "John Doe",
      username: "johndoe",
      email: "johndoe@email.com",
      role: "Admin",
    },
    {
      userId: 2,
      name: "Jane Smith",
      username: "janesmith",
      email: "janesmith@email.com",
      role: "Manager",
    },
    {
      userId: 3,
      name: "Michael Johnson",
      username: "michaelj",
      email: "michaelj@email.com",
      role: "Employee",
    },
    {
      userId: 4,
      name: "Emily Davis",
      username: "emilyd",
      email: "emilyd@email.com",
      role: "HR",
    },
    {
      userId: 5,
      name: "Daniel Brown",
      username: "danb",
      email: "danb@email.com",
      role: "Engineer",
    },
    {
      userId: 6,
      name: "Sarah Wilson",
      username: "sarahw",
      email: "sarahw@email.com",
      role: "Designer",
    },
    {
      userId: 7,
      name: "Christopher Martinez",
      username: "chrism",
      email: "chrism@email.com",
      role: "Developer",
    },
    {
      userId: 8,
      name: "Olivia Taylor",
      username: "oliviat",
      email: "oliviat@email.com",
      role: "Analyst",
    },
    {
      userId: 9,
      name: "William Anderson",
      username: "willa",
      email: "willa@email.com",
      role: "Sales",
    },
    {
      userId: 10,
      name: "Emma Rodriguez",
      username: "emmar",
      email: "emmar@email.com",
      role: "Marketing",
    },
    {
      userId: 11,
      name: "Liam Walker",
      username: "liamw",
      email: "liamw@email.com",
      role: "Support",
    },
    {
      userId: 12,
      name: "Ava Thomas",
      username: "avat",
      email: "avat@email.com",
      role: "Finance",
    },
    {
      userId: 13,
      name: "Noah Baker",
      username: "noahb",
      email: "noahb@email.com",
      role: "Intern",
    },
    {
      userId: 14,
      name: "Sophia Hill",
      username: "sophiah",
      email: "sophiah@email.com",
      role: "Consultant",
    },
    {
      userId: 15,
      name: "Mason Wright",
      username: "masonw",
      email: "masonw@email.com",
      role: "Executive",
    },
    {
      userId: 16,
      name: "Amelia Perez",
      username: "ameliap",
      email: "ameliap@email.com",
      role: "Director",
    },
    {
      userId: 17,
      name: "Ethan Scott",
      username: "ethans",
      email: "ethans@email.com",
      role: "Coordinator",
    },
    {
      userId: 18,
      name: "Isabella King",
      username: "isabellak",
      email: "isabellak@email.com",
      role: "Trainer",
    },
    {
      userId: 19,
      name: "Alexander Green",
      username: "alexanderg",
      email: "alexanderg@email.com",
      role: "Recruiter",
    },
    {
      userId: 20,
      name: "Mia Baker",
      username: "miab",
      email: "miab@email.com",
      role: "Specialist",
    },
    {
      userId: 21,
      name: "Nathan Turner",
      username: "nathant",
      email: "nathant@email.com",
      role: "Advisor",
    },
    {
      userId: 22,
      name: "Hannah Lopez",
      username: "hannahl",
      email: "hannahl@email.com",
      role: "Auditor",
    },
    {
      userId: 23,
      name: "Gabriel Clark",
      username: "gabrielc",
      email: "gabrielc@email.com",
      role: "Technician",
    },
    {
      userId: 24,
      name: "Madison Hill",
      username: "madisonh",
      email: "madisonh@email.com",
      role: "Coordinator",
    },
    {
      userId: 25,
      name: "Henry Adams",
      username: "henrya",
      email: "henrya@email.com",
      role: "Architect",
    },
    {
      userId: 26,
      name: "Victoria Baker",
      username: "victoriab",
      email: "victoriab@email.com",
      role: "Designer",
    },
    {
      userId: 27,
      name: "Samuel Mitchell",
      username: "samuelm",
      email: "samuelm@email.com",
      role: "Developer",
    },
    {
      userId: 28,
      name: "Lauren Collins",
      username: "laurenc",
      email: "laurenc@email.com",
      role: "Consultant",
    },
    {
      userId: 29,
      name: "Benjamin Murphy",
      username: "benjaminm",
      email: "benjaminm@email.com",
      role: "Analyst",
    },
    {
      userId: 30,
      name: "Chloe Ward",
      username: "chloew",
      email: "chloew@email.com",
      role: "Manager",
    },
    {
      userId: 31,
      name: "Jackson Scott",
      username: "jacksons",
      email: "jacksons@email.com",
      role: "Engineer",
    },
    {
      userId: 32,
      name: "Avery Martinez",
      username: "averym",
      email: "averym@email.com",
      role: "Designer",
    },
    {
      userId: 33,
      name: "Scarlett Lewis",
      username: "scarlettl",
      email: "scarlettl@email.com",
      role: "Administrator",
    },
    {
      userId: 34,
      name: "Connor Cook",
      username: "connorc",
      email: "connorc@email.com",
      role: "Supervisor",
    },
    {
      userId: 35,
      name: "Grace Turner",
      username: "gracet",
      email: "gracet@email.com",
      role: "Specialist",
    },
    {
      userId: 36,
      name: "Lucas Garcia",
      username: "lucasg",
      email: "lucasg@email.com",
      role: "Auditor",
    },
    {
      userId: 37,
      name: "Lily Adams",
      username: "lilya",
      email: "lilya@email.com",
      role: "Support",
    },
    {
      userId: 38,
      name: "Jackson Stewart",
      username: "jacksonst",
      email: "jacksonst@email.com",
      role: "Advisor",
    },
    {
      userId: 39,
      name: "Mila Nelson",
      username: "milan",
      email: "milan@email.com",
      role: "Coordinator",
    },
    {
      userId: 40,
      name: "Elijah Ward",
      username: "elijahw",
      email: "elijahw@email.com",
      role: "Developer",
    },
  ];
}

export default async function Employee({
  searchParams,
}: {
  searchParams?: {
    page?: string;
  };
}) {
  // const { data: session, status } = useSession();
  // const [employees, setEmployees] = useState<Employees[]>([]);

  // useEffect(() => {
  //   const getEmployees = async () => {
  //     try {
  //       if (status === "authenticated" && session) {
  //         const employee = await Company.getCompanyEmployees(
  //           session.user.access_token,
  //           session.user.companyStringId,
  //         );

  //         setEmployees(employee.data);
  //       }
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };
  //   getEmployees();
  // }, [session]);

  const response = await getData();
  const currentPage = Number(searchParams?.page) || 1;

  const data = response;
  return (
    <div className="flex flex-col rounded-md border p-4 shadow-md">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
