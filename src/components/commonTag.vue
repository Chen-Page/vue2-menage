<template>
    <div id="component_tag">
        <div class="tabs">
            <el-tag v-for="(item, index) in tags" :key="item.path" :closable="item.name !== 'home'"
                :effect="$route.name === item.name ? 'dark' : 'plain'" size="smaill" @click="changeMenu(item)" @close="handleClose(item, index)">
                {{ item.label }}
            </el-tag>
        </div>
    </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex';

export default {
    name: 'component_tag',
    components: {

    },
    mixins: [],
    props: {

    },
    data() {
        return {
            items: [{ type: '', label: '标签一' }]
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
        console.log(this.$route.name, this.tags)
    },
    methods: {
        changeMenu(item) {
            this.$router.push({ name: item.name })
        },
        handleClose (item, index) {
            const len = this.tags.length
            console.log('当前下标', index)
            // 修改tag
            this['tab/closeTag'](item)
            // 删除非当前活动页面
            if (item.name !== this.$route.name) {
                return
            }
            // 删除最后一项
            if (index === (len - 1)) {
                this.$router.push({
                    name: this.tags[index - 1].name
                })
            } else {
                this.$router.push({
                    name: this.tags[index].name
                })
            }
        },
        ...mapMutations(['tab/closeTag'])
    }
};
</script>
<style lang='less' scoped>
.tabs{
    padding: 20px;
    .el-tag{
        margin-right: 15px;
        cursor: pointer;
    }
}
</style>