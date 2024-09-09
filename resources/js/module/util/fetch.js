export const fetchPostOperation = (data, url) => {

      return fetch(`${url}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }).then((response) => {
        if (!response.ok) {
          console.log(response);
          
          throw new Error("サーバーエラーが発生しました。");
        }
        return response.json();
      })
      .catch((error)=>{
          console.log(error);
      })
    };
export const fetchGetOperation = (url) => {


      return fetch(`${url}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }).then((response) => {
        if (!response.ok) {
          throw new Error("サーバーエラーが発生しました。");
        }
        return response.json();
      })
      .catch((error)=>{

            console.log(error);
      })
    };