import React from "react";

type DetailData = {
  title: string;
  data: string | JSX.Element;
};

export default function DetailData(props: DetailData) {
  const { title, data } = props;

  return (
    <div className="flex flex-col space-y-1">
      <p className="text-gray-600">{title}</p>
      <p className="font-medium">{data}</p>
    </div>
  );
}
