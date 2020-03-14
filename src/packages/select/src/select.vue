<template>
    <el-select
            v-model="value"
            :placeholder="item.title"
            :multiple="item.multiple"
            :clearable="item.clearable"
            :filterable="item.filterable"
            :remote="item.remote"
            :reserve-keyword="item.reserveKeyword"
            :remote-method="remoteMethod"
            :loading="item.loading"
            :loading-text="item.loadingText"
            :no-match-text="item.noMatchText"
            @change="change"
    >
        <span v-if="item.options">
            <el-option
                    v-for="option in item.options.rows"
                    :key="'option' + option.id"
                    :label="option.title"
                    :value="option[item.options.key ? item.options.key : 'id']"
            ></el-option>
        </span>
    </el-select>
</template>

<script>
    export default {
        name: "vEleSelect",
        data() {
            return {
                value: null
            }
        },
        props: {
            item: {
                type: Object
            }
        },
        model: {
            prop: 'value',
            event: 'change'
        },
        methods: {
            change($event) {
                this.$emit('change', $event);
            },
            remoteMethod(query) {
                this.$emit('remoteMethod', {
                    item: this.item,
                    query: query
                });
            }
        },
        mounted() {
            Object.assign({
                options: {rows: [], key: 'id'}
            }, this.item);
        }
    }
</script>

<style scoped>

</style>
