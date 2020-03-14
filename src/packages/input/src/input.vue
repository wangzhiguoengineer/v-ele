<template>
    <el-input :clearable="item.clearable"
              :placeholder="item.title"
              v-model="item.model"
              @change="change($event)"
              @keyup.enter.native="enter($event.target.value)"
    >
        <i v-if="item.prefixIcon" slot="prefix" class="el-input__icon" :class="item.prefixIcon"></i>
        <i v-if="item.suffixIcon" slot="suffix" class="el-input__icon" :class="item.suffixIcon"></i>
    </el-input>
</template>

<script>
    export default {
        name: "vElInput",
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
            getModel($event) {
                let model = $event;
                if (this.item.fuzzy) {
                    if (model) {
                        model = '%' + model + '%';
                    } else {
                        model = null;
                    }
                }
                return model;
            },
            change($event) {
                this.$emit('change', this.getModel($event));
            },
            enter($event) {
                this.$emit('enter', this.getModel($event));
            },
        }
    }
</script>

<style scoped>

</style>
