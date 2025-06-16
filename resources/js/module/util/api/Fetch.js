class Fetch{
	static fetchPostOperation(data, url){
		return fetch(`${url}`, {
				method: "POST",
				headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		}).then(async (response) => {
			const text = await response.text();
			if (response.status === 204) return;

			if (!response.ok) {
				throw new Error(`サーバーエラー: ${response.status} - ${text}`);
			}

			// HTMLで返ってきてるかチェック
			if (!response.headers.get("content-type")?.includes("application/json")) {
				throw new Error("JSON以外のレスポンスを受信しました");
			}

			return JSON.parse(text);
		})
		.catch((error)=>{
			console.error("fetchPostOperation error:", error.message);
		})
	};

	static fetchGetOperation(url){
		return fetch(`${url}`, {
				method: "GET",
				headers: {
				"Content-Type": "application/json",
			},
		}).then(async (response) => {

			if (response.status === 204) {
				return; // 204なら処理を終了
			}

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
}

export default Fetch