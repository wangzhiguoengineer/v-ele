<template>
    <el-table
            :data="options.data"
            :border="options.border"
            :stripe="options.stripe"
            :height="options.height"
            :max-height="options.maxHeight"
            :default-sort="options.defaultSort"
            :show-overflow-tooltip="options.showOverflowTooltip"
            :show-summary="options.showSummary"
            :sum-text="options.sumText"
            :summary-method="options.summaryMethod"
            @sort-change="sortChange($event, options)"
            style="width: 100%">
        <el-table-column v-for="(item, index) in options.cols"
                         :key="'col' + index"
                         :index="index"
                         :prop="item.prop"
                         :label="item.label"
                         :width="item.width"
                         :type="item.type"
                         :sortable="item.sortable"
                         :fixed="item.fixed"
                         :sort-by="item.sortBy"
                         :sort-method="item.sortMethod"
                         :formatter="item.formatter"
        >
            <template v-if="!item.type" v-slot="scope">
                <span v-if="item.prop" v-html="scope.row[item.prop]"></span>
                <el-button v-for="(button, buttonIndex) in item.buttons"
                           :key="'button' + buttonIndex"
                           :type="button.type"
                           :size="button.size"
                           :icon="button.icon"
                           @click="buttonClick(scope.row, button, item, $event)">
                </el-button>
            </template>
        </el-table-column>
    </el-table>
</template>

<script>
    export default {
        name: "vElTable",
        props: {
            options: {
                response: {
                    type: Object,
                    default() {
                        return {
                            order: null
                        };
                    }
                },
                data: {
                    type: Array,
                    required: true
                },
                cols: {
                    type: Array,
                    required: true
                },
                sortChange: {
                    type: String | Function
                }
            }
        },
        methods: {
            buttonClick(row, button, col, $event) {
                const emitName = button.click ? button.click : 'click';
                if (typeof emitName === "string") {
                    this.$emit(emitName, row, button, col, $event);
                } else if (typeof emitName === "function") {
                    emitName(row, button, col, $event);
                }
            },
            sortChange($event, options) {
                const emitName = options.sortChange ? options.sortChange : 'sortChange';
                const col = this.options.cols.find(p => p.prop === $event.prop);
                const prop = col.sortField ? col.sortField : $event.prop;
                const order = $event.order ? ($event.order === "ascending" ? 'asc' : 'desc') : null;
                this.options.response.order = order ? prop + ' ' + order : null;
                if (typeof emitName === "string") {
                    this.$emit(emitName, this.options.response, $event);
                } else if (typeof emitName === "function") {
                    emitName(this.options.response, $event);
                }
            }
        }
    }
</script>

<style scoped>

</style>
