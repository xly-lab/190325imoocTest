<template>
  <div>
    <NavHeader/>
    <NavBread>
      <span>Goods</span>
    </NavBread>
    <div class="accessory-result-page accessory-page">
      <div class="container">
        <div class="filter-nav">
          <span class="sortby">Sort by:</span>
          <a href="javascript:void(0)" class="default cur">Default</a>
          <a href="javascript:void(0)" class="price">Price
            <svg class="icon icon-arrow-short">
              <use xlink:href="#icon-arrow-short"></use>
            </svg>
          </a>
          <a href="javascript:void(0)" class="filterby stopPop" @click="overLayFlag=!overLayFlag">Filter by</a>
        </div>
        <div class="accessory-result">
          <div id="filter" class="filter stopPop" :class="{'filterby-show':overLayFlag}">
          <dl class="filter-price">
            <dt>Price:</dt>
            <dd>
              <a href="javascript:void(0)" :class="{'cur':SAll}" @click="ShowAll">All</a>
            </dd>
            <dd v-for="(price,index) in priceFilter" :key="index" @click="changePriSty(index+1)">
              <a href="javascript:void(0)" :class="{'cur':priceStyle===(index+1)}">{{price.startPrice}} - {{price.endPrice}}</a>
            </dd>
          </dl>
        </div>
          <div class="accessory-list-wrap">
            <div class="accessory-list col-4">
              <ul>
                <li v-for="(good , index) in goodsList" :key="index">
                  <div class="pic">
                    <a href="#">
                      <img v-lazy="'static/'+good.prodcutImg" alt="">
                    </a></div> <div class="main">
                  <div class="name">{{good.productName}}</div>
                  <div class="price">{{good.prodcutPrice}}</div>
                  <div class="btn-area">
                    <a href="javascript:;" class="btn btn--m">加入购物车</a>
                  </div>
                </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="md-overlay" v-show="overLayFlag" @click="overLayFlag=!overLayFlag"></div>
    <NavFooter/>
  </div>
</template>

<script>
  import '../assets/css/base.css'
  import '../assets/css/product.css'
  import '../assets/css/checkout.css'
  import '../assets/css/login.css'
  import NavHeader from '../components/Header'
  import NavFooter from '../components/Footer'
  import NavBread from '../components/bread'
  import axios from 'axios'
    export default {
    data(){
      return{
        goodsList:[],
        priceFilter:[
          {
            startPrice:'0.00',
            endPrice:'500.00'
          },
          {
            startPrice:'500.00',
            endPrice:'1000.00'
          },
          {
            startPrice:'1000.00',
            endPrice:'2000.00'
          }
        ],
        SAll:true,
        priceStyle:0,
        overLayFlag:false
      }
    },
    components:{
      NavHeader,
      NavFooter,
      NavBread
    },
      mounted(){
          this.getGoodsList()
      },
      methods:{
        getGoodsList(){
          axios.get('http://localhost:8080/api/goodsData').then((result)=>{
            var res= result.data.data;
            this.goodsList = res.result;
          })
        },
        changePriSty(val){
          this.priceStyle=val;
          this.SAll=false;
          this.overLayFlag=!this.overLayFlag
        },
        ShowAll(){
          this.overLayFlag=!this.overLayFlag

          if(this.priceStyle===1||this.priceStyle===2||this.priceStyle===3){
            this.priceStyle=0;
            this.SAll=true;
          }else {
            if(this.priceStyle===0){
              this.SAll=true;
            }
            else this.SAll=false;
          }
        }
      }
  }

</script>

<style>


</style>
