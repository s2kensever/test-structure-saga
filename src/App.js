import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Contact from './pages/Contact/Contact';
import Header from './components/Home/Header/Header';
import ToDoListRCC from "./pages/ToDoList/ToDoListRCC"
import ToDoListRFC from "./pages/ToDoList/ToDoListRFC"
import ToDoListRedux from './pages/ToDoList/ToDoListRedux';
import ToDoListSaga from './pages/ToDoListSaga/ToDoListSaga';
function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route exact path='/Home' element={< Home />} />
        <Route exact path='/About' element={< About />} />
        <Route exact path='/Contact' element={< Contact />} />
        <Route exact path='/todolistrcc' element={< ToDoListRCC />} />
        <Route exact path='/todolistrfc' element={< ToDoListRFC />} />
        <Route exact path='/todolistredux' element={< ToDoListRedux />} />
        <Route exact path='/todolistreduxsaga' element={< ToDoListSaga />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
