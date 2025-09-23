import { useEffect } from "react";

function useCurrencyInfo(){
      const [data, setData] = useEffect([]);
      useEffect(() => {
          fetch(``)
          .then((res)=> res.json())
          .then((res)=> setData(res[currency]))
      }, [currency])

      console.log(data)
      return data;
}


export default useCurrencyInfo;