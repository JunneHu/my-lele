<template>
    <van-tabbar v-model="selected" v-show="needShowFooter">
        <van-tabbar-item icon="home-o" to="/">首页</van-tabbar-item>
        <van-tabbar-item icon="more-o" dot to="/bbs">论坛</van-tabbar-item>
        <van-tabbar-item icon="contact" to="/center">个人中心</van-tabbar-item>
    </van-tabbar>
</template>
<script>
    export default {
        name: "footer",
        data() {
            return {
            };
        },
        computed: {
            needShowFooter() {
                return this.$store.state.needShowFooter;
            },
            selected: {
                get() {
                    return this.$store.state.footerSelected;
                },
                set(newValue) {
                    this.$store.state.footerSelected = newValue
                }
            }
        },
        watch: {
            '$route'(to, from) {
                if (to.name == "home" || to.name == "bbs" || to.name == "center" || to.name == "charge" || to.name == "service") {
                    this.$store.commit("updateNeedShowFooter", true);
                } else {
                    setTimeout(() => {
                        this.$store.commit("updateNeedShowFooter", false);
                    }, 10)
                }
            },
        },
        methods: {

        }
    };
</script>
<style lang="less" scoped>

</style>