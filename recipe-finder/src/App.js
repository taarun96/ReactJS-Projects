import './App.css';
import {useEffect,useState,useRef} from "react";

function App() {


    const [IngredientList,updateIngredientList]= useState([]);

    const [loading,setLoading]= useState(false);

    const inputRef=useRef(null);

    const API_KEY='725369619bf5c72b5e769e92f1b07a4a';
    const APP_ID='d95a6de2';
    
    
    const search = () => {
      searchForRecipe(inputRef.current.value);
      inputRef.current.value="";
    }


    const searchForRecipe=query=>{
      setLoading(true);
      let url= `search?q=${query}&app_id=${APP_ID}&app_key=${API_KEY}`;
      fetch(url,{mode:"no-cors"})
      .then(response =>{
        return response.json();
      })
      .then(res => {
          updateIngredientList(res.hits);
          setLoading(false);
      })
      .catch(err => { console.log("error",err); 
      setLoading(false);
    });
    };

    useEffect( ()=>{
      searchForRecipe("chicken");
      },[]);


    return (
 <div className="App">
      <header className="App-header">
      Hello Taarun!!
      <div className="InputWrapper">
        <input ref={inputRef} placeholder="Search for recipes"/>
        <button onClick={search}>Search</button>
        </div>
        {loading && <p>Loading...</p>}
    <div className="Wrapper"> 
        {IngredientList.map((item)=>{
          return (
            <div className="Ingredient">
              <span>{item.recipe.label}</span>
              <br />
              <img src={item.recipe.image} alt="recipe_image"/>
              <div className="Steps">
              {item.recipe.ingredientLines.map((step)=>{
               return <p>{step}</p>
              })}
              </div>
              </div>
          )
        })}
        </div>
      </header>
    </div>
  );
}

export default App;
