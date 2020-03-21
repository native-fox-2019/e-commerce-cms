import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import url from '../../config/config'
import Swal from 'sweetalert2'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    products : [],
    editProduct : {}
  },
  mutations: {
    pushDataProduct(state, payload) {
      state.products = payload
    },
    editForm(state, data) {
      state.editProduct = data
    }
  },
  actions: {
    findAll(contex) {
      axios({
        url : `${url}/products`,
        method : 'GET',
        headers : {
          token : localStorage.getItem('token')
        }
      })
      .then(({data})=> {
       contex.commit('pushDataProduct', data)
      })
      .catch(err => {
        console.log(err)
      })
    },
    addData(contex, data) {
      axios({
        url : `${url}/products`,
        method : 'POST',
        headers : {
          token :  localStorage.getItem('token')
        },
        data : {
          name : data.name,
          category : data.category,
          description : data.description,
          price : data.price,
          stock : data.stock,
          image_url : data.image_url
        }
      })
      .then(({data}) => {
        contex.dispatch('findAll')
        Swal.fire({
                  position: "center",
                  icon: "success",
                  title: `New ${data.category} has added to Product succesfully!`,
                  showConfirmButton: false,
                  timer: 3000
                });
      })
      .catch(err => {
        const error = err.response.data.message
            let errorStr = error.join('<li class="container text-left mx-5" style="margin-left: 6rem !important" >')
              Swal.fire({
                icon: "error",
                title: "Oops...",
                html: `<li class="container text-left mx-5" style="margin-left: 6rem !important">${errorStr}`,
                footer: "made by love 💖"
              });
        
      })
    },
    actionDelete(contex, id) {
      axios({
        url: `${url}/products/${id}`,
        method : 'DELETE',
        headers : {
          token : localStorage.getItem('token')
        }
      })
      .then(() => {
        contex.dispatch('findAll')
      })
      .catch(err => {
        const error = err.response.data.message
        let errorStr = error.join('<li class="container text-left mx-5" style="margin-left: 6rem !important" >')
          Swal.fire({
            icon: "error",
            title: "Oops...",
            html: `<li class="container text-left mx-5" style="margin-left: 6rem !important">${errorStr}`,
            footer: "made by love 💖"
          });
      })
    },
    editData(contex, data) {
      axios({
        url : `${url}/products/${data.id}`,
        method : 'PUT',
        headers : {
            token : localStorage.getItem('token')
        },
        data : data
    })
    .then(({data}) => {
        contex.dispatch('findAll')
         Swal.fire({
          position: "center",
          icon: "success",
          title: `Data ${data.category} has editted succesfully!`,
          showConfirmButton: false,
          timer: 3000
        });
    })
    .catch(err => {
      const error = err.response.data.message
      let errorStr = error.join('<li class="container text-left mx-5" style="margin-left: 6rem !important" >')
        Swal.fire({
          icon: "error",
          title: "Oops...",
          html: `<li class="container text-left mx-5" style="margin-left: 6rem !important">${errorStr}`,
          footer: "made by love 💖"
        });
    })
    }
  },
  modules: {
  }
})
