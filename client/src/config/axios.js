import Axios from "axios";
import Swal from "sweetalert2";

const axios = Axios.create({
  baseURL: "https://jadilapak.herokuapp.com"
});

function errorHandler(error) {
  if (error.response) {
    if (error.response.status === 404) {
      Swal.fire({
        icon: "error",
        title: "Data not found !"
      });
    } else if (error.response.status === 401) {
      Swal.fire({
        icon: "error",
        title: "Invalid token please input a valid token."
      });
    } else if (error.response.status === 403) {
      Swal.fire({
        icon: "error",
        title: "Forbiden access !"
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!"
      });
    }
  }
}

export { axios, errorHandler };
