import React from 'react'
import Footer from './Footer'
import IncrementCount from '../containers/IncrementCount'
import AddTodo from '../containers/AddTodo'
import VisibleTodoList from '../containers/VisibleTodoList'

const App = () => (
  <div>
    <IncrementCount />
    <AddTodo />
    <VisibleTodoList />
    <Footer />
  </div>
)

export default App