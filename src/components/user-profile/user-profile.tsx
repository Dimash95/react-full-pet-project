import { useEffect, useState } from "react";
import axios from "axios";
import style from "./user-profile.module.css";

type User = {
  name: string;
  email: string;
  avatar: string;
};

const UserProfile = () => {
  const [user, setUser] = useState<User>({
    name: "",
    email: "",
    avatar: "",
  });
  const accessToken = localStorage.getItem("access_token");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios({
          method: "get",
          url: "https://api.escuelajs.co/api/v1/auth/profile",
          headers: {
            Authorization: "Bearer " + accessToken,
          },
        });
        setUser(response.data);
      } catch (error) {
        console.error("Error loading user profile", error);
      }
    };

    fetchData();
  }, [accessToken]);

  const onQuitFromSite = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    window.location.reload();
  };

  return (
    <div>
      {user ? (
        <div className={style.wrapper}>
          <div className={style.user}>
            <div className={style.info}>
              <h1>{user.name}</h1>
              <p>{user.email}</p>
            </div>
            <img src={user.avatar} alt="User avatar" />
          </div>
          <button onClick={onQuitFromSite}>Quit</button>
        </div>
      ) : (
        <p className={style.wrapper}>Loading profile...</p>
      )}
    </div>
  );
};

export default UserProfile;
