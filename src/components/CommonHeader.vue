<template>
    <div id="component_header">
        <div class="header-container">
            <div class="l-content">
                <el-button icon="el-icon-menu" size="mini" @click="toggleMenu"></el-button>
                <!-- <span class="text">首页</span> -->
                <el-breadcrumb separator="/">
                    <el-breadcrumb-item v-for="(item, index) in tags" :key="index" :to="{ path: item.path }">
                        {{ item.label }}</el-breadcrumb-item>
                </el-breadcrumb>
            </div>
            <div class="r-content">
                <el-dropdown @command="handleCommand">
                    <span class="el-dropdown-link">
                        <img :src="user.headimg" alt="用户头像" class="img">
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item>个人中心</el-dropdown-item>
                        <el-dropdown-item command="logout">退出</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
        </div>
    </div>
</template>
<script>
import Cookies from 'js-cookie';
import { mapState } from 'vuex';

export default {
    name: 'component_header',
    components: {

    },
    mixins: [],
    props: {

    },
    data() {
        return {
            user: {
                headimg: 'https://th.bing.com/th/id/OIP.JPaFw0vH2f6Qy44aUfZ4jgAAAA'
            }
        }
    },
    computed: {
        ...mapState({
            tags: state => state.tab.tabsList
        })
    },
    watch: {

    },
    mounted() {
        console.log(this.tags)
    },
    methods: {
        toggleMenu() {
            this.$store.commit('tab/collapseMenu')
            console.log(this.$store)
        },
        handleCommand(e) {
            if (e == 'logout') {
                this.logout()
            }
        },
        logout() {
            Cookies.remove('token')
            Cookies.remove('menu')
            this.$router.push({ name: 'login' })
            this.$message({
                  message: '退出成功',
                  type: 'success'
               })
        },
    }
};
</script>
<style lang='less' scoped>
.header-container {
    background-color: #333;
    height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    padding: 0 16px;

    .text {
        color: #fff;
        font-size: 14px;
        margin-left: 10px;
    }

    .l-content {
        display: flex;
        align-items: center;
        color: #666;

        button {
            margin-right: 20px;
        }

        /deep/.el-breadcrumb__item {
            .el-breadcrumb__inner {
                font-weight: normal;

                &.is-link {
                    color: #666;
                }
            }

            &:last-child {
                .el-breadcrumb__inner {
                    color: #fff;
                }
            }
        }
    }

    .r-content {
        .el-dropdown-link {
            cursor: pointer;
            color: #409EFF;
        }

        .el-icon-arrow-down {
            font-size: 12px;
        }

        .img {
            border-radius: 50%;
            width: 40px;
            height: 40px;
        }
    }
}
</style>