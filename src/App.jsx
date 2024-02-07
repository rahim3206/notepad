import Index from "./assets/pages/Index"
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter , Routes , Route, } from 'react-router-dom'
import NotepadList from "./assets/pages/NotepadList";
import Notepad from "./assets/pages/Notepad";
function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
          <Route>
            <Route element={<Index />} path="/" />
            <Route element={<NotepadList />} path="/notepad_list/:category_id" />
            <Route element={<Notepad />} path="/notepad/:id" />
        </Route>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
