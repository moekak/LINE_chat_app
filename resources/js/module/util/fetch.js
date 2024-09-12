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
      }).then(async (response) => {
        if (!response.ok) {
          const errorMessage = await response.text(); // レスポンスの内容を取得し、待機する
          throw new Error(`サーバーエラー: ${response.status} - ${errorMessage}`);
        }
        return response.json(); // 正常な場合はJSONとして返す
      })
      .then((data) => {

        return data
      })
      .catch((error) => {
        console.error("エラーが発生しました:", error.message);
      });
    };