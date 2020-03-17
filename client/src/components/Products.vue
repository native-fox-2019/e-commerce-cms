<template>
  <div>
    <div class="table">
      <div class="row header">
        <div class="cell">
          Name
        </div>
        <div class="cell">
          Image Url
        </div>
        <div class="cell">
          Price
        </div>
        <div class="cell">
          Stock
        </div>
      </div>

      <div v-for="product in allProducts" :key="product.id" class="row">
        <div class="cell">
          {{product.name}}
        </div>
        <div class="cell">
          {{product.image_url}}
        </div>
        <div class="cell">
          {{product.price}}
        </div>
        <div class="cell">
          {{product.stock}}
        </div>
      </div>
    </div>
  </div>
  <!-- </div> -->
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'ProductCard',
  created() {
    this.getAllTodos();
  },
  computed: mapGetters(['allProducts']),
  methods: {
    ...mapActions(['getAllTodos']),
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  * {
    margin: 0px;
    padding: 0px;
    box-sizing: border-box;
  }

  body, html {
    height: 100%;
    font-family: sans-serif;
  }

  /*//////////////////////////////////////////////////////////////////
  [ Table ]*/
  .wrap-table100 {
    width: 960px;
    border-radius: 10px;
    overflow: hidden;
  }

  .table {
    width: 100%;
    display: table;
    margin: 0;
  }

  @media screen and (max-width: 768px) {
    .table {
      display: block;
    }
  }

  .row {
    display: table-row;
    background: #fff;
  }

  .row.header {
    color: #ffffff;
    background: #6c7ae0;
  }

  @media screen and (max-width: 768px) {
    .row {
      display: block;
    }

    .row.header {
      padding: 0;
      height: 0px;
    }

    .row.header .cell {
      display: none;
    }

    .row .cell:before {
      font-size: 12px;
      color: #808080;
      line-height: 1.2;
      text-transform: uppercase;
      font-weight: unset !important;

      margin-bottom: 13px;
      content: attr(data-title);
      min-width: 98px;
      display: block;
    }
  }

  .cell {
    display: table-cell;
  }

  @media screen and (max-width: 768px) {
    .cell {
      display: block;
    }
  }

  .row .cell {
    font-family: Poppins-Regular;
    font-size: 15px;
    color: #666666;
    line-height: 1.2;
    font-weight: unset !important;

    padding-top: 20px;
    padding-bottom: 20px;
    border-bottom: 1px solid #f2f2f2;
  }

  .row.header .cell {
    font-family: Poppins-Regular;
    font-size: 18px;
    color: #fff;
    line-height: 1.2;
    font-weight: unset !important;

    padding-top: 19px;
    padding-bottom: 19px;
  }

  .row .cell:nth-child(1) {
    width: 360px;
  }

  .row .cell:nth-child(2) {
    width: 160px;
  }

  .row .cell:nth-child(3) {
    width: 250px;
  }

  .row .cell:nth-child(4) {
    width: 190px;
  }


  .table, .row {
    width: 100% !important;
  }

  .row:hover {
    background-color: #ececff;
    cursor: pointer;
  }

  @media (max-width: 768px) {
    .row {
      border-bottom: 1px solid #f2f2f2;
      padding-bottom: 18px;
      padding-top: 30px;
      padding-right: 15px;
      margin: 0;
    }

    .row .cell {
      border: none;
      padding-left: 30px;
      padding-top: 16px;
      padding-bottom: 16px;
    }
    .row .cell:nth-child(1) {
      padding-left: 30px;
    }

    .row .cell {
      font-family: Poppins-Regular;
      font-size: 18px;
      color: #555555;
      line-height: 1.2;
      font-weight: unset !important;
    }

    .table, .row, .cell {
      width: 100% !important;
    }
  }
</style>
