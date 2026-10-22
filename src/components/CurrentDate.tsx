
"use client";

import { useEffect, useState } from "react";

const CurrentDate = () => {
  const [CurrentDate, setCurrentDate] = useState("");

  useEffect(() => {
    const date = new Date();

    setCurrentDate(
      date.toLocaleDateString("bn-BD", {
        dateStyle: "full",
      })
    );
  }, []);

  return <p>{CurrentDate || "তারিখ লোড হচ্ছে..."}</p>;
};

export default CurrentDate;
