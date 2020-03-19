# vEle
Vue封装ElementUI，快捷数据驱动开发。

## 安装
```
npm install v-ele element-ui -S
```

## 使用简介

使用之前，项目main文件需要配置如下：

```Vue.use(ElementUI);
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import vEle from 'v-ele'

Vue.use(ElementUI);
Vue.use(vEle);
```

### v-ele-search

template

```
 <v-ele-search :options="searchOptions" @search="search" @enter="search" @change="search">
 </v-ele-search>
```

> 事件触发

| 事件名 | 说明         |
| ------ | ------------ |
| search | 搜索事件     |
| enter  | 表单回车事件 |

> options配置

| 字段     | 可选 | 类型   | 默认         | 说明              |
| -------- | ---- | ------ | ------------ | ----------------- |
| response | 必须 | Object | {search: {}} | 引用数据          |
| items    | 必须 | Array  | []           | 字段项配置        |
| buttons  | 可选 | Array  | []           | el-button按钮配置 |

> items字段项配置

| 字段         | 可选             | 类型    | 说明                                                         |
| ------------ | ---------------- | ------- | ------------------------------------------------------------ |
| title        | 必须             | string  | 字段名称                                                     |
| field        | 必须             | string  | 双向绑定字段                                                 |
| type         | 必须             | string  | input\|select\|daterange                                     |
| options      | select非远程必须 | Object  | 下拉框select列表options，例如：{key: 'id',rows:[{id: 1, title: '1'}]} |
| remoteMethod | select远程必须   |         | select远程回调事件，事件返回：{item, query}，请求结果用this.$set(item['options'], 'rows', list)更新下拉框select列表options |
| filterable   | select远程必须   | Boolean | true                                                         |
| remote       | select远程必须   | Boolean | true                                                         |
| clearable    | select远程必须   | Boolean | true                                                         |
| ...          |                  |         | 其他element-ui参数                                           |

#### 例子

```
searchOptions: {
response: {search: {}},
items: [
  {title: '昵称', field: 'nickname', type: 'input'},
  {title: '性别', field: 'gender', type: 'select', options: {rows: []}},
 ]
}
```

method，请求后端拿到数据给v-ele-table中的options配置tableOptions.data

```
search() {
    this.$http.get('/staff/select').then(res => {
        this.tableOptions.data = res.data.data.list;
    }).catch(() => {
    });
}
```

### v-ele-table

template

```
<v-ele-table :options="tableOptions" @sortChange="search">
</v-ele-table>
```

> options

| 字段                | 可选 | 类型   | 默认       | 说明               |
| ------------------- | ---- | ------ | ---------- | ------------------ |
| data                | 必须 | Array  | []         | 列表数据           |
| response            | 必须 | Object | {}         | 引用数据           |
| cols                | 必须 | Array  | []         | 表头               |
| sortChange          | 可选 | String | sortChange | 排序事件名         |
| border              | 可选 |        |            | element-ui参数     |
| stripe              | 可选 |        |            | element-ui参数     |
| height              | 可选 |        |            | element-ui参数     |
| maxHeight           | 可选 |        |            | element-ui参数     |
| defaultSort         | 可选 |        |            | element-ui参数     |
| showOverflowTooltip | 可选 |        |            | element-ui参数     |
| showSummary         | 可选 |        |            | element-ui参数     |
| sumText             | 可选 |        |            | element-ui参数     |
| summaryMethod       | 可选 |        |            | element-ui参数     |
| ...                 |      |        |            | 其他element-ui参数 |

> cols 

| 字段       | 可选 | 类型   | 默认 | 说明               |
| ---------- | ---- | ------ | ---- | ------------------ |
| prop       | 必须 | string |      | element-ui参数     |
| label      | 必须 | string |      | element-ui参数     |
| buttons    | 可选 | Array  | []   | el-button按钮组    |
| width      | 可选 |        |      | element-ui参数     |
| type       | 可选 |        |      | element-ui参数     |
| sortable   | 可选 |        |      | element-ui参数     |
| fixed      | 可选 |        |      | element-ui参数     |
| sortBy     | 可选 |        |      | element-ui参数     |
| sortMethod | 可选 |        |      | element-ui参数     |
| formatter  | 可选 |        |      | element-ui参数     |
| ...        |      |        |      | 其他element-ui参数 |

> buttons

| 字段  | 可选 | 类型             | 默认  | 说明                                 |
| ----- | ---- | ---------------- | ----- | ------------------------------------ |
| click | 必须 | string\|Function | click | 区分返回事件名，比如：@delete，@edit |
| type  | 可选 |                  |       | element-ui参数                       |
| size  | 可选 |                  |       | element-ui参数                       |
| icon  | 可选 |                  |       | element-ui参数                       |
| ...   |      |                  |       | 其他element-ui参数                   |

