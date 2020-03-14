const {version} = require("./../package.json");

import DateRange from './packages/date-range/index';
import Input from './packages/input/index';
import Search from './packages/search/index';
import Select from './packages/select/index';
import Table from './packages/table/index';

const components = [
    DateRange,
    Input,
    Search,
    Select,
    Table
];

const install = function (Vue, opts = {}) {
    components.forEach(component => {
        Vue.component(component.name, component);
    });
};

if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
}

export default {
    version: version,
    install,
    DateRange,
    Input,
    Search,
    Select,
    Table
}
