<template>
    <el-scrollbar max-height="400px" style="background: gray">
        <p class="scrollbar-demo-item">
            test1
        </p>
        <p class="scrollbar-demo-item">
            test2
        </p>
        <p class="scrollbar-demo-item">
            test2
        </p>
        <p class="scrollbar-demo-item">
            test2
        </p>
        <p class="scrollbar-demo-item">
            test2
        </p>
        <p class="scrollbar-demo-item">
            test2
        </p>
        <p class="scrollbar-demo-item">
            test2
        </p>

    </el-scrollbar>
</template>
<script>
    export default {
        name: 'aside'
    }

</script>
<style>
    .scrollbar-demo-item {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 50px;
        margin: 10px;
        text-align: center;
        border-radius: 4px;
        background: var(--el-color-primary-light-9);
        color: var(--el-color-primary);
    }
</style>
