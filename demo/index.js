;
(function (window) {
  'use strict'
  let todoList = JSON.parse(localStorage.getItem('todoList')) || []
  const vm = new Vue({
    el: '#app',
    data: {
      todoList,
      todoName: '',
      editId: -1
    },
    // 监听属性  监听的是数组
    watch: {
      todoList: {
        deep: true,
        handler(newVal) {
          // console.log(newVal)
          localStorage.setItem('todoList', JSON.stringify(newVal))
        }
      }
    },
    /*  计算属性 */
    computed: {
      // 发生变化
      isFooterShow() {
        return this.todoList.length > 0
      },
      // 元素未完成剩余 个数
      itemLeftCount() {
        return this.todoList.filter(item => item.done == false).length
      },
      // 是否显示 清除完成按钮
      isShowClear() {
        return this.todoList.some(item => item.done)
      }
    },
    methods: {
      // 添加todo
      addTodo() {
        // console.log(this.todoList)
        // console.log(this.todoName)
        // 获取 新数据的id
        let id =
          this.todoList.length == 0 ?
          1 :
          this.todoList[this.todoList.length - 1].id + 1
        // console.log(id)

        // 添加数据
        this.todoList.push({
          id: id,
          name: this.todoName,
          done: false
        })
        // 清空输入框
        this.todoName = ''
      },

      // 编辑todo
      editTodo(id) {
        // 获取id
        // console.log(id)
        this.editId = id
      },
      delTodo(index) {
        this.todoList.splice(index, 1)
      },
      //完成编辑
      updateTodo() {
        this.editId = -1
      },
      clearTodo() {
        this.todoList = this.todoList.filter(item => !item.done)
      }
    }
  })
})(window)