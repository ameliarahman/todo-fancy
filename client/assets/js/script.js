Vue.component('component-register', {
    template:
    ` <div class="modal fade" id="register" role="dialog"> 
      <div class="modal-dialog modal-lg">
          <div class="modal-content">
              <div class="modal-header text-center">
                  <button type="button" class="close" data-dismiss="modal">&times;</button>
                  <h4 class="modal-title text-center">Register</h4>
              </div>

              <div class="modal-body">
                  <form class="form-horizontal">
                                        {{err}}
                      <div class="form-group">
                          <label class="control-label col-sm-2" for="name">Name:</label>
                              <div class="col-sm-8">
                                  <input type="text" name="name" class="form-control" v-model="name" placeholder="Enter Name">
                              </div>
                      </div>

                      <div class="form-group">
                      <label class="control-label col-sm-2" for="username">Username:</label>
                          <div class="col-sm-8">
                              <input type="text" name="username" class="form-control" v-model="username" placeholder="Enter Username">
                          </div>
                     </div>

                     <div class="form-group">
                     <label class="control-label col-sm-2" for="password">Password:</label>
                         <div class="col-sm-8">
                             <input type="password" name="password" class="form-control" v-model="password" placeholder="Enter Password">
                         </div>
                    </div>

                    <div class="form-group">
                    <label class="control-label col-sm-2" for="email">Email:</label>
                        <div class="col-sm-8">
                            <input type="text" name="email" class="form-control" v-model="email" placeholder="Enter Email ex: mail@mail.com">
                        </div>
                   </div>

                     
                    <div class="form-group text-center">
                        <div class="col-sm-offset-2 col-sm-8">
                              <button type="submit" class="btn btn-default" @click=signUp>Submit</button>
                        </div>
                    </div>

                  </form>
              </div>
          </div>
      </div>
    </div>
      `,
    data: function () {
        return {
            err: "",
            name: '',
            username: '',
            email: '',
            password: ''
        }
    },
    methods: {
        signUp: function () {
            axios.post('http://localhost:3000/api/users', {
                name: this.name,
                username: this.username,
                password: this.password,
                email: this.email
            })
                .then((dataUser) => {
                    alert("Successfully registered. Please login to continue!")
                })
                .catch((reason) => {
                    this.err = ("Username is already in use or email is invalid")
                    alert(this.err)
                })
        }
    }
})

Vue.component('login', {
    template: `
    <form class="form-signin text-center">
    <div>
    <input type="text" class="form-control" v-model="username" placeholder="username" required="" autofocus="" />
    <input type="password" class="form-control" v-model="password" placeholder="Password" required="" />
    <button class="btn btn-lg btn-primary btn-block" type="submit" @click="login">Login</button>
    </div>
</form>
   
            `,
    data: function () {
        return {
            username: '',
            password: '',
        }
    },
    methods: {
        login: function () {

            axios.post('http://localhost:3000/api/users/signin', {
                username: this.username,
                password: this.password
            }).then((dataUser) => {
                // setTimeout(10000)
                // alert("haiiiii")
                localStorage.setItem('username', dataUser.data.data.username)
                localStorage.setItem('login', dataUser.data.data.isLogin)
                localStorage.setItem('token', dataUser.data.token)
                window.location.replace('todo.html')
            }).catch((reason) => {
                console.log(reason)
            })


        }
    }
})

Vue.component('todo', {
    data: function () {
        return {
            username: localStorage.getItem('username')
        }
    },
    template: `
 <div>
    <h1>Welcome, {{username}} ...</h1>
    <ul>
    <li class="text-center" data-toggle="modal" data-target="#add-todo"><a href="#">Add Todo</a></li>
    </ul>
 </div>

 `
})

Vue.component('add-todo', {
    template:
    `<div class="modal fade" id="add-todo" role="dialog"> 
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header text-center">
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                    <h4 class="modal-title text-center">Add Buku</h4>
                </div>

                <div class="modal-body">
                    <form class="form-horizontal">

                        <div class="form-group">
                            <label class="control-label col-sm-2" for="task">Task:</label>
                                <div class="col-sm-8">
                                    <input type="text" v-model="task" class="form-control" placeholder="Enter title">
                                </div>
                        </div>

                        <div class="form-group">
                            <label class="control-label col-sm-2" for="tags">Tags :</label>
                                <div class="col-sm-8">
                                    <input type="text" v-model="tags" class="form-control"  placeholder="Enter tags (seperated by comma)">
                                </div>
                        </div>

                        <div class="form-group">
                            <div class="col-sm-offset-2 col-sm-8">
                                <button type="submit" class="btn btn-default" @click = "addTask" >Submit</button>
                            </div>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    </div>`,
    methods: {
        addTask: function () {
            let arrTag = this.tags.split(",")
            axios.post('http://localhost:3000/api/todos', {
                // Ini nanti diganti ya Mel //
                username: "amel",
                task: this.task,
                tags: this.tags
            }).then((response) => {
                alert("Successfully added 1 task!")
                location.reload()
            }).catch((reason) => {
                console.log(reason)
            })

        }
    },
    data: function () {
        return {
            task: '',
            tags: '',
        }
    }
})

Vue.component('list-todo', {
    props: ['tasks'],
    template: `
    <table class="table">
    
    <tbody v-for="(task, index) in tasks" :key="index">
      <tr class="info" v-for="(detail, index) in task.task" :key="index">
        <td>
          {{detail.task}}
        </td>
        <td>
            <a href="#" class="btn btn-info" role="button" @click="changeStatus(detail._id)">Done</a>
        </td>
        <td>
            <a href="#" class="btn btn-primary" role="button">Edit</a>
        </td>
        <td>
            <a href="#" class="btn btn-danger" role="button" @click="deleteTask(detail._id)">Delete</a>
        </td>
      </tr>
    </tbody>
  </table>`,
    methods: {
        changeStatus(id) {
            axios.put(`http://localhost:3000/api/todos/status/${id}`)
                .then((response) => {
                    alert("Successfully checked as done!")
                    location.reload()
                }).catch((reason) => {
                    console.log(reason)
                })
        },
        deleteTask(id) {
            // console.log(this.tasks[0])
            let indexTask = this.tasks[0].task.findIndex(element => {
                if (element._id == id) {
                    return this.tasks[0].task.indexOf(element)

                }
            })

            this.tasks[0].task.splice(indexTask, 1)
            axios.delete(`http://localhost:3000/api/todos/${id}`)
                .then((response) => {
                    alert("Successfully deleted!")
                }).catch((reason) => {
                    console.log(reason)
                })
        }
    }

})

Vue.component('finish-alltodo', {
    props: ['alltasks'],
    template:
    `
    
  <table class="table">
  <tbody v-for="(task, index) in alltasks" :key="index">
    <tr class="info" v-for="(detail, index) in task.task" :key="index">
      <td>
        <ul class="list-group">
        <li class="list-group-item">  {{detail.task}}</li>
        </ul>
        
      </td>
      <td>
        <a href="#" class="btn btn-danger" role="button" @click="deleteTask(detail._id)">Delete</a>
      </td>
      
    </tr>
  </tbody>
</table>
`,
    methods: {
        deleteTask(id) {
            // console.log(this.tasks[0])
            let indexTask = this.alltasks[0].task.findIndex(element => {
                if (element._id == id) {
                    return this.alltasks[0].task.indexOf(element)

                }
            })

            this.alltasks[0].task.splice(indexTask, 1)
            axios.delete(`http://localhost:3000/api/todos/${id}`)
                .then((response) => {
                    alert("Successfully deleted!")
                }).catch((reason) => {
                    console.log(reason)
                })
        }
    }
})
new Vue({
    el: '#app',
    data: {
        title: "Todo List",
        tasks: [],
        alltasks: [],
    },
    methods: {
        getDataTodo() {
            axios.get('http://localhost:3000/api/users/amel')
                .then((dataUser) => {
                    this.tasks = dataUser.data
                })
                .catch((reason) => {
                    console.log(reason)
                })
        },
        getFinishedTask() {
            axios.get('http://localhost:3000/api/users/amel/todos/finish')
                .then((dataUser) => {
                    this.alltasks = dataUser.data

                })
                .catch((reason) => {
                    console.log(reason)
                })
        },
        logout() {
            // localStorage.removeItem("token")
            window.location.replace('index.html')
        }
    },
    mounted() {
        this.getDataTodo()
        this.alltasks = []
        // this.getAllDataTodo()
    }
})