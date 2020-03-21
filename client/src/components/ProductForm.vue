<template>
	<b-modal id="ProductFormModal" ref="ProductFormModal" title="Product Form" hide-header hide-footer>
        <div class="form-group row">
            <div class="col-sm-12">
                <div class="h4">{{ id ? 'Edit' : 'Add' }} Product</div>
            </div>
        </div>
		<form id="ProductForm" @submit.prevent="">
			<div class="form-group row">
				<label for="name" class="col-sm-3 col-form-label">Name</label>
				<div class="col-sm-9">
					<input
                        type="text"
                        class="form-control"
                        id="name"
                        v-model="name"
                    />
				</div>
			</div>
			<div class="form-group row">
				<label for="image_url" class="col-sm-3 col-form-label">Image URL</label>
				<div class="col-sm-9">
					<input
						type="text"
						class="form-control"
						id="image_url"
						v-model="image_url"
					/>
				</div>
			</div>
            <div class="form-group row">
				<label for="image_preview" class="col-sm-3 col-form-label">Image View</label>
                <div class="col-sm-9 d-flex flex-row justify-content-center">
                    <img id="image_preview" :src="image_url" class="img-thumbnail">
                </div>
			</div>
            <div class="form-group row">
				<label for="price" class="col-sm-3 col-form-label">Price</label>
				<div class="col-sm-9">
					<b-form-spinbutton
						type="number"
                        min="1000"
						class="form-control"
						id="price"
                        max="10000000"
                        step="1000"
						v-model="price"
					></b-form-spinbutton>
				</div>
			</div>
            <div class="form-group row">
				<label for="stock" class="col-sm-3 col-form-label">stock</label>
				<div class="col-sm-9">
					<b-form-spinbutton
						type="number"
                        min="1"
						class="form-control"
						id="stock"
                        max="1000"
                        step="1"
						v-model="stock"
					></b-form-spinbutton>
				</div>
			</div>
            <div class="form-group row mt-5 mb-0">
                <div class="col-sm-12">
                    <button
                        type="button"
                        class="btn btn-outline-secondary float-right"
                        @click.prevent="hideModal()"
                    >
                        ↰
                    </button>
                    <button
                        v-if="id"
                        type="button"
                        class="btn btn-outline-danger float-right mr-2"
                        @click.prevent="triggerDelete()"
                    >
                        ✘
                    </button>
                    <button
                        v-if="id"
                        type="submit"
                        class="btn btn-outline-warning float-right mr-2"
                        @click.prevent="triggerEdit()"
                    >
                        🖉
                    </button>
                    <button
                        v-if="!id"
                        type="submit"
                        class="btn btn-outline-success float-right mr-2"
                        @click.prevent="triggerAdd()"
                    >
                        &#10010;
                    </button>
                </div>
            </div>
		</form>
	</b-modal>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import Swal from 'sweetalert2'

export default {
    name: "ProductForm",
    data() {
        return {
            id: null,
            name: '',
            image_url: '',
            price: null,
            stock: null
        }
    },
    computed: mapState(['productFormData']),
    methods: {
        ...mapActions(['productAdd','productEdit','productDelete']),
        hideModal() {
            this.clearForm()
            this.$refs.ProductFormModal.hide()
        },
        clearForm() {
            this.id = null,
            this.name = '',
            this.image_url = '',
            this.price = null,
            this.stock = null
        },
        triggerAdd() {
            let newProduct = {
                name: this.name,
                image_url: this.image_url,
                price: this.price,
                stock: this.stock
            }
            this.productAdd(newProduct)
            this.hideModal()
        },
        triggerEdit() {
            let productId = this.id
            let updateProduct = {
                name: this.name,
                image_url: this.image_url,
                price: this.price,
                stock: this.stock
            }
            this.productEdit({ updateProduct, productId })
            this.hideModal()
        },
        triggerDelete() {
            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
                }).then((result) => {
                if (result.value) {
                    Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                    )
                    this.productDelete(this.id)
                    this.hideModal()
                }
            })
        }
    },
    watch: {
        productFormData() {
                this.id = this.productFormData.id;
                this.name = this.productFormData.name;
                this.image_url = this.productFormData.image_url;
                this.price = this.productFormData.price;
                this.stock = this.productFormData.stock;
        }
    }
};
</script>