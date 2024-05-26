import { useState } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import BusList from "./buses/BusList";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";

type User = {
  email: string;
  password: string;
};

function Login() {
  const [user, setUser] = useState<User>({
    email: "",
    password: "",
  });

  const [open, setOpen] = useState(false);

  const [isAuthenticated, setAuth] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };

  const handleLogin = () => {
    axios
      .post(import.meta.env.VITE_API_URL + "/auth/authenticate", user, {
        headers: { "Content-Type": "application/json" },
      })
      .then((res) => {
        const jwtToken = res.data.token;
        if (jwtToken !== null) {
          sessionStorage.setItem("jwt", jwtToken);
          setAuth(true);
        }
      })
      .catch((err) => console.error(err));
  };

  const handleLogout = () => {
    setAuth(false);
    sessionStorage.setItem("jwt", "");
  };
  //   const login = () => {
  //     axios
  //       .post(import.meta.env.VITE_API_URL + "/login", user, {
  //         headers: { "Content-Type": "application/json" },
  //       })
  //       .then((res) => {
  //         const jwtToken = res.headers.authorization;
  //         if (jwtToken !== null) {
  //           sessionStorage.setItem("jwt", jwtToken);
  //           setAuth(true);
  //         }
  //       })
  //       .catch(() => setOpen(true));
  //   };

  if (isAuthenticated) {
    return <BusList logOut={handleLogout} />;
  } else {
    return (
      <Stack spacing={2} alignItems="center" mt={2}>
        <TextField name="email" label="Email" onChange={handleChange} />
        <TextField
          type="password"
          name="password"
          label="Password"
          onChange={handleChange}
        />
        <Button variant="outlined" color="primary" onClick={handleLogin}>
          Login
        </Button>
        <Snackbar
          open={open}
          autoHideDuration={3000}
          onClose={() => setOpen(false)}
          message="Login failed: Check your email and password"
        />
      </Stack>
    );
  }
}
export default Login;
