<template>
        <div>center</div>
</template>
<script>
    export default {
        name: "center",
        data() {
            return {
            };
        },
        mounted() {
			this.$store.commit("updateNeedShowFooter", true);
			this.$store.commit("updateSelected", 2);
		},
        methods: {

        }
    };
</script>
<style lang="less" scoped>
</style>