# Instructions
Vue封装ElementUI，快捷数据驱动开发。

## Install
```
npm install v-el -S
```

## How to use it?
```
<template>
    <div id="app">
        <v-el-search :options="options" @search="search" @enter="search" @change="search"></v-el-search>
    </div>
</template>

<script>
    export default {
        name: "App",
        components: {},
        data() {
            return {
                options: {
                    response: {search: {}},
                    items: [
                        {title: '昵称', field: 'nickname', type: 'input'},
                        {
                            title: '性别', field: 'gender', type: 'select', options: {
                                rows: [
                                    {id: 1, title: '男'},
                                    {id: 2, title: '女'},
                                ]
                            }
                        },
                    ]
                },
            }
        },
        methods: {
            search($event) {
                this.$message.success(JSON.stringify(this.response));
            }
        }
    };
</script>

<style>
</style>
```
