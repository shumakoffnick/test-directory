import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";


const allboard = [
    {
        id: 1,
        title: "Сделать",
        items: [
            {id: 1, title: "Пойти в магазин"},
            {id: 2, title: "Выкинуть мусор"},
            {id: 3, title: "Покушать" }
        ]
    },
    {
        id: 2,
        title: "Проверить",
        items: [
            {id: 4, title: "Код ревью"},
            {id: 5, title: "Задача по факториал"},
            {id: 6, title: "Задачи на фибоначе" }
        ]
    },
    {
        id: 3,
        title: "Сделано",
        items: [
            {id: 7, title: "Снять видео"},
            {id: 8, title: "Смонтировать"},
            {id: 9, title: "Отрендерить" }
        ]
    }]

const App = ()=>{

const [boards, setBoards] = useState(allboard)

const [currentBoard, setCurrentBoard] = useState(null)
const [currentItem, setCurrentItem] = useState(null)



function dragOverHandler(e) {
    e.preventDefault()
    if(e.target.className === "item"){
        e.target.style.boxShadow = "0 4px 3px gray"
    }
}
function dragLeaveHandler(e) {
    e.target.style.boxShadow = "none"
}
function dragStartHandler(e, board, item) {
    setCurrentBoard(board)
    setCurrentItem(item)
}
function dragEndHandler(e) {
    e.target.style.boxShadow = "none"
}
function dropHandler(e, board, item) {
    e.preventDefault()
    const currentIndex = currentBoard.items.indexOf(currentItem)
    currentBoard.items.splice(currentIndex, 1)
    const dropIndex = board.items.indexOf(item)
    board.items.splice(dropIndex + 1, 0, currentItem)
    setBoards(boards.map(b =>{
        if(b.id === board.id){
            return board
        }
        if(b.id === currentBoard.id){
            return currentBoard
        }
        return b
    }))
}
function dropCardHandler(e, board){
    if(e.target.className !== "board"){
     dropCardHandler()   
    }
    board.items.push(currentItem)
    const currentIndex = currentBoard.items.indexOf(currentItem)
    currentBoard.items.splice(currentIndex, 1)
    setBoards(boards.map(b =>{
        if(b.id === board.id){
            return board
        }
        if(b.id === currentBoard.id){
            return currentBoard
        }
        return b
    }
   
    ))
}

const removeBlock = (id)=>{
    const copy = [...boards]
    const cur = copy.filter(t=> t.id !==id)
    setBoards(cur)
}

const [newTitle, setNewTitle] = useState("")
console.log(newTitle)

const addTitle = (title)=>{
    const cop = [...boards]
    const newcop = [cop, {
        id: new Date(),
        title: title
    }]
    setBoards(newcop)
}

    return(
        <>
        <div className="app">
            {boards.map(board =>
                <div className="board"
                    onDragOver={(e)=> dragOverHandler(e)}
                    onDrop={(e)=>dropCardHandler(e, board)}
                >
                    <div className="board__title">{board.title}</div>
                    {board.items.map(item =>
                        <div
                        onDragOver={(e)=>dragOverHandler(e)}
                        onDragLeave={(e)=>dragLeaveHandler(e)}
                        onDragStart={(e)=>dragStartHandler(e, board, item)}
                        onDragEnd={(e)=>dragEndHandler(e)}
                        onDrop={(e)=>dropHandler(e, board, item)}
                        draggable={true} 
                        className="item"
                        >{item.title}</div>
                        )}
                        <div className="deleteBlock">
                            <FontAwesomeIcon icon={faTrash} className="iconTrash" onClick={()=>removeBlock(board.id)}/>
                        </div>
                </div>
                )}
        </div>
        <input onChange={e => setNewTitle(e.target.value)}></input>
                        <button onClick={()=>addTitle(newTitle)}>Нажать</button>
        <div>
            
            
        </div>
        </>
    )
}
export default App