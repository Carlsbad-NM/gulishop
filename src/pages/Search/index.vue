<template>
  <div>
    <TypeNav />
    <div class="main">
      <div class="py-container">
        <!--bread-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <li class="with-x" v-if="searchParams.categoryName">
              {{searchParams.categoryName}}
              <i @click="removeCategoryName">×</i>
            </li>

            <li class="with-x" v-if="searchParams.keyword">
              {{searchParams.keyword}}
              <i @click="removeKeyword">×</i>
            </li>

            <li class="with-x" v-if="searchParams.trademark">
              {{searchParams.trademark.split(':')[1]}}
              <i @click="removeTrademark">×</i>
            </li>

            <li class="with-x" v-for="(prop, index) in searchParams.props" :key="index">
              {{prop.split(':')[1]}}
              <i @click="removeProp(index)">×</i>
            </li>
          </ul>
        </div>

        <!--selector-->
        <SearchSelector @searchForTrademark="searchForTrademark" @searchForAttr="searchForAttr" />

        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <li :class="{active:sortFlag === '1'}">
                  <a href="javascript:;" @click="sortGoods('1')">
                    综合
                    <i
                      class="iconfont"
                      v-if="sortFlag === '1'"
                      :class="{icondown:sortType === 'desc',iconup:sortType === 'asc'}"
                    ></i>
                  </a>
                </li>
                <li>
                  <a href="#">销量</a>
                </li>
                <li>
                  <a href="#">新品</a>
                </li>
                <li>
                  <a href="#">评价</a>
                </li>
                <li :class="{active:sortFlag === '2'}">
                  <a href="javascript:;" @click="sortGoods('2')">
                    价格
                    <i
                      class="iconfont"
                      v-if="sortFlag === '2'"
                      :class="{icondown:sortType === 'desc',iconup:sortType === 'asc'}"
                    ></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div class="goods-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-5" v-for="(goods, index) in goodsList" :key="goods.id">
                <div class="list-wrap">
                  <div class="p-img">
                    <router-link :to="`/detail/${goods.id}`">
                      <img v-lazy="goods.defaultImg" />
                    </router-link>
                    <!-- <a href="item.html" target="_blank">
                      <img :src="goods.defaultImg" />
                    </a>-->
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>{{goods.price}}</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a
                      target="_blank"
                      href="item.html"
                      title="促销信息，下单即赠送三个月CIBN视频会员卡！【小米电视新品4A 58 火爆预约中】"
                    >{{goods.title}}</a>
                  </div>
                  <div class="commit">
                    <i class="command">
                      已有
                      <span>2000</span>人评价
                    </i>
                  </div>
                  <div class="operate">
                    <a
                      href="success-cart.html"
                      target="_blank"
                      class="sui-btn btn-bordered btn-danger"
                    >加入购物车</a>
                    <a href="javascript:void(0);" class="sui-btn btn-bordered">收藏</a>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <el-pagination
            background
            :current-page="searchParams.pageNo"
            :page-size="searchParams.pageSize"
            layout=" prev, pager, next, jumper,->,total"
            :total="goodsListInfo.total"
            :pager-count="7"
            @current-change="changePage"
          ></el-pagination>
          <!-- <Pagination
            :currentPageNum="searchParams.pageNo"
            :pageSize="searchParams.pageSize"
            :total="goodsListInfo.total"
            :continueNum="5"
            @changePage="changePage"
          ></Pagination>-->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SearchSelector from "./SearchSelector/SearchSelector";
import { mapGetters, mapState } from "vuex";
export default {
  name: "Search",
  data() {
    return {
      // 初始化搜索参数
      searchParams: {
        category1Id: "",
        category2Id: "",
        category3Id: "",
        categoryName: "",
        keyword: "",
        order: "1:desc",
        pageNo: 1,
        pageSize: 4,
        props: [],
        trademark: "",
      },
    };
  },
  beforeMount() {
    // 同步更新data数据
    this.handlerSearchParams();
  },
  mounted() {
    // 异步发送请求
    this.getGoodsListInfo();
  },
  methods: {
    getGoodsListInfo() {
      this.$store.dispatch("getGoodsListInfo", this.searchParams);
    },
    // 处理searchParams参数
    handlerSearchParams() {
      // 1、从路由中获取对应的params和query参数
      let { keyword } = this.$route.params;
      let {
        category1Id,
        category2Id,
        category3Id,
        categoryName,
      } = this.$route.query;
      // 2、拿到的这些参数可能有可能没有，需要判断
      // 这次不判断，直接全部拷贝到一个新对象中
      let searchParams = {
        ...this.searchParams,
        category1Id,
        category2Id,
        category3Id,
        categoryName,
        keyword,
      };
      // 3、过滤这个对象当中没有数据的属性
      Object.keys(searchParams).forEach((item) => {
        if (!searchParams[item]) {
          delete searchParams[item];
        }
      });

      this.searchParams = searchParams;
    },

    // 删除面包屑类别名称
    removeCategoryName() {
      this.searchParams.categoryName = "";
      this.searchParams.pageNo = 1;
      // 删除面包屑路径当中对应的类别名称还在
      // 不能在这直接发送请求，因为这样路由是不变化的
      // this.getGoodsListInfo();
      this.$router.replace({ name: "search", params: this.$route.params });
    },
    // 删除面包屑关键字
    removeKeyword() {
      this.searchParams.keyword = "";
      this.searchParams.pageNo = 1;
      // 使用全局事件总线清空搜索框关键字
      this.$bus.$emit("clearKeyword");
      // this.getGoodsListInfo();
      this.$router.replace({ name: "search", query: this.$route.query });
    },

    //全局自定义事件添加品牌点击搜索事件
    searchForTrademark(trademark) {
      this.searchParams.trademark = `${trademark.tmId}:${trademark.tmName}`;
      this.searchParams.pageNo = 1;
      this.getGoodsListInfo();
    },

    //删除面包屑品牌搜索
    removeTrademark() {
      this.searchParams.trademark = "";
      this.searchParams.pageNo = 1;
      this.getGoodsListInfo();
    },
    //添加属性点击搜索
    searchForAttr(attr, attrValue) {
      this.searchParams.props.push(
        `${attr.attrId}:${attrValue}:${attr.attrName}`
      );
      this.searchParams.pageNo = 1;
      this.getGoodsListInfo();
    },
    // 删除面包屑属性搜索
    removeProp(index) {
      this.searchParams.props.splice(index, 1);
      this.searchParams.pageNo = 1;
      this.getGoodsListInfo();
    },

    // 点击修改排序规则
    sortGoods(sortFlag) {
      // let originFlag = this.searchParams.order.split(":")[0];
      // let originType = this.searchParams.order.split(":")[1];
      let originFlag = this.sortFlag;
      let originType = this.sortType;
      let newOrder;
      if (sortFlag === originFlag) {
        newOrder = `${sortFlag}:${originType === "desc" ? "asc" : "desc"}`;
      } else {
        newOrder = `${sortFlag}:desc`;
      }
      this.searchParams.order = newOrder;
      this.getGoodsListInfo();
    },

    //点击切换分页
    changePage(num) {
      this.searchParams.pageNo = num;
      this.getGoodsListInfo();
    },
  },
  computed: {
    ...mapState({
      goodsListInfo: (state) => state.search.goodsListInfo,
    }),
    ...mapGetters(["goodsList"]),
    // 优化
    sortFlag() {
      return this.searchParams.order.split(":")[0];
    },
    sortType() {
      return this.searchParams.order.split(":")[1];
    },
  },
  watch: {
    $route() {
      this.handlerSearchParams();
      // 再次发送请求获取新的参数搜索
      this.getGoodsListInfo();
    },
  },

  components: {
    SearchSelector,
  },
};
</script>

<style lang="less" scoped>
.main {
  margin: 10px 0;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .bread {
      margin-bottom: 5px;
      overflow: hidden;

      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;

        li {
          display: inline-block;
          line-height: 18px;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }

      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;

        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;

          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }

          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;

            li {
              float: left;
              line-height: 18px;

              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }

              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }

      .goods-list {
        margin: 20px 0;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;

            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;

                a {
                  color: #666;

                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }

              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;

                  i {
                    margin-left: -5px;
                  }
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 12px 15px;

                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;

                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }

      .page {
        width: 733px;
        height: 66px;
        overflow: hidden;
        float: right;

        .sui-pagination {
          margin: 18px 0;

          ul {
            margin-left: 0;
            margin-bottom: 0;
            vertical-align: middle;
            width: 490px;
            float: left;

            li {
              line-height: 18px;
              display: inline-block;

              a {
                position: relative;
                float: left;
                line-height: 18px;
                text-decoration: none;
                background-color: #fff;
                border: 1px solid #e0e9ee;
                margin-left: -1px;
                font-size: 14px;
                padding: 9px 18px;
                color: #333;
              }

              &.active {
                a {
                  background-color: #fff;
                  color: #e1251b;
                  border-color: #fff;
                  cursor: default;
                }
              }

              &.prev {
                a {
                  background-color: #fafafa;
                }
              }

              &.disabled {
                a {
                  color: #999;
                  cursor: default;
                }
              }

              &.dotted {
                span {
                  margin-left: -1px;
                  position: relative;
                  float: left;
                  line-height: 18px;
                  text-decoration: none;
                  background-color: #fff;
                  font-size: 14px;
                  border: 0;
                  padding: 9px 18px;
                  color: #333;
                }
              }

              &.next {
                a {
                  background-color: #fafafa;
                }
              }
            }
          }

          div {
            color: #333;
            font-size: 14px;
            float: right;
            width: 241px;
          }
        }
      }
    }
  }
}
</style>