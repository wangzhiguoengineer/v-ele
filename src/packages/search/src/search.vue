<template>
    <el-form class="form-search" ref="form-search" :model="options.response.search" :label-width="'0px'">
        <el-form-item v-for="(item,index) in options.items" :key="item.field + index" :index="index"
                      :class="'el-form-item-' + item.type">
            <v-el-input v-if="item.type === 'input'" v-model="options.response.search[item.field]"
                        :item="item"
                        @change="inputChange(item,$event)"
                        @enter="inputEnter(item, $event)"
            ></v-el-input>
            <v-el-select v-if="item.type === 'select'"
                         v-model="options.response.search[item.field]"
                         :item="item"
                         @remoteMethod="remoteMethod($event)"
                         @change="inputChange(item,$event)"
            ></v-el-select>
            <v-el-date-range v-if="item.type === 'daterange'"
                             v-model="options.response.search[item.field]"
                             @change="inputChange(item,$event)"
            ></v-el-date-range>
        </el-form-item>
        <el-form-item v-for="(item,index) in options.buttons" :key="item.event + index" :index="index">
            <el-button v-html="item.title" @click="buttonClick(item,$event)" :class="item.icon"></el-button>
        </el-form-item>
    </el-form>
</template>

<script>
    import vElInput from './../../input/index';
    import vElSelect from './../../select/index';
    import vElDateRange from './../../date-range/index';

    export default {
        name: "vElSearch",
        components: {vElInput, vElSelect, vElDateRange},
        props: {
            options: {
                response: {
                    type: Object,
                    default() {
                        return {
                            search: {}
                        };
                    }
                },
                items: {
                    type: Array,
                    required: true
                },
                buttons: {
                    type: Array
                }
            },
        },
        methods: {
            inputChange(item, $event) {
                this.$emit('change', this.options.response, item, $event);
            },
            inputEnter(item, $event) {
                this.$emit('enter', this.options.response, item, $event);
            },
            buttonClick(item, $event) {
                const emitName = item.click ? item.click : 'click';
                if (typeof emitName === "string") {
                    this.$emit(emitName, this.options.response, item, $event);
                } else if (typeof emitName === "function") {
                    emitName(this.options.response, item, $event);
                }
            },
            remoteMethod($event) {
                if (!$event.item) {
                    return;
                }
                const {item, query} = $event;
                const emitName = $event.item.remoteMethod;
                if (typeof emitName === "function") {
                    emitName({item, query});
                }
            }
        },
        created() {
            this.options.items.filter(p => p.remoteMethod).forEach((item) => {
                item.remoteMethod({item: item, query: null});
            })
        }
    }
</script>

<style scoped lang="scss">
    .form-search {
        text-align: left;
        margin-bottom: 20px;

        .el-form-item {
            display: inline-block;
            max-width: 180px;
            margin-right: 10px;
            margin-bottom: 10px;

            &.el-form-item-daterange {
                width: 370px;
                max-width: 100%;

                .el-range-editor.el-input__inner {
                    width: 100%;
                }
            }
        }
    }
</style>
