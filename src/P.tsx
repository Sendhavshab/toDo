import{ useEffect, useState } from "react";
import { CiCircleRemove } from "react-icons/ci";


function P() {
  const localToDoStr = localStorage.getItem("toDo") || "";
  const done = localStorage.getItem("done") || ""
  const localDone = done ? JSON.parse(done) : [];
  const localToDo = localToDoStr ? JSON.parse(localToDoStr) : [];
  const [isDone , setIsDone] = useState<number[]>(localDone)
  const [inputValue, setInputValue] = useState("");
  const [toDo, setToDo] = useState<string[]>(localToDo);

  useEffect(() => {
    localStorage.setItem("done" , JSON.stringify(isDone))
    localStorage.setItem("toDo", JSON.stringify(toDo));
  }, [toDo , isDone]);


//   const done = {}

    
const handleWorkDone = (event: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
   const id = event.currentTarget.getAttribute("id");
   const p = id ? +id : -1
    setIsDone([...isDone , p]);
}
  

    
const handleWorkNotDone = (event: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
   const id = event.currentTarget.getAttribute("id");
   const p = id ? +id : -1
   const newArr = isDone.filter((item) => item !== p)

    setIsDone(newArr);
}


 const handleKeyDown = (e:React.KeyboardEvent<HTMLInputElement>) => {
   
    if(e.key === "Enter"){

      handleConfirmButton()
    }

   }

  const handleConfirmButton = () => {

   if(+inputValue !== 0){
    const newToDo = [...toDo, inputValue];
    setToDo(newToDo);
    setInputValue("");

   }

  };

  
 const handleCrossClick = (id:number) => {
     
   


    let newDone = isDone.filter((num) => {
        
       return num !== id

    })

   const newToDo = toDo.filter((_, index) => index !== id);


       newDone = newDone.map((num)=>{
        if(num > id ){
          return num - 1
        }
        return num
      })
      setToDo(newToDo)
      setIsDone(newDone)


    
    }


  return (
    <div className={`h-screen dark:bg-gray-900  overflow-auto pb-12 px-2 lg:px-16 bg-no-repeat bg-cover bg-center dark:bg-[url('https://taxiforemail.com/assets/dark-mode-background-images-social.png')] bg-[url('https://4kwallpapers.com/images/walls/thumbs_3t/11762.png')] dark:text-gray-200 `}>
      <input
       onKeyDown={(handleKeyDown)}
        placeholder="What to do?"
        className="border-2  block peer border-black bg-white  dark:bg-gray-800 rounded-full hover:text-black focus:hover:bg-blue-500 hover:bg-blue-600 hover:placeholder:text-white dark:text-white text-bold p-2 m-4"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button
        onClick={handleConfirmButton}
        className="py-3  inline-block peer-placeholder-shown:bg-blue-300  m-2 px-20 bg-blue-700 hover:bg-blue-400 hover:scale-105 transition rounded-3xl"
      >
        Confirm
      </button> 
<div className="flex gap-6">
      <div className="max-w-sm md:max-w-md lg:max-w-lg">
       <p  className="font-bold text-xl m-5">Work to do: </p>
      {toDo.map((item, index) =>{ 
  
        if(!isDone.includes(index)){
return  <div key={index}  className="font-bold md:text-2xl">
      
          <input onClick={handleWorkDone} type="checkbox" id={`${index}`}  className="m-3 peer w-4 h-4  text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
          <label htmlFor={`${index}`}  className="peer-checked:text-blue-700  ">{item}</label>
        </div>
        }

      
      })}
     </div> 
     <div  className="max-w-sm md:max-w-md lg:max-w-lg" >
       <p  className="font-bold text-xl m-5">Work is done: </p>
  {toDo.map((item, index) =>{ 
  
        if(isDone.includes(index)){
return  <div key={index}  className="font-bold md:text-2xl flex  ">
      
          <input defaultChecked onClick={handleWorkNotDone} type="checkbox" id={`${index}`}  className="m-3 peer w-4 h-4  text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
          <label htmlFor={`${index}`}  className="peer-checked:text-blue-700 peer-checked:dark:text-yellow-500  grow ">{item}</label>
          <CiCircleRemove onClick={ () => handleCrossClick(index)} className="inline-block mx-4 hover:text-white min-w-6 hover:bg-black dark:text-white   cursor-pointer hover:dark:bg-white hover:dark:text-black rounded-full "/>
        </div>
        }

      
      })}
     </div>
     </div>
    </div>
  );
}

export default P;
