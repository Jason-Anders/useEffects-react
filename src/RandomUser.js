import { useState, useEffect } from "react";

import User from "./User";

const colors = ["#0c9bbd", "red", "orange", "green"];

const RandomUserTwo = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [num, setNum] = useState(0);
  const [searchChange, setSearchChange] = useState("");
  const [searchWord, setSearchWord] = useState(
    localStorage.getItem("user") || "foobar"
  );

  const [data, setData] = useState([]);
  // first user
  useEffect(() => {
    // const searchWordHere = localStorage.getItem("user") || "";
    // const searchTerm = searchWord;
    const fetchUser = async () => {
      try {
        const res = await fetch(
          `https://randomuser.me/api/?seed=${searchWord}`
        );
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        const data2 = await res.json();

        setData(data2.results);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  //sets username to local memory
  useEffect(() => {
    localStorage.setItem("user", searchWord);
  }, [searchWord]);

  useEffect(() => {
    const colorInterval = setInterval(() => {
      console.log("i am running");
      setNum((prevNum) => (prevNum === 3 ? 0 : prevNum + 1));
    }, 7000);

    return clearInterval(colorInterval);
  }, []);

  return (
    <div
      style={{
        backgroundColor: colors[num],
        transition: "background-color 4s",
      }}
      className="container"
    >
      <div className="person">
        {data.map((data) => (
          <User key={data.id.value} data={data} />
        ))}
      </div>
      <div className="form-wrapper">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSearchWord(searchChange);
            setSearchChange("");
          }}
        >
          <label htmlFor="search">Search:</label>
          <input
            id="search"
            onChange={(e) => setSearchChange(e.target.value)}
            value={searchChange}
            name="searchWord"
            placeholder="Username"
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default RandomUserTwo;
