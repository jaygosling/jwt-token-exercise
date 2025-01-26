import axios from 'axios'
// import { useNavigate } from 'react-router-dom';

const getState = ({ getStore, getActions, setStore }) => {
	// const navigate = useNavigate();
	return {
		store: {
			privilege: false
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},
			register: (fullName, email, password, confirmPassword) => {
				if (password != confirmPassword) {
					alert("Los password no coinciden");
					return false;
				}
				axios.post(process.env.BACKEND_URL + "/api/register", {
					"email": email,
					"password": password,
					"full_name": fullName
				})
					.then((res) => {
						console.log(res);
						if (res.data.status == 'success') {
							alert(res.data.message);
							window.location.href = "/login";
						} else {
							alert(res.data.message);
						}
					})
					.catch((err) => {
						console.log(err);
					})
			},
			login: (email, password) => {
				axios.post(process.env.BACKEND_URL + "/api/login", {
					"email": email,
					"password": password
				})
					.then((res) => {
						console.log(res);
						if (res.data.status == "success") {
							sessionStorage.setItem("token", res.data.token);
							console.log(res.data.message);
							alert(res.data.message);
							window.location.href = "/private";

						} else {
							alert(res.data.message);
						}
					})
					.catch((err) => {
						alert(err.message);
					})
			},
			private: (token) => {
				axios.get(process.env.BACKEND_URL + "/api/private", {
					headers: {
						"Authorization": `Bearer ${token}`
					}
				})
					.then((res) => {
						if (res.data.status == "success" && res.data.privilege == true) {
							console.log(res.data);
							setStore({ privilege: res.data.privilege });
						} else {
							alert(res.data.message);
						}
					})
					.catch((err) => {
						alert("Acceso no autorizado");
					})
			}
		}
	};
};

export default getState;
