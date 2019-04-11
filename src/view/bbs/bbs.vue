<template>
        <div>bbs</div>
</template>
<script>
    export default {
        name: "bbs",
        data() {
            return {
            };
        },
        mounted() {
			this.$store.commit("updateNeedShowFooter", true);
			this.$store.commit("updateSelected", 1);
		},
        methods: {

        }
    };
</script>
<style lang="less" scoped>
</style>