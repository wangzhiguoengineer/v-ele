import vEleSelect from './src/select';

vEleSelect.install = function (Vue) {
    Vue.component(vEleSelect.name, vEleSelect);
};

export default vEleSelect;
