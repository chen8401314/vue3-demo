<template>
    <el-scrollbar :max-height="maxHeight">
        <List/>
    </el-scrollbar>
</template>
<script>
    import List from '@/views/List.vue'
    export default {
        components: {
            List
        },
        data() {
            return {
                maxHeight: 0
            }
        }, mounted() {
            this.maxHeight = window.innerHeight - 100;
            window.onresize = () => {
                return (() => {
                    this.maxHeight = window.innerHeight - 100;
                })();
            };
        }
    }
</script>

